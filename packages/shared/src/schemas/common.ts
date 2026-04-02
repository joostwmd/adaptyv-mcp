import { z } from "zod";

export const experimentTypeSchema = z.enum([
  "affinity",
  "screening",
  "thermostability",
  "fluorescence",
  "expression",
]);

export const experimentStatusSchema = z.enum([
  "draft",
  "waiting_for_confirmation",
  "canceled",
  "waiting_for_materials",
  "in_production",
  "quote_sent",
  "in_queue",
  "data_analysis",
  "in_review",
  "done",
]);

export const resultsStatusSchema = z.enum(["none", "partial", "all"]);

export const assayMethodSchema = z.enum(["bli", "spr"]);

export const feedbackTypeSchema = z.enum([
  "feature_request",
  "feedback",
  "bug_report",
]);

export const quoteRejectionReasonSchema = z.enum([
  "price",
  "scope",
  "timeline",
  "budget",
  "other",
]);

export const customTargetRequestStatusSchema = z.enum([
  "pending_review",
  "approved",
  "rejected",
]);

export const stripeInvoiceStatusSchema = z.enum([
  "draft",
  "open",
  "paid",
  "void",
  "uncollectible",
]);

export const stripeQuoteStatusSchema = z.enum([
  "draft",
  "open",
  "accepted",
  "canceled",
  "stale",
]);

export const paginationSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export const listQuerySchema = paginationSchema.extend({
  filter: z.string().optional(),
  sort: z.string().optional(),
  search: z.string().optional(),
});

export function paginatedResponseSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    items: z.array(itemSchema),
    total: z.number(),
    count: z.number(),
    offset: z.number(),
  });
}

export const errorResponseBodySchema = z.object({
  error: z.string(),
  request_id: z.string().nullable().optional(),
});

/** Structural helper for generic `PaginatedResponse<T>` (matches list response envelope). */
export type PaginatedResponse<TItem> = {
  items: TItem[];
  total: number;
  count: number;
  offset: number;
};

export type ExperimentType = z.infer<typeof experimentTypeSchema>;
export type ExperimentStatus = z.infer<typeof experimentStatusSchema>;
export type ResultsStatus = z.infer<typeof resultsStatusSchema>;
export type AssayMethod = z.infer<typeof assayMethodSchema>;
export type FeedbackType = z.infer<typeof feedbackTypeSchema>;
export type QuoteRejectionReason = z.infer<typeof quoteRejectionReasonSchema>;
export type CustomTargetRequestStatus = z.infer<
  typeof customTargetRequestStatusSchema
>;
export type StripeInvoiceStatus = z.infer<typeof stripeInvoiceStatusSchema>;
export type StripeQuoteStatus = z.infer<typeof stripeQuoteStatusSchema>;
export type PaginationOptions = z.infer<typeof paginationSchema>;
export type ListQueryOptions = z.infer<typeof listQuerySchema>;
export type ErrorResponseBody = z.infer<typeof errorResponseBodySchema>;
