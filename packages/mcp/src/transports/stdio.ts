import { FoundryClient } from "@adaptyv/foundry-sdk";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createMcpServer } from "../server.js";

export async function startStdio(): Promise<void> {
  const client = new FoundryClient({});
  const server = createMcpServer(client);
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
