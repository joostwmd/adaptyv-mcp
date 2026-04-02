import { resultMockData } from "@adaptyv/foundry-shared/mockdata";
import { FoundryApiError } from "@adaptyv/foundry-sdk";
import { describe, expect, it, vi } from "vitest";
import { createMockFoundryClient, withMcpSession } from "./test-utils.js";

describe("MCP tools — results", () => {
  it("list_results — success", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({
        name: "list_results",
        arguments: { ...resultMockData.list.query },
      });
      expect(out.content[0].text).toContain("BLI affinity");
    });
  });

  it("get_result — success", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({
        name: "get_result",
        arguments: { ...resultMockData.get.path },
      });
      expect(out.content[0].text).toContain("2.4 nM");
    });
  });

  it("list_experiment_results — success", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      await c.callTool({
        name: "list_experiment_results",
        arguments: { ...resultMockData.listForExperiment.input },
      });
    });
  });

  it("get_result — API error", async () => {
    const client = createMockFoundryClient();
    vi.spyOn(client.results, "get").mockRejectedValue(
      new FoundryApiError(404, { error: "nf" }),
    );
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({
        name: "get_result",
        arguments: { result_id: "missing" },
      });
      expect(out.isError).toBe(true);
    });
    vi.restoreAllMocks();
  });

  it("get_result — invalid args", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({ name: "get_result", arguments: {} });
      expect(out.isError).toBe(true);
      expect(out.content[0].text).toContain("result_id");
    });
  });
});
