import { supabase } from "../../../shared/lib/supabase";

export const getDocumentShares = async (documentId: string) => {
  const { data, error } = await supabase
    .from("document_shares")
    .select("id, shared_with")
    .eq("document_id", documentId);

  return { data, error };
};