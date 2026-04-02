import { z } from "zod";
import {
  assayMethodSchema,
  experimentStatusSchema,
  experimentTypeSchema,
  listQuerySchema,
  paginatedResponseSchema,
  resultsStatusSchema,
  stripeInvoiceStatusSchema,
  stripeQuoteStatusSchema,
} from "./common.js";
import { experimentSequenceMapValueSchema, sequenceEntrySchema } from "./sequences.js";

export const listExperimentsInputSchema = listQuerySchema;

export const experimentSpecSchema = z
  .object({
    experiment_type: experimentTypeSchema,
    method: assayMethodSchema.nullable().optional(),
    target_id: z.string().nullable().optional(),
    sequences: z
      .record(z.string(), experimentSequenceMapValueSchema)
      .nullable()
      .optional(),
    n_replicates: z.number().nullable().optional(),
    antigen_concentrations: z.array(z.number()).nullable().optional(),
    parameters: z.unknown().optional(),
  })
  .passthrough();

export const createExperimentInputSchema = z.object({
  name: z.string(),
  experiment_spec: experimentSpecSchema,
  webhook_url: z.string().nullable().optional(),
  skip_draft: z.boolean().optional(),
  auto_accept_quote: z.boolean().optional(),
});

export const updateExperimentInputSchema = z.object({
  experiment_id: z.string(),
  name: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  n_replicates: z.number().nullable().optional(),
  target_id: z.string().nullable().optional(),
  webhook_url: z.string().nullable().optional(),
  antigen_concentrations: z.array(z.number()).nullable().optional(),
  sequences: z.array(sequenceEntrySchema).nullable().optional(),
  parameters: z.unknown().optional(),
});

export const estimateCostInputSchema = z.object({
  experiment_spec: experimentSpecSchema,
});

export const getExperimentInputSchema = z.object({
  experiment_id: z.string(),
});

export const submitExperimentInputSchema = z.object({
  experiment_id: z.string(),
});

export const confirmExperimentQuoteInputSchema = z.object({
  experiment_id: z.string(),
  notes: z.string().nullable().optional(),
  purchase_order_number: z.string().nullable().optional(),
});

export const getExperimentQuotePdfInputSchema = z.object({
  experiment_id: z.string(),
});

export const experimentListItemSchema = z.object({
  id: z.string(),
  code: z.string(),
  status: experimentStatusSchema,
  experiment_type: experimentTypeSchema,
  created_at: z.string(),
  results_status: resultsStatusSchema,
  experiment_url: z.string(),
  name: z.string().nullable().optional(),
  stripe_invoice_url: z.string().nullable().optional(),
  stripe_quote_url: z.string().nullable().optional(),
});

export const experimentListResponseSchema = paginatedResponseSchema(
  experimentListItemSchema,
);

export const createExperimentResponseSchema = z.object({
  experiment_id: z.string(),
  error: z.string().nullable().optional(),
  stripe_hosted_invoice_url: z.string().nullable().optional(),
  stripe_invoice_id: z.string().nullable().optional(),
});

export const expInfoSchema = z.object({
  id: z.string(),
  code: z.string(),
  status: experimentStatusSchema,
  experiment_spec: experimentSpecSchema,
  created_at: z.string(),
  results_status: resultsStatusSchema,
  experiment_url: z.string(),
  name: z.string().nullable().optional(),
  costs: z.unknown().nullable().optional(),
  stripe_invoice_url: z.string().nullable().optional(),
  stripe_quote_url: z.string().nullable().optional(),
});

export const updateExperimentResponseSchema = z.object({
  id: z.string(),
  updated: z.boolean(),
  message: z.string().nullable().optional(),
});

export const experimentConfirmationResponseSchema = z.object({
  experiment_id: z.string(),
  previous_status: experimentStatusSchema,
  status: experimentStatusSchema,
  confirmed_at: z.string(),
  stripe_invoice_url: z.string().nullable().optional(),
});

export const experimentInvoiceResponseSchema = z.object({
  experiment_id: z.string(),
  status: stripeInvoiceStatusSchema.nullable().optional(),
  stripe_invoice_url: z.string().nullable().optional(),
});

export const experimentQuoteResponseSchema = z.object({
  experiment_id: z.string(),
  stripe_quote_url: z.string(),
  amount_total: z.number(),
  amount_subtotal: z.number(),
  currency: z.string(),
  status: stripeQuoteStatusSchema,
  expires_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export const costEstimateResponseSchema = z.object({
  breakdown: z.unknown().optional(),
  incomplete: z.unknown().optional(),
  warnings: z.array(z.string()).optional(),
});

export type ExperimentSpec = z.infer<typeof experimentSpecSchema>;
export type ConfirmExperimentQuoteInput = z.infer<
  typeof confirmExperimentQuoteInputSchema
>;
export type CreateExperimentInput = z.infer<typeof createExperimentInputSchema>;
export type UpdateExperimentInput = z.infer<typeof updateExperimentInputSchema>;
export type EstimateCostInput = z.infer<typeof estimateCostInputSchema>;
export type ExperimentListItem = z.infer<typeof experimentListItemSchema>;
export type ExperimentListResponse = z.infer<typeof experimentListResponseSchema>;
export type CreateExperimentResponse = z.infer<
  typeof createExperimentResponseSchema
>;
export type ExpInfo = z.infer<typeof expInfoSchema>;
export type UpdateExperimentResponse = z.infer<
  typeof updateExperimentResponseSchema
>;
export type ExperimentConfirmationResponse = z.infer<
  typeof experimentConfirmationResponseSchema
>;
export type ExperimentInvoiceResponse = z.infer<
  typeof experimentInvoiceResponseSchema
>;
export type ExperimentQuoteResponse = z.infer<
  typeof experimentQuoteResponseSchema
>;
export type CostEstimateResponse = z.infer<typeof costEstimateResponseSchema>;
