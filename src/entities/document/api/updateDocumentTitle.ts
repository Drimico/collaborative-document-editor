import { supabase } from "../../../shared/lib/supabase";

export const updateDocumentTitle = ({ docId, title }: { docId: string; title: string }) => {
  return supabase.from("documents").update({ title }).eq("id", docId);
};
