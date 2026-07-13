import { supabase } from "../../../shared/lib/supabase";

export const getProfiles = async (excludeUserId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, name, email")
    .neq("id", excludeUserId)
    .order("name", { ascending: true });

  if (error) console.error("[getProfiles]", error.message);

  return { data, error };
};