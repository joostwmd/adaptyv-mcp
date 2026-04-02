/** Shared error body for mocked API failures (OpenAPI `ErrorResponse`). */
export const errorBody = {
  error: "experiment not found",
  request_id: "req_019462a4-b1c2-7def-8901-23456789abcd",
} as const;

export const fixtureMeta = {
  description:
    "Example request/response bodies aligned with Adaptyv Foundry OpenAPI (see openapi.json in this folder).",
  openapiUrl: "https://foundry-api-public.adaptyvbio.com/api/v1/openapi.json",
} as const;
