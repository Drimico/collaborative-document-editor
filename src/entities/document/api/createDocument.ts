import { supabase } from "../../../shared/lib/supabase";

export const createDocument = ({ userId }: { userId: string }) => {
  const document = supabase.from("documents").insert({ title: "Untitled Document", owner_id: userId }).select().single();
  return document;
};
