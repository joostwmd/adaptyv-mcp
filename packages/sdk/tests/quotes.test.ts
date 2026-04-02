import {
  confirmQuoteResponseSchema,
  confirmStandaloneQuoteInputSchema,
  errorResponseBodySchema,
  getQuoteInputSchema,
  listQuotesInputSchema,
  quoteInfoSchema,
  quoteListResponseSchema,
  rejectQuoteInputSchema,
  rejectQuoteResponseSchema,
} from "@adaptyv/foundry-shared";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FoundryClient } from "../src/client.js";
import { errorBody } from "./fixtures/common.js";
import { quoteFixtures } from "./fixtures/quotes.js";
import {
  assertLastFetch,
  installFetchMock,
  jsonErrorResponse,
  jsonResponse,
} from "./test-utils.js";

describe("QuotesResource", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = installFetchMock();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const client = () => new FoundryClient({ apiKey: "test-token" });

  it("list — success", async () => {
    const query = listQuotesInputSchema.parse({ ...quoteFixtures.list.query });
    fetchMock.mockResolvedValue(jsonResponse(quoteFixtures.list.response));
    const out = await client().quotes.list(query);
    quoteListResponseSchema.parse(out);
    expect(out).toEqual(quoteFixtures.list.response);
    assertLastFetch(fetchMock, { method: "GET", urlIncludes: "/quotes" });
  });

  it("list — FoundryApiError", async () => {
    errorResponseBodySchema.parse(errorBody);
    fetchMock.mockResolvedValue(jsonErrorResponse(500, errorBody));
    await expect(client().quotes.list({})).rejects.toMatchObject({
      status: 500,
    });
  });

  it("get — success", async () => {
    const qPath = getQuoteInputSchema.parse({ ...quoteFixtures.get.path });
    fetchMock.mockResolvedValue(jsonResponse(quoteFixtures.get.response));
    const out = await client().quotes.get(qPath);
    quoteInfoSchema.parse(out);
    expect(out).toEqual(quoteFixtures.get.response);
    assertLastFetch(fetchMock, {
      method: "GET",
      urlIncludes: `/quotes/${qPath.quote_id}`,
    });
  });

  it("get — FoundryApiError", async () => {
    fetchMock.mockResolvedValue(jsonErrorResponse(404, errorBody));
    await expect(
      client().quotes.get({ quote_id: "missing" }),
    ).rejects.toMatchObject({ status: 404 });
  });

  it("confirm — success", async () => {
    const input = confirmStandaloneQuoteInputSchema.parse({
      ...quoteFixtures.confirm.input,
    });
    const { quote_id, ...body } = input;
    fetchMock.mockResolvedValue(jsonResponse(quoteFixtures.confirm.response));
    const out = await client().quotes.confirm(input);
    confirmQuoteResponseSchema.parse(out);
    expect(out).toEqual(quoteFixtures.confirm.response);
    assertLastFetch(fetchMock, {
      method: "POST",
      urlIncludes: `/quotes/${quote_id}/confirm`,
      body,
    });
  });

  it("confirm — FoundryApiError", async () => {
    fetchMock.mockResolvedValue(jsonErrorResponse(400, errorBody));
    await expect(
      client().quotes.confirm({ quote_id: "qt_x" }),
    ).rejects.toMatchObject({ status: 400 });
  });

  it("reject — success", async () => {
    const input = rejectQuoteInputSchema.parse({ ...quoteFixtures.reject.input });
    const { quote_id, ...body } = input;
    fetchMock.mockResolvedValue(jsonResponse(quoteFixtures.reject.response));
    const out = await client().quotes.reject(input);
    rejectQuoteResponseSchema.parse(out);
    expect(out).toEqual(quoteFixtures.reject.response);
    assertLastFetch(fetchMock, {
      method: "POST",
      urlIncludes: `/quotes/${quote_id}/reject`,
      body,
    });
  });

  it("reject — FoundryApiError", async () => {
    fetchMock.mockResolvedValue(jsonErrorResponse(400, errorBody));
    await expect(
      client().quotes.reject({
        quote_id: "qt_x",
        reason: "other",
      }),
    ).rejects.toMatchObject({ status: 400 });
  });
});
