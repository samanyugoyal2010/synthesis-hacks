import { createMCPClient, type MCPClient } from "@ai-sdk/mcp";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import {
  getActionLayerApiKey,
  getActionLayerApiUrl,
} from "@/lib/env";

export async function createActionLayerMCPClient(): Promise<MCPClient> {
  const apiKey = getActionLayerApiKey();
  const apiUrl = getActionLayerApiUrl();

  return createMCPClient({
    transport: new StdioClientTransport({
      command: "uvx",
      args: ["actionlayer-mcp"],
      env: {
        ...process.env,
        ACTIONLAYER_API_KEY: apiKey,
        ACTIONLAYER_API_URL: apiUrl,
      },
    }),
  });
}
