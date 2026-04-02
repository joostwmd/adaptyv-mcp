import {
  errorResponseBodySchema,
  submitFeedbackInputSchema,
  submitFeedbackResponseSchema,
} from "@adaptyv/foundry-shared";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { errorBody, feedbackFixtures } from "@adaptyv/foundry-shared/fixtures";
import { FoundryClient } from "../src/client.js";
import {
  assertLastFetch,
  installFetchMock,
  JSON_ACCEPT,
  jsonErrorResponse,
  jsonResponse,
} from "./test-utils.js";

describe("FeedbackResource", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = installFetchMock();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const client = () => new FoundryClient({ apiKey: "test-token" });

  it("submit — success (201)", async () => {
    const body = submitFeedbackInputSchema.parse({
      ...feedbackFixtures.submit.requestBody,
    });
    fetchMock.mockResolvedValue(
      jsonResponse(feedbackFixtures.submit.response, { status: 201 }),
    );
    const out = await client().feedback.submit(body);
    submitFeedbackResponseSchema.parse(out);
    expect(out).toEqual(feedbackFixtures.submit.response);
    assertLastFetch(fetchMock, {
      method: "POST",
      urlIncludes: "/feedback/submit",
      accept: JSON_ACCEPT,
      body: feedbackFixtures.submit.requestBody,
    });
  });

  it("submit — FoundryApiError", async () => {
    errorResponseBodySchema.parse(errorBody);
    fetchMock.mockResolvedValue(jsonErrorResponse(400, errorBody));
    await expect(
      client().feedback.submit({
        request_uuid: "01900abc-1234-7890-1234-567890abcdef",
        feedback_type: "bug_report",
      }),
    ).rejects.toMatchObject({ status: 400 });
  });
});
