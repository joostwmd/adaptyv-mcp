import type { FoundryClient } from "../client.js";
import type {
  AddSequencesInput,
  ListQueryOptions,
  PaginationOptions,
  SequenceAddResponse,
  SequenceInfo,
  SequenceListResponse,
} from "../types.js";

export interface SequencesResource {
  list(options?: ListQueryOptions): Promise<SequenceListResponse>;
  get(input: { sequence_id: string }): Promise<SequenceInfo>;
  add(input: AddSequencesInput): Promise<SequenceAddResponse>;
  listForExperiment(
    input: { experiment_id: string } & PaginationOptions,
  ): Promise<SequenceListResponse>;
}

export class SequencesResourceImpl implements SequencesResource {
  constructor(private readonly client: FoundryClient) {}

  list(options: ListQueryOptions = {}): Promise<SequenceListResponse> {
    return this.client.request<SequenceListResponse>({
      method: "GET",
      path: "/sequences",
      query: options as Record<string, string | number | undefined>,
    });
  }

  get(input: { sequence_id: string }): Promise<SequenceInfo> {
    return this.client.request<SequenceInfo>({
      method: "GET",
      path: `/sequences/${encodeURIComponent(input.sequence_id)}`,
    });
  }

  add(input: AddSequencesInput): Promise<SequenceAddResponse> {
    return this.client.request<SequenceAddResponse>({
      method: "POST",
      path: "/sequences",
      body: input,
    });
  }

  listForExperiment(
    input: { experiment_id: string } & PaginationOptions,
  ): Promise<SequenceListResponse> {
    const { experiment_id, ...query } = input;
    return this.client.request<SequenceListResponse>({
      method: "GET",
      path: `/experiments/${encodeURIComponent(experiment_id)}/sequences`,
      query: query as Record<string, number | undefined>,
    });
  }
}
