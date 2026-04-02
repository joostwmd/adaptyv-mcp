import type { FoundryClient } from "@adaptyv/foundry-sdk";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerExperimentTools } from "./experiments.js";
import { registerFeedbackTools } from "./feedback.js";
import { registerQuoteTools } from "./quotes.js";
import { registerResultTools } from "./results.js";
import { registerSequenceTools } from "./sequences.js";
import { registerTargetTools } from "./targets.js";
import { registerTokenTools } from "./tokens.js";
import { registerUpdateTools } from "./updates.js";

export function registerAllTools(server: McpServer, client: FoundryClient): void {
  registerTargetTools(server, client);
  registerExperimentTools(server, client);
  registerSequenceTools(server, client);
  registerResultTools(server, client);
  registerQuoteTools(server, client);
  registerUpdateTools(server, client);
  registerTokenTools(server, client);
  registerFeedbackTools(server, client);
}

export { registerTargetTools } from "./targets.js";
export { registerExperimentTools } from "./experiments.js";
export { registerSequenceTools } from "./sequences.js";
export { registerResultTools } from "./results.js";
export { registerQuoteTools } from "./quotes.js";
export { registerUpdateTools } from "./updates.js";
export { registerTokenTools } from "./tokens.js";
export { registerFeedbackTools } from "./feedback.js";
