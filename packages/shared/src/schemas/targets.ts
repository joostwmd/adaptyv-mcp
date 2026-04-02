import { z } from "zod";
import {
  customTargetRequestStatusSchema,
  listQuerySchema,
  paginatedResponseSchema,
  paginationSchema,
} from "./common.js";

export const listTargetsInputSchema = listQuerySchema.extend({
  selfservice_only: z.boolean().optional(),
});

export const getTargetInputSchema = z.object({
  target_id: z.string(),
});

export const listCustomTargetRequestsInputSchema = paginationSchema;

export const getCustomTargetRequestInputSchema = z.object({
  request_id: z.string(),
});

export const requestCustomTargetInputSchema = z
  .object({
    name: z.string(),
    product_id: z.string(),
    sequence: z.string().nullable().optional(),
    pdb_id: z.string().nullable().optional(),
    pdb_file: z.string().nullable().optional(),
    molecular_weight: z.number().nullable().optional(),
    note: z.string().nullable().optional(),
    product_url: z.string().nullable().optional(),
    vendor: z.string().nullable().optional(),
  })
  .passthrough();

export const targetInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  vendor_name: z.string(),
  catalog_number: z.string(),
  url: z.string(),
  uniprot_id: z.string().nullable().optional(),
  details: z.unknown().nullable().optional(),
  pricing: z.unknown().nullable().optional(),
});

export const targetListResponseSchema = paginatedResponseSchema(targetInfoSchema);

export const customTargetRequestSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
  product_id: z.string(),
  status: customTargetRequestStatusSchema,
  created_at: z.string(),
});

export const customTargetRequestListResponseSchema = paginatedResponseSchema(
  customTargetRequestSummarySchema,
);

export const createCustomTargetResponseSchema = z.object({
  id: z.string(),
  status: customTargetRequestStatusSchema,
  created_at: z.string(),
});

export const customTargetRequestInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  product_id: z.string(),
  status: customTargetRequestStatusSchema,
  created_at: z.string(),
  updated_at: z.string(),
  sequence: z.string().nullable().optional(),
  pdb_id: z.string().nullable().optional(),
  pdb_file: z.string().nullable().optional(),
  molecular_weight: z.number().nullable().optional(),
  note: z.string().nullable().optional(),
  product_url: z.string().nullable().optional(),
  vendor: z.string().nullable().optional(),
  material_id: z.string().nullable().optional(),
});

export type ListTargetsOptions = z.infer<typeof listTargetsInputSchema>;
export type RequestCustomTargetInput = z.infer<
  typeof requestCustomTargetInputSchema
>;
export type TargetInfo = z.infer<typeof targetInfoSchema>;
export type TargetListResponse = z.infer<typeof targetListResponseSchema>;
export type CustomTargetRequestSummary = z.infer<
  typeof customTargetRequestSummarySchema
>;
export type CustomTargetRequestListResponse = z.infer<
  typeof customTargetRequestListResponseSchema
>;
export type CreateCustomTargetResponse = z.infer<
  typeof createCustomTargetResponseSchema
>;
export type CustomTargetRequestInfo = z.infer<
  typeof customTargetRequestInfoSchema
>;
