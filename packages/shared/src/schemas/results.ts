import { z } from "zod";
import { listQuerySchema, paginatedResponseSchema, paginationSchema } from "./common.js";

export const listResultsInputSchema = listQuerySchema;

export const getResultInputSchema = z.object({
  result_id: z.string(),
});

export const listResultsForExperimentInputSchema = z
  .object({
    experiment_id: z.string(),
  })
  .merge(paginationSchema);

export const resultInfoSchema = z.object({
  id: z.string(),
  title: z.string(),
  experiment_id: z.string(),
  result_type: z.string(),
  created_at: z.string(),
  summary: z.array(z.unknown()),
  metadata: z.unknown(),
  data_package_url: z.string().nullable().optional(),
  timeline: z.unknown().optional(),
});

export const resultListResponseSchema = paginatedResponseSchema(resultInfoSchema);

export type ResultInfo = z.infer<typeof resultInfoSchema>;
export type ResultListResponse = z.infer<typeof resultListResponseSchema>;
