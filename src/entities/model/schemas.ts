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