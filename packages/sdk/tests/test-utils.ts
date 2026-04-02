import { expect, vi } from "vitest";

/** Minimal `Response` shape for mocked `fetch` */
export function jsonResponse<T>(
  data: T,
  init?: { status?: number; ok?: boolean },
): Response {
  const status = init?.status ?? 200;
  return {
    ok: init?.ok ?? (status >= 200 && status < 300),
    status,
    headers: new Headers({ "content-type": "application/json" }),
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
    arrayBuffer: () =>
      Promise.resolve(new TextEncoder().encode(JSON.stringify(data)).buffer),
  } as Response;
}

export function jsonErrorResponse(
  status: number,
  body: unknown,
): Response {
  return {
    ok: false,
    status,
    headers: new Headers({ "content-type": "application/json" }),
    json: () => Promise.resolve(body),
    text: () =>
      Promise.resolve(typeof body === "string" ? body : JSON.stringify(body)),
    arrayBuffer: () => Promise.reject(new Error("not binary")),
  } as Response;
}

export function binaryResponse(
  buffer: ArrayBuffer,
  contentType = "application/pdf",
): Response {
  return {
    ok: true,
    status: 200,
    headers: new Headers({ "content-type": contentType }),
    arrayBuffer: () => Promise.resolve(buffer),
    json: () => Promise.reject(new Error("not json")),
    text: () => Promise.reject(new Error("not text")),
  } as Response;
}

export function installFetchMock(): ReturnType<typeof vi.fn> {
  const fetchMock = vi.fn();
  globalThis.fetch = fetchMock as unknown as typeof fetch;
  return fetchMock;
}

export function assertLastFetch(
  fetchMock: ReturnType<typeof vi.fn>,
  expected: {
    method: string;
    urlIncludes: string | string[];
    bearerToken?: string;
    body?: unknown;
  },
): void {
  const call = fetchMock.mock.calls.at(-1);
  expect(call).toBeDefined();
  const [url, init] = call as [string, RequestInit];
  const parts = Array.isArray(expected.urlIncludes)
    ? expected.urlIncludes
    : [expected.urlIncludes];
  for (const p of parts) {
    expect(url).toContain(p);
  }
  expect(init.method).toBe(expected.method);
  const headers = init.headers as Record<string, string>;
  const token = expected.bearerToken ?? "test-token";
  expect(headers.Authorization).toBe(`Bearer ${token}`);
  if (expected.body !== undefined) {
    expect(init.body).toBeDefined();
    expect(JSON.parse(init.body as string)).toEqual(expected.body);
  }
}
