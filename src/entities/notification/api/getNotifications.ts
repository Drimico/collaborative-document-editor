import { supabase } from "../../../shared/lib/supabase";

export const getNotifications = async (userId: string) => {
  const { data, error } = await supabase
    .from("notifications")
    .select(`
      *,
      sender:profiles!sender_id(id, name),
      document:documents!document_id(id, title)
    `)
    .eq("recipient_id", userId)
    .order("created_at", { ascending: false })
    .not("document_id", "is", null);

  if (error) console.error("[getNotifications]", error.message);

  // filter out any notifications where the document join returned null (deleted or RLS blocked)
  const filtered = (data ?? []).filter((n) => n.document !== null);

  return { data: filtered, error };
};