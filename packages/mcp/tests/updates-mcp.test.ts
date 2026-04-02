import { updateMockData } from "@adaptyv/foundry-shared/mockdata";
import { FoundryApiError } from "@adaptyv/foundry-sdk";
import { describe, expect, it, vi } from "vitest";
import { createMockFoundryClient, withMcpSession } from "./test-utils.js";

describe("MCP tools — updates", () => {
  it("list_updates — success", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({
        name: "list_updates",
        arguments: { ...updateMockData.list.query },
      });
      expect(out.content[0].text).toContain("Experiment created");
    });
  });

  it("list_experiment_updates — success", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      await c.callTool({
        name: "list_experiment_updates",
        arguments: { ...updateMockData.listForExperiment.input },
      });
    });
  });

  it("list_experiment_updates — API error", async () => {
    const client = createMockFoundryClient();
    vi.spyOn(client.updates, "listForExperiment").mockRejectedValue(
      new FoundryApiError(403, { error: "denied" }),
    );
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({
        name: "list_experiment_updates",
        arguments: {
          experiment_id: "019d4a2b-0000-0000-0000-000000000001",
        },
      });
      expect(out.isError).toBe(true);
    });
    vi.restoreAllMocks();
  });

  it("list_experiment_updates — invalid args", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({
        name: "list_experiment_updates",
        arguments: {},
      });
      expect(out.isError).toBe(true);
      expect(out.content[0].text).toContain("experiment_id");
    });
  });
});
