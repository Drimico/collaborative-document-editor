import { supabase } from "../../../shared/lib/supabase";

export const deleteDocument = async (documentId: number) => {
  const { error } = await supabase
    .from("documents")
    .delete()
    .eq("id", documentId);

  return { error };
};