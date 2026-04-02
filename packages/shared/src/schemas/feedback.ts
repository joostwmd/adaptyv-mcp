import { z } from "zod";
import { feedbackTypeSchema } from "./common.js";

export const submitFeedbackInputSchema = z.object({
  request_uuid: z.string(),
  feedback_type: feedbackTypeSchema,
  title: z.string().nullable().optional(),
  human_note: z.string().nullable().optional(),
  json_body: z.unknown().optional(),
});

export const submitFeedbackResponseSchema = z.object({
  reference: z.string(),
  message: z.string(),
});

export type SubmitFeedbackInput = z.infer<typeof submitFeedbackInputSchema>;
export type SubmitFeedbackResponse = z.infer<
  typeof submitFeedbackResponseSchema
>;
