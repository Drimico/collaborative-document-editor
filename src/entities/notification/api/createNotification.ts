import { supabase } from "../../../shared/lib/supabase";

export const createNotification = async (
  recipientId: string,
  senderId: string,
  documentId: string
) => {
  const { data, error } = await supabase
    .from("notifications")
    .insert({ recipient_id: recipientId, sender_id: senderId, document_id: documentId, read: false })
    .select("id")
    .single();

  return { data, error };
};