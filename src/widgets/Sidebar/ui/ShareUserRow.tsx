import { Check, Loader2, X } from "lucide-react";
import type { ShareEntry } from "../../../features/document-sharing/model/useDocumentSharing";

interface Props {
  entry: ShareEntry;
  isPending: boolean;
  onGrant: () => void;
  onRevoke: () => void;
  onOk: () => void;
}

export const ShareUserRow = ({ entry, isPending, onGrant, onRevoke, onOk }: Props) => {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-black/20 transition-colors bg-black/10 shadow-[inset_0_0_3px_1px_black]/50">
      {/* Name + status */}
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-xs text-(--text-muted) truncate">{entry.name}</span>
      </div>

      {/* Viewed badge + OK */}
      {entry.hasAccess && entry.notificationRead && (
        <button
          onClick={onOk}
          disabled={isPending}
          className="text-xs px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors disabled:opacity-50 cursor-pointer"
        >
          Viewed ✓
        </button>
      )}

      {/* Spinner */}
      {isPending ? (
        <Loader2
          size={16}
          className="animate-spin text-(--text-muted) shrink-0"
        />
      ) : entry.hasAccess ? (
        // Revoke button
        <button
          onClick={onRevoke}
          className="w-7 h-7 flex items-center justify-center rounded-full text-white/40 hover:text-red-400 hover:bg-black/30 hover:shadow-[0_0_10px_rgba(239,68,68,0.4)] transition-all shrink-0 cursor-pointer"
        >
          <X size={14} />
        </button>
      ) : (
        // Grant button
        <button
          onClick={onGrant}
          className="w-7 h-7 flex items-center justify-center rounded-full text-white/40 hover:text-emerald-400 hover:bg-black/30 hover:shadow-[0_0_10px_rgba(16,185,129,0.4)] transition-all shrink-0 cursor-pointer"
        >
          <Check size={14} />
        </button>
      )}
    </div>
  );
};
