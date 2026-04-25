import { supabase } from "../../../shared/lib/supabase";

export const getDocument = async ({ docId }: { docId: string }) => {
  const data = await supabase.from("documents").select("title").eq("id", docId).limit(1).single();
  return data;
};
