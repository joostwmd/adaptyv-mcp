import type { FoundryClient } from "../client.js";
import type {
  AttenuateTokenInput,
  AttenuateTokenResponse,
  PaginationOptions,
  RevokeTokenResponse,
  TokenListResponse,
} from "../types.js";

export interface TokensResource {
  list(options?: PaginationOptions): Promise<TokenListResponse>;
  attenuate(input: AttenuateTokenInput): Promise<AttenuateTokenResponse>;
  revoke(input: Record<string, never>): Promise<RevokeTokenResponse>;
}

export class TokensResourceImpl implements TokensResource {
  constructor(private readonly client: FoundryClient) {}

  list(options: PaginationOptions = {}): Promise<TokenListResponse> {
    return this.client.request<TokenListResponse>({
      method: "GET",
      path: "/tokens",
      query: options as Record<string, number | undefined>,
    });
  }

  attenuate(input: AttenuateTokenInput): Promise<AttenuateTokenResponse> {
    return this.client.request<AttenuateTokenResponse>({
      method: "POST",
      path: "/tokens/attenuate",
      body: input,
    });
  }

  revoke(_input: Record<string, never> = {}): Promise<RevokeTokenResponse> {
    void _input;
    return this.client.request<RevokeTokenResponse>({
      method: "POST",
      path: "/tokens/revoke",
    });
  }
}
