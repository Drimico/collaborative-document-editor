import { supabase } from "../../../shared/lib/supabase";

export const deleteNotification = async (notificationId: string) => {
  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("id", notificationId);

  return { error };
};