import type { FoundryClient } from "../client.js";
import type {
  ConfirmExperimentQuoteInput,
  ConfirmQuoteResponse,
  CostEstimateResponse,
  CreateExperimentInput,
  CreateExperimentResponse,
  EstimateCostInput,
  ExperimentConfirmationResponse,
  ExperimentInvoiceResponse,
  ExperimentListResponse,
  ExperimentQuoteResponse,
  ExpInfo,
  ListQueryOptions,
  UpdateExperimentInput,
  UpdateExperimentResponse,
} from "../types.js";

export interface ExperimentsResource {
  list(options?: ListQueryOptions): Promise<ExperimentListResponse>;
  create(input: CreateExperimentInput): Promise<CreateExperimentResponse>;
  get(input: { experiment_id: string }): Promise<ExpInfo>;
  update(input: UpdateExperimentInput): Promise<UpdateExperimentResponse>;
  submit(
    input: { experiment_id: string },
  ): Promise<ExperimentConfirmationResponse>;
  estimateCost(input: EstimateCostInput): Promise<CostEstimateResponse>;
  getInvoice(
    input: { experiment_id: string },
  ): Promise<ExperimentInvoiceResponse>;
  getQuote(
    input: { experiment_id: string },
  ): Promise<ExperimentQuoteResponse>;
  confirmQuote(input: ConfirmExperimentQuoteInput): Promise<ConfirmQuoteResponse>;
  getQuotePdf(input: { experiment_id: string }): Promise<ArrayBuffer>;
}

export class ExperimentsResourceImpl implements ExperimentsResource {
  constructor(private readonly client: FoundryClient) {}

  list(options: ListQueryOptions = {}): Promise<ExperimentListResponse> {
    return this.client.request<ExperimentListResponse>({
      method: "GET",
      path: "/experiments",
      query: options as Record<string, string | number | undefined>,
    });
  }

  create(input: CreateExperimentInput): Promise<CreateExperimentResponse> {
    return this.client.request<CreateExperimentResponse>({
      method: "POST",
      path: "/experiments",
      body: input,
    });
  }

  get(input: { experiment_id: string }): Promise<ExpInfo> {
    return this.client.request<ExpInfo>({
      method: "GET",
      path: `/experiments/${encodeURIComponent(input.experiment_id)}`,
    });
  }

  update(input: UpdateExperimentInput): Promise<UpdateExperimentResponse> {
    const { experiment_id, ...body } = input;
    return this.client.request<UpdateExperimentResponse>({
      method: "PATCH",
      path: `/experiments/${encodeURIComponent(experiment_id)}`,
      body,
    });
  }

  submit(
    input: { experiment_id: string },
  ): Promise<ExperimentConfirmationResponse> {
    return this.client.request<ExperimentConfirmationResponse>({
      method: "POST",
      path: `/experiments/${encodeURIComponent(input.experiment_id)}/submit`,
    });
  }

  estimateCost(input: EstimateCostInput): Promise<CostEstimateResponse> {
    return this.client.request<CostEstimateResponse>({
      method: "POST",
      path: "/experiments/cost-estimate",
      body: input,
    });
  }

  getInvoice(
    input: { experiment_id: string },
  ): Promise<ExperimentInvoiceResponse> {
    return this.client.request<ExperimentInvoiceResponse>({
      method: "GET",
      path: `/experiments/${encodeURIComponent(input.experiment_id)}/invoice`,
    });
  }

  getQuote(
    input: { experiment_id: string },
  ): Promise<ExperimentQuoteResponse> {
    return this.client.request<ExperimentQuoteResponse>({
      method: "GET",
      path: `/experiments/${encodeURIComponent(input.experiment_id)}/quote`,
    });
  }

  confirmQuote(
    input: ConfirmExperimentQuoteInput,
  ): Promise<ConfirmQuoteResponse> {
    const { experiment_id, ...body } = input;
    return this.client.request<ConfirmQuoteResponse>({
      method: "POST",
      path: `/experiments/${encodeURIComponent(experiment_id)}/quote/confirm`,
      body,
    });
  }

  getQuotePdf(input: { experiment_id: string }): Promise<ArrayBuffer> {
    return this.client.request<ArrayBuffer>({
      method: "GET",
      path: `/experiments/${encodeURIComponent(input.experiment_id)}/quote/pdf`,
      binary: true,
    });
  }
}
