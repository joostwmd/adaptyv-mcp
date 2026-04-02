import type { FoundryClient } from "../client.js";
import type {
  ConfirmQuoteResponse,
  ConfirmStandaloneQuoteInput,
  ListQueryOptions,
  QuoteInfo,
  QuoteListResponse,
  RejectQuoteInput,
  RejectQuoteResponse,
} from "../types.js";

export interface QuotesResource {
  list(options?: ListQueryOptions): Promise<QuoteListResponse>;
  get(input: { quote_id: string }): Promise<QuoteInfo>;
  confirm(input: ConfirmStandaloneQuoteInput): Promise<ConfirmQuoteResponse>;
  reject(input: RejectQuoteInput): Promise<RejectQuoteResponse>;
}

export class QuotesResourceImpl implements QuotesResource {
  constructor(private readonly client: FoundryClient) {}

  list(options: ListQueryOptions = {}): Promise<QuoteListResponse> {
    return this.client.request<QuoteListResponse>({
      method: "GET",
      path: "/quotes",
      query: options as Record<string, string | number | undefined>,
    });
  }

  get(input: { quote_id: string }): Promise<QuoteInfo> {
    return this.client.request<QuoteInfo>({
      method: "GET",
      path: `/quotes/${encodeURIComponent(input.quote_id)}`,
    });
  }

  confirm(
    input: ConfirmStandaloneQuoteInput,
  ): Promise<ConfirmQuoteResponse> {
    const { quote_id, ...body } = input;
    return this.client.request<ConfirmQuoteResponse>({
      method: "POST",
      path: `/quotes/${encodeURIComponent(quote_id)}/confirm`,
      body,
    });
  }

  reject(input: RejectQuoteInput): Promise<RejectQuoteResponse> {
    const { quote_id, ...body } = input;
    return this.client.request<RejectQuoteResponse>({
      method: "POST",
      path: `/quotes/${encodeURIComponent(quote_id)}/reject`,
      body,
    });
  }
}
