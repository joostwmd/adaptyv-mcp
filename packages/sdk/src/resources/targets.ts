import type { FoundryClient } from "../client.js";
import type {
  CreateCustomTargetResponse,
  CustomTargetRequestInfo,
  CustomTargetRequestListResponse,
  ListTargetsOptions,
  PaginationOptions,
  RequestCustomTargetInput,
  TargetInfo,
  TargetListResponse,
} from "../types.js";

export interface TargetsResource {
  list(options?: ListTargetsOptions): Promise<TargetListResponse>;
  get(input: { target_id: string }): Promise<TargetInfo>;
  listCustomRequests(
    options?: PaginationOptions,
  ): Promise<CustomTargetRequestListResponse>;
  getCustomRequest(input: {
    request_id: string;
  }): Promise<CustomTargetRequestInfo>;
  requestCustom(
    input: RequestCustomTargetInput,
  ): Promise<CreateCustomTargetResponse>;
}

export class TargetsResourceImpl implements TargetsResource {
  constructor(private readonly client: FoundryClient) {}

  list(options: ListTargetsOptions = {}): Promise<TargetListResponse> {
    return this.client.request<TargetListResponse>({
      method: "GET",
      path: "/targets",
      query: options as Record<string, string | number | boolean | undefined>,
    });
  }

  get(input: { target_id: string }): Promise<TargetInfo> {
    return this.client.request<TargetInfo>({
      method: "GET",
      path: `/targets/${encodeURIComponent(input.target_id)}`,
    });
  }

  listCustomRequests(
    options: PaginationOptions = {},
  ): Promise<CustomTargetRequestListResponse> {
    return this.client.request<CustomTargetRequestListResponse>({
      method: "GET",
      path: "/targets/request-custom",
      query: options as Record<string, number | undefined>,
    });
  }

  getCustomRequest(input: {
    request_id: string;
  }): Promise<CustomTargetRequestInfo> {
    return this.client.request<CustomTargetRequestInfo>({
      method: "GET",
      path: `/targets/request-custom/${encodeURIComponent(input.request_id)}`,
    });
  }

  requestCustom(
    input: RequestCustomTargetInput,
  ): Promise<CreateCustomTargetResponse> {
    return this.client.request<CreateCustomTargetResponse>({
      method: "POST",
      path: "/targets/request-custom",
      body: input,
    });
  }
}
