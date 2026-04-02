import { quoteMockData } from "@adaptyv/foundry-shared/mockdata";
import { FoundryApiError } from "@adaptyv/foundry-sdk";
import { describe, expect, it, vi } from "vitest";
import { createMockFoundryClient, withMcpSession } from "./test-utils.js";

describe("MCP tools — quotes", () => {
  it("list_quotes — success", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({
        name: "list_quotes",
        arguments: { ...quoteMockData.list.query },
      });
      expect(out.content[0].text).toContain("Q-2026-0001");
    });
  });

  it("get_quote — success", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      await c.callTool({
        name: "get_quote",
        arguments: { ...quoteMockData.get.path },
      });
    });
  });

  it("confirm_quote — success", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      await c.callTool({
        name: "confirm_quote",
        arguments: { ...quoteMockData.confirm.input },
      });
    });
  });

  it("reject_quote — success", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      await c.callTool({
        name: "reject_quote",
        arguments: { ...quoteMockData.reject.input },
      });
    });
  });

  it("get_quote — API error", async () => {
    const client = createMockFoundryClient();
    vi.spyOn(client.quotes, "get").mockRejectedValue(
      new FoundryApiError(404, { error: "nf" }),
    );
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({
        name: "get_quote",
        arguments: { quote_id: "qt_missing" },
      });
      expect(out.isError).toBe(true);
    });
    vi.restoreAllMocks();
  });

  it("get_quote — invalid args", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({ name: "get_quote", arguments: {} });
      expect(out.isError).toBe(true);
      expect(out.content[0].text).toContain("quote_id");
    });
  });
});
