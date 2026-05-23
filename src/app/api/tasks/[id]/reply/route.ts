import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText, stepCountIs } from "ai";
import { createActionLayerMCPClient } from "@/lib/actionlayer/mcp";
import { getTask, updateTask } from "@/lib/db";
import { getGeminiApiKey } from "@/lib/env";

const google = createGoogleGenerativeAI({
  apiKey: getGeminiApiKey(),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const task = getTask(id);

  if (!task) {
    return Response.json({ error: "Task not found" }, { status: 404 });
  }

  const { answer } = (await req.json()) as { answer?: string };
  if (!answer?.trim()) {
    return Response.json({ error: "answer is required" }, { status: 400 });
  }

  let mcpClient: Awaited<ReturnType<typeof createActionLayerMCPClient>> | null =
    null;

  try {
    mcpClient = await createActionLayerMCPClient();
    const tools = await mcpClient.tools();

    const externalRef = task.external_id ?? task.id;
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      system:
        "Call the ActionLayer reply tool exactly once with the user's answer. Do not add commentary.",
      prompt: `Task external id: ${externalRef}\nUser answer: ${answer.trim()}`,
      tools,
      stopWhen: stepCountIs(5),
    });

    updateTask(task.id, {
      pending_question: null,
      status: "running",
    });

    return Response.json({ ok: true, summary: text });
  } catch (error) {
    console.error("[task reply]", error);
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to send reply",
      },
      { status: 500 },
    );
  } finally {
    await mcpClient?.close();
  }
}
