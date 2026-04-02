import { z } from "zod";
import { listQuerySchema, paginatedResponseSchema, paginationSchema } from "./common.js";

export const listUpdatesInputSchema = listQuerySchema;

export const listUpdatesForExperimentInputSchema = z
  .object({
    experiment_id: z.string(),
  })
  .merge(paginationSchema);

export const updateEntrySchema = z.object({
  id: z.string(),
  experiment_id: z.string(),
  experiment_code: z.string(),
  name: z.string(),
  timestamp: z.string(),
});

export const updateListResponseSchema = paginatedResponseSchema(updateEntrySchema);

export type UpdateEntry = z.infer<typeof updateEntrySchema>;
export type UpdateListResponse = z.infer<typeof updateListResponseSchema>;
