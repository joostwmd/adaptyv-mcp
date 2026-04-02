import { tokenMockData } from "@adaptyv/foundry-shared/mockdata";
import { FoundryApiError } from "@adaptyv/foundry-sdk";
import { describe, expect, it, vi } from "vitest";
import { createMockFoundryClient, withMcpSession } from "./test-utils.js";

describe("MCP tools — tokens", () => {
  it("list_tokens — success", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({
        name: "list_tokens",
        arguments: { ...tokenMockData.list.query },
      });
      expect(out.content[0].text).toContain("Production API token");
    });
  });

  it("attenuate_token — success", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      await c.callTool({
        name: "attenuate_token",
        arguments: { ...tokenMockData.attenuate.requestBody },
      });
    });
  });

  it("revoke_token — success", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({
        name: "revoke_token",
        arguments: {},
      });
      expect(out.content[0].text).toContain("revoked_at");
    });
  });

  it("list_tokens — API error", async () => {
    const client = createMockFoundryClient();
    vi.spyOn(client.tokens, "list").mockRejectedValue(
      new FoundryApiError(403, { error: "no" }),
    );
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({
        name: "list_tokens",
        arguments: {},
      });
      expect(out.isError).toBe(true);
    });
    vi.restoreAllMocks();
  });

  it("attenuate_token — invalid args", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({
        name: "attenuate_token",
        arguments: { token: "x" },
      });
      expect(out.isError).toBe(true);
      expect(out.content[0].text).toMatch(/name|attenuation/);
    });
  });
});
