import { supabase } from "../../../shared/lib/supabase";

export const deleteNotificationForDocument = async (
  documentId: string,
  recipientId: string
) => {
  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("document_id", documentId)
    .eq("recipient_id", recipientId);

  return { error };
};