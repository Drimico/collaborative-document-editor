import { supabase } from "../../../shared/lib/supabase";

export const updateDocumentContent = ({ docId, content }: { docId: string; content: string }) => {
  return supabase.from("documents").update({ content }).eq("id", docId);
};
