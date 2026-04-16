import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "../../shared/lib/supabase";
import type { User } from "@supabase/supabase-js";

const AuthContext = createContext<{ user: User | null; loading: boolean }>({ user: null, loading: true });
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    checkSession();
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  return <AuthContext value={{ user, loading }}>{children}</AuthContext>;
};
// eslint-disable-next-line
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
