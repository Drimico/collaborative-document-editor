import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../app/providers/AuthProvider";
import { supabase } from "../../../shared/lib/supabase";
import { getNotifications } from "../../../entities/notification/api/getNotifications";
import { markNotificationRead } from "../../../entities/notification/api/markNotificationRead";
import { deleteNotification } from "../../../entities/notification/api/deleteNotification";
import { acceptDocumentShare } from "../../../entities/document/api/acceptDocumentShare";
import type { Notification } from "../../../entities/notification/model/types";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  // ── initial fetch ────────────────────────────────────────────
  useEffect(() => {
    if (!user?.id) return;

    getNotifications(user.id).then(({ data }) => {
      if (data) setNotifications(data as Notification[]);
    });
  }, [user?.id]);

  // ── realtime: new notification arrives ───────────────────────
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel(`notifications:recipient:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `recipient_id=eq.${user.id}`,
        },
        async () => {
          const { data } = await getNotifications(user.id!);
          if (data) setNotifications(data as Notification[]);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "notifications",
          filter: `recipient_id=eq.${user.id}`,
        },
        (payload) => {
          setNotifications((prev) => prev.filter((n) => n.id !== payload.old.id));
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  // ── handlers ─────────────────────────────────────────────────

  // Open: accept the share (makes the doc visible in the dashboard),
  // delete the notification row + navigate to editor
  const handleOpen = async (notificationId: string, documentId: string) => {
    if (!user?.id) return;
    await Promise.all([acceptDocumentShare(documentId, user.id), deleteNotification(notificationId)]);
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    navigate(`/documents/${documentId}`);
  };

  // Close: mark as read (row stays, sender sees "Viewed")
  const handleClose = async (notificationId: string) => {
    await markNotificationRead(notificationId);
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return { notifications, unreadCount, handleOpen, handleClose };
};
