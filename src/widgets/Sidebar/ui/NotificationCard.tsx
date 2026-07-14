import { FileText } from "lucide-react";
import type { Notification } from "../../../entities/notification/model/types";

interface Props {
  notification: Notification;
  onOpen: () => void;
  onClose: () => void;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const NotificationCard = ({ notification, onOpen, onClose }: Props) => {
  if (!notification.document) {
    return (
      <div className="flex items-center justify-between px-3 py-2 rounded-xl border border-white/5 bg-black/10">
        <span className="text-xs text-(--text-muted) italic">Document no longer available</span>
        <button
          onClick={onClose}
          className="text-xs px-2 py-1 rounded-lg bg-black/20 hover:bg-black/40 text-(--text-muted) hover:text-(--text) transition-colors"
        >
          Dismiss
        </button>
      </div>
    );
  }
  return (
    <div
      className={`flex flex-col gap-3 p-3 rounded-xl border transition-colors ${
        notification.read ? "border-white/5 bg-black/10" : "border-emerald-500/30 bg-emerald-500/15"
      }`}
    >
      {/* Top row — unread dot + sender */}
      <div className="flex items-center gap-2">
        {!notification.read && <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)] shrink-0" />}
        <span className="text-xs font-semibold text-(--text-muted) truncate">{notification.sender.name}</span>
        <span className="text-xs text-(--text-muted) ml-auto shrink-0">{formatDate(notification.created_at)}</span>
      </div>

      {/* Document name */}
      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-black/20 border border-white/5">
        <FileText
          size={13}
          className="text-(--text-muted) shrink-0"
        />
        <span className="text-xs text-(--text-muted) truncate font-medium">{notification.document.title}</span>
      </div>

      {/* Message */}
      <p className="text-xs text-(--text-muted) leading-relaxed px-0.5">Invited you to collaborate on this document.</p>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onClose}
          className="flex-1 text-xs py-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-(--text-muted) hover:text-(--text) transition-colors border border-white/5 cursor-pointer"
        >
          Close
        </button>
        <button
          onClick={onOpen}
          className="flex-1 text-xs py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 hover:text-emerald-300 transition-colors border border-emerald-500/30 font-medium cursor-pointer"
        >
          Open
        </button>
      </div>
    </div>
  );
};
