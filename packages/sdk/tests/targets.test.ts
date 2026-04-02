import {
  createCustomTargetResponseSchema,
  customTargetRequestInfoSchema,
  customTargetRequestListResponseSchema,
  errorResponseBodySchema,
  getCustomTargetRequestInputSchema,
  getTargetInputSchema,
  listCustomTargetRequestsInputSchema,
  listTargetsInputSchema,
  requestCustomTargetInputSchema,
  targetInfoSchema,
  targetListResponseSchema,
} from "@adaptyv/foundry-shared";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FoundryApiError, FoundryClient } from "../src/client.js";
import { errorBody, targetFixtures } from "@adaptyv/foundry-shared/fixtures";
import {
  assertLastFetch,
  installFetchMock,
  JSON_ACCEPT,
  jsonErrorResponse,
  jsonResponse,
} from "./test-utils.js";

describe("TargetsResource", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = installFetchMock();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const client = () => new FoundryClient({ apiKey: "test-token" });

  it("list — success", async () => {
    const query = listTargetsInputSchema.parse({
      ...targetFixtures.list.query,
    });
    fetchMock.mockResolvedValue(jsonResponse(targetFixtures.list.response));
    const out = await client().targets.list(query);
    targetListResponseSchema.parse(out);
    expect(out).toEqual(targetFixtures.list.response);
    assertLastFetch(fetchMock, {
      method: "GET",
      urlIncludes: ["/targets", "search=EGFR", "selfservice_only=true"],
      accept: JSON_ACCEPT,
      noBody: true,
    });
  });

  it("list — FoundryApiError", async () => {
    errorResponseBodySchema.parse(errorBody);
    fetchMock.mockResolvedValue(jsonErrorResponse(401, errorBody));
    await expect(client().targets.list({})).rejects.toMatchObject({
      name: "FoundryApiError",
      status: 401,
    } satisfies Partial<FoundryApiError>);
  });

  it("get — success", async () => {
    const tPath = getTargetInputSchema.parse({ ...targetFixtures.get.path });
    fetchMock.mockResolvedValue(jsonResponse(targetFixtures.get.response));
    const out = await client().targets.get(tPath);
    targetInfoSchema.parse(out);
    expect(out).toEqual(targetFixtures.get.response);
    assertLastFetch(fetchMock, {
      method: "GET",
      urlIncludes: `/targets/${tPath.target_id}`,
      accept: JSON_ACCEPT,
      noBody: true,
    });
  });

  it("get — FoundryApiError", async () => {
    fetchMock.mockResolvedValue(jsonErrorResponse(404, errorBody));
    await expect(
      client().targets.get({ target_id: "missing" }),
    ).rejects.toMatchObject({ status: 404 });
  });

  it("listCustomRequests — success", async () => {
    const q = listCustomTargetRequestsInputSchema.parse({
      ...targetFixtures.listCustomRequests.query,
    });
    fetchMock.mockResolvedValue(
      jsonResponse(targetFixtures.listCustomRequests.response),
    );
    const out = await client().targets.listCustomRequests(q);
    customTargetRequestListResponseSchema.parse(out);
    expect(out).toEqual(targetFixtures.listCustomRequests.response);
    assertLastFetch(fetchMock, {
      method: "GET",
      urlIncludes: "/targets/request-custom",
      accept: JSON_ACCEPT,
      noBody: true,
    });
  });

  it("listCustomRequests — FoundryApiError", async () => {
    fetchMock.mockResolvedValue(jsonErrorResponse(403, errorBody));
    await expect(client().targets.listCustomRequests({})).rejects.toMatchObject(
      { status: 403 },
    );
  });

  it("getCustomRequest — success", async () => {
    const cPath = getCustomTargetRequestInputSchema.parse({
      ...targetFixtures.getCustomRequest.path,
    });
    fetchMock.mockResolvedValue(
      jsonResponse(targetFixtures.getCustomRequest.response),
    );
    const out = await client().targets.getCustomRequest(cPath);
    customTargetRequestInfoSchema.parse(out);
    expect(out).toEqual(targetFixtures.getCustomRequest.response);
    assertLastFetch(fetchMock, {
      method: "GET",
      urlIncludes: `/targets/request-custom/${cPath.request_id}`,
      accept: JSON_ACCEPT,
      noBody: true,
    });
  });

  it("getCustomRequest — FoundryApiError", async () => {
    fetchMock.mockResolvedValue(jsonErrorResponse(404, errorBody));
    await expect(
      client().targets.getCustomRequest({ request_id: "x" }),
    ).rejects.toMatchObject({ status: 404 });
  });

  it("requestCustom — success (201)", async () => {
    const body = requestCustomTargetInputSchema.parse({
      ...targetFixtures.requestCustom.requestBody,
    });
    fetchMock.mockResolvedValue(
      jsonResponse(targetFixtures.requestCustom.response, { status: 201 }),
    );
    const out = await client().targets.requestCustom(body);
    createCustomTargetResponseSchema.parse(out);
    expect(out).toEqual(targetFixtures.requestCustom.response);
    assertLastFetch(fetchMock, {
      method: "POST",
      urlIncludes: "/targets/request-custom",
      accept: JSON_ACCEPT,
      body: targetFixtures.requestCustom.requestBody,
    });
  });

  it("requestCustom — FoundryApiError", async () => {
    fetchMock.mockResolvedValue(jsonErrorResponse(400, errorBody));
    await expect(
      client().targets.requestCustom({
        name: "x",
        product_id: "p",
      }),
    ).rejects.toMatchObject({ status: 400 });
  });
});
