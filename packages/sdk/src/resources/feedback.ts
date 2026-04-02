import type { FoundryClient } from "../client.js";
import type { SubmitFeedbackInput, SubmitFeedbackResponse } from "../types.js";

export interface FeedbackResource {
  submit(input: SubmitFeedbackInput): Promise<SubmitFeedbackResponse>;
}

export class FeedbackResourceImpl implements FeedbackResource {
  constructor(private readonly client: FoundryClient) {}

  submit(input: SubmitFeedbackInput): Promise<SubmitFeedbackResponse> {
    return this.client.request<SubmitFeedbackResponse>({
      method: "POST",
      path: "/feedback/submit",
      body: input,
    });
  }
}
