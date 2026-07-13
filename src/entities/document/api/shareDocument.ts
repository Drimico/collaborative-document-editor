import { supabase } from "../../../shared/lib/supabase";

export const shareDocument = async (
  documentId: string,
  sharedWith: string,
  sharedBy: string
) => {
  const { error } = await supabase
    .from("document_shares")
    .insert({ document_id: documentId, shared_with: sharedWith, shared_by: sharedBy });

  return { error };
};