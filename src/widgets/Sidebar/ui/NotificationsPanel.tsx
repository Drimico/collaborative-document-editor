import { Mail } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNotifications } from "../../../features/notifications/model/useNotifications";
import { NotificationCard } from "./NotificationCard";

export const NotificationPanel = () => {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, handleOpen, handleClose } = useNotifications();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={panelRef} className="relative">
      {/* Mail icon trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-(--bg-light) shadow-(--shadow-s) cursor-pointer hover:bg-black/30 transition-colors"
      >
        <Mail
          size={20}
          color="var(--text-muted)"
        />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shadow-[0_0_6px_rgba(16,185,129,0.8)]">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="scrollbar-thin absolute bottom-12 left-0 w-80 max-h-96 overflow-y-auto rounded-2xl bg-(--bg) shadow-(--shadow-m) border border-white/10 flex flex-col gap-2 p-3 animate-fadeIn z-50">
          <span className="text-sm font-semibold text-(--text-muted) px-1">Notifications</span>
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 gap-2 text-(--text-muted)">
              <Mail size={32} />
              <span className="text-sm">No notifications</span>
            </div>
          ) : (
            notifications.map((n) => (
              <NotificationCard
                key={n.id}
                notification={n}
                onOpen={() => {
                  setOpen(false);
                  handleOpen(n.id, n.document.id);
                }}
                onClose={() => handleClose(n.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};
