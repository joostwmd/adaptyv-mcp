import { ExperimentsResourceImpl } from "./resources/experiments.js";
import type { ExperimentsResource } from "./resources/experiments.js";
import { FeedbackResourceImpl } from "./resources/feedback.js";
import type { FeedbackResource } from "./resources/feedback.js";
import { QuotesResourceImpl } from "./resources/quotes.js";
import type { QuotesResource } from "./resources/quotes.js";
import { ResultsResourceImpl } from "./resources/results.js";
import type { ResultsResource } from "./resources/results.js";
import { SequencesResourceImpl } from "./resources/sequences.js";
import type { SequencesResource } from "./resources/sequences.js";
import { TargetsResourceImpl } from "./resources/targets.js";
import type { TargetsResource } from "./resources/targets.js";
import { TokensResourceImpl } from "./resources/tokens.js";
import type { TokensResource } from "./resources/tokens.js";
import { UpdatesResourceImpl } from "./resources/updates.js";
import type { UpdatesResource } from "./resources/updates.js";

const DEFAULT_BASE =
  "https://foundry-api-public.adaptyvbio.com/api/v1";

export interface FoundryClientOptions {
  /** API token; falls back to `FOUNDRY_API_TOKEN` when omitted */
  apiKey?: string;
  baseUrl?: string;
  fetch?: typeof fetch;
}

export interface RequestInput {
  method: "GET" | "POST" | "PATCH";
  path: string;
  query?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
  headers?: Record<string, string>;
  binary?: boolean;
}

export class FoundryApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, body: unknown, message?: string) {
    super(message ?? `Foundry API error ${status}`);
    this.name = "FoundryApiError";
    this.status = status;
    this.body = body;
  }
}

export class FoundryClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly fetchImpl: typeof fetch;

  readonly targets: TargetsResource;
  readonly experiments: ExperimentsResource;
  readonly sequences: SequencesResource;
  readonly results: ResultsResource;
  readonly quotes: QuotesResource;
  readonly updates: UpdatesResource;
  readonly tokens: TokensResource;
  readonly feedback: FeedbackResource;

  constructor(options: FoundryClientOptions) {
    const envBase =
      typeof process !== "undefined"
        ? process.env.FOUNDRY_API_BASE_URL
        : undefined;
    const envToken =
      typeof process !== "undefined" ? process.env.FOUNDRY_API_TOKEN : undefined;
    const apiKey = options.apiKey ?? envToken;
    if (!apiKey) {
      throw new Error(
        "FoundryClient requires `apiKey` or the FOUNDRY_API_TOKEN environment variable",
      );
    }
    this.baseUrl = (
      options.baseUrl ??
      envBase ??
      DEFAULT_BASE
    ).replace(/\/$/, "");
    this.apiKey = apiKey;
    this.fetchImpl =
      options.fetch ??
      globalThis.fetch?.bind(globalThis) ??
      (() => {
        throw new Error("fetch is not available in this environment");
      });

    this.targets = new TargetsResourceImpl(this);
    this.experiments = new ExperimentsResourceImpl(this);
    this.sequences = new SequencesResourceImpl(this);
    this.results = new ResultsResourceImpl(this);
    this.quotes = new QuotesResourceImpl(this);
    this.updates = new UpdatesResourceImpl(this);
    this.tokens = new TokensResourceImpl(this);
    this.feedback = new FeedbackResourceImpl(this);
  }

  async request<T>(input: RequestInput): Promise<T> {
    const url = new URL(
      `${this.baseUrl}${input.path.startsWith("/") ? input.path : `/${input.path}`}`,
    );
    if (input.query) {
      for (const [k, v] of Object.entries(input.query)) {
        if (v !== undefined && v !== null) {
          url.searchParams.set(k, String(v));
        }
      }
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.apiKey}`,
      Accept: input.binary ? "*/*" : "application/json",
      ...input.headers,
    };

    const init: RequestInit = { method: input.method, headers };

    if (
      input.body !== undefined &&
      (input.method === "POST" || input.method === "PATCH")
    ) {
      headers["Content-Type"] = "application/json";
      init.body = JSON.stringify(input.body);
    }

    const res = await this.fetchImpl(url.toString(), init);

    if (!res.ok) {
      let errBody: unknown;
      const ct = res.headers.get("content-type");
      try {
        if (ct?.includes("application/json")) {
          errBody = await res.json();
        } else {
          errBody = await res.text();
        }
      } catch {
        errBody = undefined;
      }
      throw new FoundryApiError(res.status, errBody);
    }

    if (input.binary) {
      const buf = await res.arrayBuffer();
      return buf as unknown as T;
    }

    const ct = res.headers.get("content-type");
    if (ct?.includes("application/json")) {
      return (await res.json()) as T;
    }

    return (await res.text()) as T;
  }
}
