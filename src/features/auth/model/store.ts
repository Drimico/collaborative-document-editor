import { create } from "zustand";
import { supabase } from "../../../shared/lib/supabase";

interface AuthStore {
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (credentials: { email: string; password: string; name: string }) => Promise<void>;
}

export const authStore = create<AuthStore>(() => ({
  login: async ({ email, password }: { email: string; password: string }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  },
  logout: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    } 
  },

  register: async ({ email, password, name }: { email: string; password: string; name: string }) => {
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
    if (error) throw error;
  },
}));
