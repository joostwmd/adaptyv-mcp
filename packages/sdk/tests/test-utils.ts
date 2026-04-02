import { expect, vi } from "vitest";
import { FoundryApiError } from "../src/client.js";

/** Default `Accept` for JSON requests (matches `FoundryClient`). */
export const JSON_ACCEPT = "application/json";

/** `Accept` for binary downloads (`binary: true`). */
export const BINARY_ACCEPT = "*/*";

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

/** Success JSON with charset (exercises `content-type` `includes("application/json")` branch). */
export function jsonResponseWithJsonCharset<T>(
  data: T,
  init?: { status?: number; ok?: boolean },
): Response {
  const status = init?.status ?? 200;
  return {
    ok: init?.ok ?? (status >= 200 && status < 300),
    status,
    headers: new Headers({
      "content-type": "application/json; charset=utf-8",
    }),
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

/** JSON error body with charset (matches typical servers; pins error `content-type` parsing). */
export function jsonErrorResponseWithJsonCharset(
  status: number,
  body: unknown,
): Response {
  return {
    ok: false,
    status,
    headers: new Headers({
      "content-type": "application/json; charset=utf-8",
    }),
    json: () => Promise.resolve(body),
    text: () =>
      Promise.resolve(typeof body === "string" ? body : JSON.stringify(body)),
    arrayBuffer: () => Promise.reject(new Error("not binary")),
  } as Response;
}

/** Error response with a non-JSON content-type (exercises `res.text()` error path). */
export function textPlainErrorResponse(
  status: number,
  text: string,
): Response {
  return {
    ok: false,
    status,
    headers: new Headers({ "content-type": "text/plain; charset=utf-8" }),
    json: () => Promise.reject(new Error("not json")),
    text: () => Promise.resolve(text),
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

/** Read a request header from `RequestInit` (plain object, `Headers`, or tuples). */
export function getRequestHeader(
  init: RequestInit,
  name: string,
): string | null {
  const raw = init.headers;
  if (raw == null) return null;
  if (raw instanceof Headers) {
    return raw.get(name);
  }
  if (Array.isArray(raw)) {
    const lower = name.toLowerCase();
    const hit = raw.find(([k]) => k.toLowerCase() === lower);
    return hit ? String(hit[1]) : null;
  }
  const rec = raw as Record<string, string>;
  const key = Object.keys(rec).find(
    (k) => k.toLowerCase() === name.toLowerCase(),
  );
  return key !== undefined ? rec[key]! : null;
}

export type AssertLastFetchExpected = {
  method: string;
  urlIncludes: string | string[];
  bearerToken?: string;
  /** Assert JSON body and `Content-Type: application/json`. */
  body?: unknown;
  /** Assert no body and no `Content-Type` (GET, or POST without JSON body). */
  noBody?: boolean;
  /** Assert `Accept` header (e.g. `JSON_ACCEPT` or `BINARY_ACCEPT`). */
  accept?: string;
};

export function assertLastFetch(
  fetchMock: ReturnType<typeof vi.fn>,
  expected: AssertLastFetchExpected,
): void {
  const call = fetchMock.mock.calls.at(-1);
  expect(call).toBeDefined();
  const [url, init] = call as [string, RequestInit];
  expect(init).toBeDefined();

  if (expected.body !== undefined && expected.noBody) {
    throw new Error("assertLastFetch: cannot use both body and noBody");
  }

  const parts = Array.isArray(expected.urlIncludes)
    ? expected.urlIncludes
    : [expected.urlIncludes];
  for (const p of parts) {
    expect(url).toContain(p);
  }
  expect(init!.method).toBe(expected.method);

  const token = expected.bearerToken ?? "test-token";
  expect(getRequestHeader(init!, "Authorization")).toBe(`Bearer ${token}`);

  if (expected.accept !== undefined) {
    expect(getRequestHeader(init!, "Accept")).toBe(expected.accept);
  }

  if (expected.body !== undefined) {
    expect(init!.body).toBeDefined();
    expect(JSON.parse(init!.body as string)).toEqual(expected.body);
    expect(getRequestHeader(init!, "Content-Type")).toBe("application/json");
  }

  if (expected.noBody) {
    expect(init!.body).toBeUndefined();
    expect(getRequestHeader(init!, "Content-Type")).toBeNull();
  }
}

/** Strict JSON error assertions (kills `FoundryApiError` message / super-argument mutants). */
export async function expectRejectsFoundryApiJsonError(
  promise: Promise<unknown>,
  expected: { status: number; body: unknown },
): Promise<void> {
  let err: unknown;
  try {
    await promise;
    expect.fail("expected rejection");
  } catch (e) {
    err = e;
  }
  expect(err).toBeInstanceOf(FoundryApiError);
  const fe = err as FoundryApiError;
  expect(fe.status).toBe(expected.status);
  expect(fe.body).toEqual(expected.body);
  expect(fe.message).toBe(`Foundry API error ${expected.status}`);
}
