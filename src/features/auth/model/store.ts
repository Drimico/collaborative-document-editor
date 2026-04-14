import { create } from "zustand";
import { supabase } from "../../../shared/lib/supabase";

export const authStore = create((set) => ({
  isAuthenticated: false,
  login: async ({ email, password }: { email: string; password: string }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.log(error);
    } else {
      set({ isAuthenticated: true });
    }
    return null;
  },
  logout: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    } else {
      set({ isAuthenticated: false });
    }
  },

  register: async ({ email, password, name }: { email: string; password: string; name: string }) => {
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });

    if (error) {
      console.log(error);
    } else {
      set({ isAuthenticated: true });
    }
  },
}));
