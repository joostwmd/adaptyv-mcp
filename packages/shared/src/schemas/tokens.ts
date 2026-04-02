import { z } from "zod";
import { paginatedResponseSchema, paginationSchema } from "./common.js";

export const listTokensInputSchema = paginationSchema;

export const attenuationSpecSchema = z.object({
  read_only: z.boolean().optional(),
  non_destructive: z.boolean().optional(),
  expires_at: z.string().nullable().optional(),
  allowed_actions: z.array(z.string()).nullable().optional(),
  allowed_resources: z.array(z.string()).nullable().optional(),
  allowed_org_ids: z.array(z.string()).nullable().optional(),
});

export const attenuateTokenInputSchema = z.object({
  token: z.string(),
  name: z.string(),
  attenuation: attenuationSpecSchema,
  attenuated_parent_token_id: z.string().nullable().optional(),
});

/** Empty object for `tokens.revoke({})` */
export const revokeTokenInputSchema = z.object({}).strict();

export const tokenListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  kind: z.string(),
  created_at: z.string(),
  expires_at: z.string().nullable().optional(),
  parent_token_id: z.string().nullable().optional(),
  root_token_id: z.string().nullable().optional(),
  revoked_at: z.string().nullable().optional(),
  token_type: z.string().nullable().optional(),
  attenuation_spec: z.unknown().optional(),
});

export const tokenListResponseSchema = paginatedResponseSchema(tokenListItemSchema);

export const attenuateTokenResponseSchema = z.object({
  token: z.string(),
  id: z.string(),
});

export const revokeTokenResponseSchema = z.object({
  token_id: z.string(),
  revoked_at: z.string(),
  children_revoked: z.number(),
});

export type AttenuationSpec = z.infer<typeof attenuationSpecSchema>;
export type AttenuateTokenInput = z.infer<typeof attenuateTokenInputSchema>;
export type TokenListItem = z.infer<typeof tokenListItemSchema>;
export type TokenListResponse = z.infer<typeof tokenListResponseSchema>;
export type AttenuateTokenResponse = z.infer<typeof attenuateTokenResponseSchema>;
export type RevokeTokenResponse = z.infer<typeof revokeTokenResponseSchema>;
