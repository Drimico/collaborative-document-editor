import { supabase } from "../../../shared/lib/supabase";

export const getDocuments = ({ userId }: { userId: string }) => {
  const documents = supabase.from("documents").select().eq("owner_id", userId).order("created_at", { ascending: false });
  return documents;
};
