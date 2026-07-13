import { useEffect, useState } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { supabase } from "../../../shared/lib/supabase";
import { deleteNotification } from "../../../entities/notification/api/deleteNotification";

// Tracks read state of notifications sent by the current user.
// Used in the sharing modal to show the "Viewed" indicator.
export const useSenderNotifications = (documentId: string) => {
  // map of recipient_id → notification id, only for read=true rows
  const [viewedByRecipient, setViewedByRecipient] = useState<
    Record<string, string> // recipientId → notificationId
  >({});
  const { user } = useAuth();

  // ── realtime: watch for recipient marking read ───────────────
  useEffect(() => {
    if (!user?.id || !documentId) return;

    const channel = supabase
      .channel(`notifications:sender:${user.id}:${documentId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "notifications",
          filter: `sender_id=eq.${user.id}`,
        },
        (payload) => {
          const updated = payload.new as {
            id: string;
            document_id: string;
            recipient_id: string;
            read: boolean;
          };
          if (updated.document_id !== documentId) return;
          if (updated.read) {
            setViewedByRecipient((prev) => ({
              ...prev,
              [updated.recipient_id]: updated.id,
            }));
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, documentId]);

  // ── OK action: sender acknowledges "Viewed" and deletes row ──
  const handleOk = async (recipientId: string) => {
    const notificationId = viewedByRecipient[recipientId];
    if (!notificationId) return;

    await deleteNotification(notificationId);
    setViewedByRecipient((prev) => {
      const next = { ...prev };
      delete next[recipientId];
      return next;
    });
  };

  return { viewedByRecipient, handleOk };
};
