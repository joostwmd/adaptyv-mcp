import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createFoundryClientForMcp, useMockFromEnv } from "../../foundry-client.js";
import { attachMcpInboundTransportLogging } from "../http/mcp-request-log.js";
import { createMcpServer } from "../mcp-server.js";

export async function startStdio(): Promise<void> {
  if (useMockFromEnv()) {
    console.error(
      "[adaptyv-foundry-mcp] FOUNDRY_USE_MOCK: using in-memory mock client (no HTTP).",
    );
  }
  const client = createFoundryClientForMcp();
  const server = createMcpServer(client);
  const transport = new StdioServerTransport();
  attachMcpInboundTransportLogging(transport, { channel: "stdio" });
  await server.connect(transport);
}
