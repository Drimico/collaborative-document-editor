import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../app/providers/AuthProvider";
import { supabase } from "../../../shared/lib/supabase";

export const useAccessRevocation = (documentId: string) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id || !documentId) return;

    const channel = supabase
      .channel(`access:revocation:${documentId}:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "document_shares",
          filter: `document_id=eq.${documentId}`,
        },
        (payload) => {
          if (payload.old.shared_with !== user.id) return;

          // tear down happens naturally on navigate — Yjs/WS cleanup via component unmount
          navigate("/dashboard", {
            state: { revoked: true },
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, documentId]);
};