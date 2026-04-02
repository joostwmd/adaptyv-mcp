import { feedbackMockData } from "@adaptyv/foundry-shared/mockdata";
import { FoundryApiError } from "@adaptyv/foundry-sdk";
import { describe, expect, it, vi } from "vitest";
import { createMockFoundryClient, withMcpSession } from "./test-utils.js";

describe("MCP tools — feedback", () => {
  it("submit_feedback — success", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({
        name: "submit_feedback",
        arguments: { ...feedbackMockData.submit.requestBody },
      });
      expect(out.content[0].text).toContain("Feedback recorded");
    });
  });

  it("submit_feedback — API error", async () => {
    const client = createMockFoundryClient();
    vi.spyOn(client.feedback, "submit").mockRejectedValue(
      new FoundryApiError(500, { error: "server" }),
    );
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({
        name: "submit_feedback",
        arguments: { ...feedbackMockData.submit.requestBody },
      });
      expect(out.isError).toBe(true);
    });
    vi.restoreAllMocks();
  });

  it("submit_feedback — invalid args", async () => {
    const client = createMockFoundryClient();
    await withMcpSession(client, async (c) => {
      const out = await c.callTool({ name: "submit_feedback", arguments: {} });
      expect(out.isError).toBe(true);
      expect(out.content[0].text).toContain("request_uuid");
    });
  });
});
