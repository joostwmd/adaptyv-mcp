import { sequenceMockData } from "@adaptyv/foundry-shared/mockdata";
import { FoundryApiError } from "@adaptyv/foundry-sdk";
import { describe, expect, it, vi } from "vitest";
import { createMockFoundryClient, withMcpSession } from "./test-utils.js";

describe("MCP tools — sequences", () => {
  it("list_sequences — success", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({
        name: "list_sequences",
        arguments: { ...sequenceMockData.list.query },
      });
      expect(out.content[0].text).toContain("mAb1");
    });
  });

  it("get_sequence — success", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      await c.callTool({
        name: "get_sequence",
        arguments: { ...sequenceMockData.get.path },
      });
    });
  });

  it("add_sequences — success", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      await c.callTool({
        name: "add_sequences",
        arguments: { ...sequenceMockData.add.requestBody },
      });
    });
  });

  it("list_experiment_sequences — success", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      await c.callTool({
        name: "list_experiment_sequences",
        arguments: { ...sequenceMockData.listForExperiment.input },
      });
    });
  });

  it("get_sequence — API error", async () => {
    const client = createMockFoundryClient();
    vi.spyOn(client.sequences, "get").mockRejectedValue(
      new FoundryApiError(404, { error: "gone" }),
    );
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({
        name: "get_sequence",
        arguments: { sequence_id: "nope" },
      });
      expect(out.isError).toBe(true);
    });
    vi.restoreAllMocks();
  });

  it("get_sequence — invalid args", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({ name: "get_sequence", arguments: {} });
      expect(out.isError).toBe(true);
      expect(out.content[0].text).toContain("sequence_id");
    });
  });
});
