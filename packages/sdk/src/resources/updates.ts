import type { FoundryClient } from "../client.js";
import type {
  ListQueryOptions,
  PaginationOptions,
  UpdateListResponse,
} from "../types.js";

export interface UpdatesResource {
  list(options?: ListQueryOptions): Promise<UpdateListResponse>;
  listForExperiment(
    input: { experiment_id: string } & PaginationOptions,
  ): Promise<UpdateListResponse>;
}

export class UpdatesResourceImpl implements UpdatesResource {
  constructor(private readonly client: FoundryClient) {}

  list(options: ListQueryOptions = {}): Promise<UpdateListResponse> {
    return this.client.request<UpdateListResponse>({
      method: "GET",
      path: "/updates",
      query: options as Record<string, string | number | undefined>,
    });
  }

  listForExperiment(
    input: { experiment_id: string } & PaginationOptions,
  ): Promise<UpdateListResponse> {
    const { experiment_id, ...query } = input;
    return this.client.request<UpdateListResponse>({
      method: "GET",
      path: `/experiments/${encodeURIComponent(experiment_id)}/updates`,
      query: query as Record<string, number | undefined>,
    });
  }
}
