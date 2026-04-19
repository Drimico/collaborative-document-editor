import { supabase } from "../../../shared/lib/supabase";

export const getDocuments = ({ userId, search }: { userId: string; search?: string }) => {
  if (search?.trim()) {
    return supabase.from("documents").select().eq("owner_id", userId).ilike("title", `%${search.trim()}%`).order("created_at", { ascending: false });
  }
  return supabase.from("documents").select().eq("owner_id", userId).order("created_at", { ascending: false });
};
