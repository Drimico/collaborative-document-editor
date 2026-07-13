import { supabase } from "../../../shared/lib/supabase";

export const markNotificationRead = async (notificationId: string) => {
  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", notificationId);

  return { error };
};