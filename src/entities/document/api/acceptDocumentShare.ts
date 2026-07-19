import { supabase } from "../../../shared/lib/supabase";

export const acceptDocumentShare = async (documentId: string, sharedWith: string) => {
  const { error } = await supabase
    .from("document_shares")
    .update({ accepted: true })
    .eq("document_id", documentId)
    .eq("shared_with", sharedWith);

  return { error };
};
