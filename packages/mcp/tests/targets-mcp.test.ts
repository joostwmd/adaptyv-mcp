import { targetMockData } from "@adaptyv/foundry-shared/mockdata";
import { FoundryApiError } from "@adaptyv/foundry-sdk";
import { describe, expect, it, vi } from "vitest";
import { createMockFoundryClient, withMcpSession } from "./test-utils.js";

describe("MCP tools — targets", () => {
  it("list_targets — success", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({
        name: "list_targets",
        arguments: { ...targetMockData.list.query },
      });
      expect(out.isError).not.toBe(true);
      expect(out.content[0].type).toBe("text");
      expect(out.content[0].text).toContain("EGFR");
    });
  });

  it("get_target — success", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({
        name: "get_target",
        arguments: { ...targetMockData.get.path },
      });
      expect(out.content[0].text).toContain("PD-L1");
    });
  });

  it("list_custom_target_requests — success", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      await c.callTool({
        name: "list_custom_target_requests",
        arguments: { ...targetMockData.listCustomRequests.query },
      });
    });
  });

  it("get_custom_target_request — success", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      await c.callTool({
        name: "get_custom_target_request",
        arguments: { ...targetMockData.getCustomRequest.path },
      });
    });
  });

  it("request_custom_target — success", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      await c.callTool({
        name: "request_custom_target",
        arguments: { ...targetMockData.requestCustom.requestBody },
      });
    });
  });

  it("get_target — FoundryApiError becomes tool error", async () => {
    const client = createMockFoundryClient();
    vi.spyOn(client.targets, "get").mockRejectedValue(
      new FoundryApiError(404, { error: "nope" }),
    );
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({
        name: "get_target",
        arguments: { target_id: "x" },
      });
      expect(out.isError).toBe(true);
      expect(out.content[0].text).toContain("404");
    });
    vi.restoreAllMocks();
  });

  it("get_target — invalid input returns MCP validation error", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({ name: "get_target", arguments: {} });
      expect(out.isError).toBe(true);
      expect(out.content[0].text).toContain("target_id");
    });
  });
});
