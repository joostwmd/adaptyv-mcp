import type { FoundryClient } from "../client.js";
import type {
  ListQueryOptions,
  PaginationOptions,
  ResultInfo,
  ResultListResponse,
} from "../types.js";

export interface ResultsResource {
  list(options?: ListQueryOptions): Promise<ResultListResponse>;
  get(input: { result_id: string }): Promise<ResultInfo>;
  listForExperiment(
    input: { experiment_id: string } & PaginationOptions,
  ): Promise<ResultListResponse>;
}

export class ResultsResourceImpl implements ResultsResource {
  constructor(private readonly client: FoundryClient) {}

  list(options: ListQueryOptions = {}): Promise<ResultListResponse> {
    return this.client.request<ResultListResponse>({
      method: "GET",
      path: "/results",
      query: options as Record<string, string | number | undefined>,
    });
  }

  get(input: { result_id: string }): Promise<ResultInfo> {
    return this.client.request<ResultInfo>({
      method: "GET",
      path: `/results/${encodeURIComponent(input.result_id)}`,
    });
  }

  listForExperiment(
    input: { experiment_id: string } & PaginationOptions,
  ): Promise<ResultListResponse> {
    const { experiment_id, ...query } = input;
    return this.client.request<ResultListResponse>({
      method: "GET",
      path: `/experiments/${encodeURIComponent(experiment_id)}/results`,
      query: query as Record<string, number | undefined>,
    });
  }
}
