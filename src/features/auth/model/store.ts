import { create } from "zustand";
import { supabase } from "../../../shared/lib/supabase";

interface AuthStore {
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (credentials: { email: string; password: string; name: string }) => Promise<void>;
}

export const authStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  login: async ({ email, password }: { email: string; password: string }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    set({ isAuthenticated: true });
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
    if (error) throw error;
    set({ isAuthenticated: true });
  },
}));
