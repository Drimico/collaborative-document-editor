import { useEffect, useState } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { supabase } from "../../../shared/lib/supabase";
import { getProfiles } from "../../../entities/user/api/getProfiles";
import { getDocumentShares } from "../../../entities/document/api/getDocumentShares";
import { shareDocument } from "../../../entities/document/api/shareDocument";
import { revokeDocumentShare } from "../../../entities/document/api/revokeDocumentShare";
import { createNotification } from "../../../entities/notification/api/createNotification";
import { deleteNotificationForDocument } from "../../../entities/notification/api/deleteNotificationForDocument";

export interface ShareEntry {
  id: string;
  name: string;
  email: string;
  hasAccess: boolean;
  notificationId: string | null;
  notificationRead: boolean;
}

export const useDocumentSharing = (documentId: string) => {
  const [entries, setEntries] = useState<ShareEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const { user } = useAuth();

  // ── initial load ─────────────────────────────────────────────

  useEffect(() => {
    if (!user?.id || !documentId) return;
    let cancelled = false;

    const load = async () => {
      setLoading(true);

      const [profilesRes, sharesRes, notificationsRes] = await Promise.all([
        getProfiles(user!.id),
        getDocumentShares(documentId),
        supabase.from("notifications").select("id, recipient_id, read").eq("document_id", documentId).eq("sender_id", user!.id),
      ]);

      if (cancelled) return;

      const shares = sharesRes.data ?? [];
      const notifications = notificationsRes.data ?? [];

      const mapped: ShareEntry[] = (profilesRes.data ?? []).map((profile) => {
        const share = shares.find((s) => s.shared_with === profile.id);
        const notif = notifications.find((n) => n.recipient_id === profile.id);
        return {
          ...profile,
          hasAccess: !!share,
          notificationId: notif?.id ?? null,
          notificationRead: notif?.read ?? false,
        };
      });

      setEntries(mapped);
      setLoading(false);
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [user?.id, documentId, user]);

  // ── realtime: watch notifications UPDATE (read state) ────────
  useEffect(() => {
    if (!user?.id || !documentId) return;

    const channel = supabase
      .channel(`sharing:sender:${user.id}:${documentId}`)
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
          setEntries((prev) =>
            prev.map((e) => (e.id === updated.recipient_id ? { ...e, notificationRead: updated.read, notificationId: updated.id } : e)),
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, documentId]);

  // ── grant access ─────────────────────────────────────────────
  const handleGrant = async (recipientId: string) => {
    if (!user?.id) return;
    setPendingId(recipientId);

    await Promise.all([shareDocument(documentId, recipientId, user.id), createNotification(recipientId, user.id, documentId)]);

    // optimistic update — re-fetch notification id
    const { data } = await supabase.from("notifications").select("id").eq("document_id", documentId).eq("recipient_id", recipientId).single();

    setEntries((prev) =>
      prev.map((e) => (e.id === recipientId ? { ...e, hasAccess: true, notificationId: data?.id ?? null, notificationRead: false } : e)),
    );
    setPendingId(null);
  };

  // ── revoke access ────────────────────────────────────────────
  const handleRevoke = async (recipientId: string) => {
    if (!user?.id) return;
    setPendingId(recipientId);

    await Promise.all([revokeDocumentShare(documentId, recipientId), deleteNotificationForDocument(documentId, recipientId)]);

    setEntries((prev) => prev.map((e) => (e.id === recipientId ? { ...e, hasAccess: false, notificationId: null, notificationRead: false } : e)));
    setPendingId(null);
  };

  // ── OK: sender acknowledges "Viewed" ─────────────────────────
  const handleOk = async (recipientId: string) => {
    const entry = entries.find((e) => e.id === recipientId);
    if (!entry?.notificationId) return;
    setPendingId(recipientId);

    await deleteNotificationForDocument(documentId, recipientId);

    setEntries((prev) => prev.map((e) => (e.id === recipientId ? { ...e, notificationId: null, notificationRead: false } : e)));
    setPendingId(null);
  };

  return { entries, loading, pendingId, handleGrant, handleRevoke, handleOk };
};
