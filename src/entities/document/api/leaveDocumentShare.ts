import { supabase } from "../../../shared/lib/supabase";

export const leaveDocumentShare = async (documentId: number, sharedWith: string) => {
  const { error } = await supabase
    .from("document_shares")
    .delete()
    .eq("document_id", documentId)
    .eq("shared_with", sharedWith);

  return { error };
};
