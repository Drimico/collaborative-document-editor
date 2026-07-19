import { z } from "zod";

export const documentSchema = z.object({
  id: z.number(),
  title: z.string(),
  owner_id: z.string(),
  content: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Document = z.infer<typeof documentSchema>;

export const unifiedDocumentSchema = z.object({
  document_id: z.number(),
  title: z.string(),
  last_edited_at: z.string(),
  owner_id: z.string(),
  user_id: z.string(),
  invited_at: z.string().nullable(),
  relation_type: z.enum(["owned", "shared"]),
  active_date: z.string(),
});

export type UnifiedDocument = z.infer<typeof unifiedDocumentSchema>;
export type DocumentRelationType = UnifiedDocument["relation_type"];