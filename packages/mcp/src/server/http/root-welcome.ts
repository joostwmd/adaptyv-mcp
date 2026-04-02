import { useMockFromEnv } from "../../foundry-client.js";

export function buildRootWelcomeBody(): {
  message: string;
  service: string;
  health: string;
  mcp: string;
  mock_mode: boolean;
} {
  return {
    message:
      "Welcome to the Adaptyv Foundry MCP server (Streamable HTTP). Connect clients to /mcp with Authorization: Bearer <MCP_HTTP_API_KEY>.",
    service: "adaptyv-foundry-mcp",
    health: "/health",
    mcp: "/mcp",
    mock_mode: useMockFromEnv(),
  };
}
