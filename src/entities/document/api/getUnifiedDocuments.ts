import { supabase } from "../../../shared/lib/supabase";
import type { DocumentRelationType } from "../../model/schemas";

export type UnifiedFilter = "all" | DocumentRelationType;
export type UnifiedSort = "newest" | "oldest";

interface GetUnifiedDocumentsParams {
  userId: string;
  filter?: UnifiedFilter;
  sort?: UnifiedSort;
  start: number;
  end: number;
}

export const getUnifiedDocuments = ({
  userId,
  filter = "all",
  sort = "newest",
  start,
  end,
}: GetUnifiedDocumentsParams) => {
  let query = supabase
    .from("unified_documents")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .range(start, end)
    .order("active_date", { ascending: sort === "oldest" });

  // "all" returns both relations; otherwise narrow to a single relation type.
  if (filter !== "all") {
    query = query.eq("relation_type", filter);
  }

  return query;
};
