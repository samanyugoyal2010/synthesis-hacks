import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { createActionLayerMCPClient } from "@/lib/actionlayer/mcp";
import { ensureSession, getTaskContextForSession } from "@/lib/db";
import { getGeminiApiKey } from "@/lib/env";
import { buildSystemPrompt } from "@/lib/gemini/system";

export const maxDuration = 120;

const google = createGoogleGenerativeAI({
  apiKey: getGeminiApiKey(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const messages = (body.messages ?? []) as UIMessage[];
  const sessionId =
    typeof body.sessionId === "string" && body.sessionId.length > 0
      ? body.sessionId
      : "default";

  ensureSession(sessionId);

  let mcpClient: Awaited<ReturnType<typeof createActionLayerMCPClient>> | null =
    null;

  try {
    mcpClient = await createActionLayerMCPClient();
    const tools = await mcpClient.tools();
    const taskContext = getTaskContextForSession(sessionId);

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: buildSystemPrompt(taskContext),
      messages: await convertToModelMessages(messages),
      tools,
      stopWhen: stepCountIs(12),
      onFinish: async () => {
        await mcpClient?.close();
      },
    });

    return result.toUIMessageStreamResponse({
      onFinish: async () => {
        await mcpClient?.close();
      },
    });
  } catch (error) {
    await mcpClient?.close();
    console.error("[chat]", error);
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to run chat with ActionLayer MCP",
      },
      { status: 500 },
    );
  }
}
