import { z } from "zod";
import { listQuerySchema, paginatedResponseSchema, paginationSchema } from "./common.js";

export const listSequencesInputSchema = listQuerySchema;

export const sequenceEntrySchema = z.object({
  aa_string: z.string(),
  name: z.string().nullable().optional(),
  control: z.boolean().optional(),
  metadata: z.unknown().optional(),
});

export const experimentSequenceMapValueSchema = z.union([
  z.string(),
  sequenceEntrySchema,
]);

export const addSequencesInputSchema = z.object({
  experiment_code: z.string(),
  sequences: z.array(sequenceEntrySchema),
});

export const getSequenceInputSchema = z.object({
  sequence_id: z.string(),
});

export const listSequencesForExperimentInputSchema = z
  .object({
    experiment_id: z.string(),
  })
  .merge(paginationSchema);

export const sequenceListItemSchema = z.object({
  id: z.string(),
  length: z.number(),
  experiment_id: z.string(),
  experiment_code: z.string(),
  is_control: z.boolean(),
  created_at: z.string(),
  aa_preview: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
});

export const sequenceListResponseSchema = paginatedResponseSchema(
  sequenceListItemSchema,
);

export const sequenceExperimentRefSchema = z.object({
  experiment_id: z.string(),
  experiment_code: z.string(),
  experiment_status: z.string().nullable().optional(),
});

export const sequenceInfoSchema = z.object({
  id: z.string(),
  length: z.number(),
  is_control: z.boolean(),
  experiment: sequenceExperimentRefSchema,
  created_at: z.string(),
  aa_string: z.string().nullable().optional(),
  metadata: z.unknown().nullable().optional(),
});

export const sequenceAddResponseSchema = z.object({
  added_count: z.number(),
  experiment_id: z.string(),
  experiment_code: z.string(),
  sequence_ids: z.array(z.string()),
});

export type SequenceEntry = z.infer<typeof sequenceEntrySchema>;
export type ExperimentSequenceMapValue = z.infer<
  typeof experimentSequenceMapValueSchema
>;
export type AddSequencesInput = z.infer<typeof addSequencesInputSchema>;
export type SequenceListItem = z.infer<typeof sequenceListItemSchema>;
export type SequenceListResponse = z.infer<typeof sequenceListResponseSchema>;
export type SequenceExperimentRef = z.infer<typeof sequenceExperimentRefSchema>;
export type SequenceInfo = z.infer<typeof sequenceInfoSchema>;
export type SequenceAddResponse = z.infer<typeof sequenceAddResponseSchema>;
