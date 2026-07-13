import { supabase } from "../../../shared/lib/supabase";

export const revokeDocumentShare = async (documentId: string, sharedWith: string) => {
  const { error } = await supabase
    .from("document_shares")
    .delete()
    .eq("document_id", documentId)
    .eq("shared_with", sharedWith);

  return { error };
};