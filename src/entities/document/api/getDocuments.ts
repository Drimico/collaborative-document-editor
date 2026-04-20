import { supabase } from "../../../shared/lib/supabase";

export const getDocuments = ({ userId, search, start, end }: { userId: string; search?: string; start: number; end: number }) => {
  if (search?.trim()) {
    return supabase
      .from("documents")
      .select("*", { count: "exact" })
      .range(start, end)
      .eq("owner_id", userId)
      .ilike("title", `%${search.trim()}%`)
      .order("created_at", { ascending: false });
  }
  return supabase
    .from("documents")
    .select("*", { count: "exact" })
    .range(start, end)
    .eq("owner_id", userId)
    .order("created_at", { ascending: false });
};
