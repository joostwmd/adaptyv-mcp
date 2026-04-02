import {
  attenuateTokenInputSchema,
  attenuateTokenResponseSchema,
  errorResponseBodySchema,
  listTokensInputSchema,
  revokeTokenInputSchema,
  revokeTokenResponseSchema,
  tokenListResponseSchema,
} from "@adaptyv/foundry-shared";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FoundryClient } from "../src/client.js";
import { errorBody } from "./fixtures/common.js";
import { tokenFixtures } from "./fixtures/tokens.js";
import {
  assertLastFetch,
  installFetchMock,
  JSON_ACCEPT,
  jsonErrorResponse,
  jsonResponse,
} from "./test-utils.js";

describe("TokensResource", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = installFetchMock();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const client = () => new FoundryClient({ apiKey: "test-token" });

  it("list — success", async () => {
    const query = listTokensInputSchema.parse({ ...tokenFixtures.list.query });
    fetchMock.mockResolvedValue(jsonResponse(tokenFixtures.list.response));
    const out = await client().tokens.list(query);
    tokenListResponseSchema.parse(out);
    expect(out).toEqual(tokenFixtures.list.response);
    assertLastFetch(fetchMock, {
      method: "GET",
      urlIncludes: "/tokens",
      accept: JSON_ACCEPT,
      noBody: true,
    });
  });

  it("list — FoundryApiError", async () => {
    errorResponseBodySchema.parse(errorBody);
    fetchMock.mockResolvedValue(jsonErrorResponse(403, errorBody));
    await expect(client().tokens.list({})).rejects.toMatchObject({
      status: 403,
    });
  });

  it("attenuate — success (201)", async () => {
    const body = attenuateTokenInputSchema.parse({
      ...tokenFixtures.attenuate.requestBody,
    });
    fetchMock.mockResolvedValue(
      jsonResponse(tokenFixtures.attenuate.response, { status: 201 }),
    );
    const out = await client().tokens.attenuate(body);
    attenuateTokenResponseSchema.parse(out);
    expect(out).toEqual(tokenFixtures.attenuate.response);
    assertLastFetch(fetchMock, {
      method: "POST",
      urlIncludes: "/tokens/attenuate",
      accept: JSON_ACCEPT,
      body: tokenFixtures.attenuate.requestBody,
    });
  });

  it("attenuate — FoundryApiError", async () => {
    fetchMock.mockResolvedValue(jsonErrorResponse(400, errorBody));
    await expect(
      client().tokens.attenuate({
        token: "bad",
        name: "x",
        attenuation: {},
      }),
    ).rejects.toMatchObject({ status: 400 });
  });

  it("revoke — success", async () => {
    const input = revokeTokenInputSchema.parse({});
    fetchMock.mockResolvedValue(jsonResponse(tokenFixtures.revoke.response));
    const out = await client().tokens.revoke(input);
    revokeTokenResponseSchema.parse(out);
    expect(out).toEqual(tokenFixtures.revoke.response);
    assertLastFetch(fetchMock, {
      method: "POST",
      urlIncludes: "/tokens/revoke",
      accept: JSON_ACCEPT,
      noBody: true,
    });
  });

  it("revoke — FoundryApiError", async () => {
    fetchMock.mockResolvedValue(jsonErrorResponse(403, errorBody));
    await expect(client().tokens.revoke({})).rejects.toMatchObject({
      status: 403,
    });
  });
});
