import { z } from "zod";
import {
  listQuerySchema,
  paginatedResponseSchema,
  quoteRejectionReasonSchema,
  stripeQuoteStatusSchema,
} from "./common.js";

export const listQuotesInputSchema = listQuerySchema;

export const confirmQuoteInputSchema = z.object({
  notes: z.string().nullable().optional(),
  purchase_order_number: z.string().nullable().optional(),
});

export const confirmStandaloneQuoteInputSchema = confirmQuoteInputSchema.extend({
  quote_id: z.string(),
});

export const rejectQuoteBodySchema = z.object({
  reason: quoteRejectionReasonSchema,
  feedback: z.string().nullable().optional(),
});

export const rejectQuoteInputSchema = rejectQuoteBodySchema.extend({
  quote_id: z.string(),
});

export const getQuoteInputSchema = z.object({
  quote_id: z.string(),
});

export const quoteListItemSchema = z.object({
  id: z.string(),
  quote_number: z.string(),
  organization_id: z.string(),
  amount_cents: z.number(),
  currency: z.string(),
  status: stripeQuoteStatusSchema,
  valid_until: z.string(),
  created_at: z.string(),
  stripe_quote_url: z.string(),
});

export const quoteListResponseSchema = paginatedResponseSchema(quoteListItemSchema);

export const quoteLineItemSchema = z.object({
  description: z.string(),
  quantity: z.number(),
  unit_price_cents: z.number(),
  total_cents: z.number(),
});

export const quoteInfoSchema = z
  .object({
    id: z.string(),
    quote_number: z.string(),
    organization_id: z.string(),
    organization_name: z.string(),
    line_items: z.array(quoteLineItemSchema),
    subtotal_cents: z.number(),
    tax_cents: z.number(),
    total_cents: z.number(),
    currency: z.string(),
    status: stripeQuoteStatusSchema,
    valid_until: z.string(),
    created_at: z.string(),
    notes: z.string(),
    terms_and_conditions: z.string(),
    stripe_quote_url: z.string(),
  })
  .passthrough();

export const confirmQuoteResponseSchema = z.object({
  id: z.string(),
  status: stripeQuoteStatusSchema,
  hosted_invoice_url: z.string().nullable().optional(),
  invoice_id: z.string().nullable().optional(),
});

export const rejectQuoteResponseSchema = z.object({
  id: z.string(),
  status: stripeQuoteStatusSchema,
});

export type ConfirmQuoteInput = z.infer<typeof confirmQuoteInputSchema>;
export type ConfirmQuoteResponse = z.infer<typeof confirmQuoteResponseSchema>;
export type ConfirmStandaloneQuoteInput = z.infer<
  typeof confirmStandaloneQuoteInputSchema
>;
export type RejectQuoteBody = z.infer<typeof rejectQuoteBodySchema>;
export type RejectQuoteInput = z.infer<typeof rejectQuoteInputSchema>;

export type QuoteListItem = z.infer<typeof quoteListItemSchema>;
export type QuoteListResponse = z.infer<typeof quoteListResponseSchema>;
export type QuoteLineItem = z.infer<typeof quoteLineItemSchema>;
export type QuoteInfo = z.infer<typeof quoteInfoSchema>;
export type RejectQuoteResponse = z.infer<typeof rejectQuoteResponseSchema>;
