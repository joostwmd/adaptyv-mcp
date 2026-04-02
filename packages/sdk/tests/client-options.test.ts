import { listTargetsInputSchema, targetListResponseSchema } from "@adaptyv/foundry-shared";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FoundryClient } from "../src/client.js";
import { targetFixtures } from "./fixtures/targets.js";
import { installFetchMock, jsonResponse } from "./test-utils.js";

describe("FoundryClient options", () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  let prevToken: string | undefined;

  beforeEach(() => {
    fetchMock = installFetchMock();
    prevToken = process.env.FOUNDRY_API_TOKEN;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (prevToken === undefined) {
      delete process.env.FOUNDRY_API_TOKEN;
    } else {
      process.env.FOUNDRY_API_TOKEN = prevToken;
    }
  });

  it("throws when neither apiKey nor FOUNDRY_API_TOKEN is set", () => {
    delete process.env.FOUNDRY_API_TOKEN;
    expect(
      () =>
        new FoundryClient({
          /* empty on purpose */
        }),
    ).toThrow(/apiKey|FOUNDRY_API_TOKEN/);
  });

  it("uses FOUNDRY_API_TOKEN when apiKey is omitted", async () => {
    process.env.FOUNDRY_API_TOKEN = "from-env";
    fetchMock.mockResolvedValue(jsonResponse(targetFixtures.list.response));

    const client = new FoundryClient({});
    const query = listTargetsInputSchema.parse({ limit: 1 });
    const out = await client.targets.list(query);
    targetListResponseSchema.parse(out);

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect((init.headers as Record<string, string>).Authorization).toBe(
      "Bearer from-env",
    );
  });
});
