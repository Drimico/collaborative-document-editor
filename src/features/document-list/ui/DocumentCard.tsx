import { FilePenLine, Loader2, LogOut, X } from "lucide-react";
import type { UnifiedDocument } from "../../../entities/model/schemas";
import { formatRelativeTime } from "../../../widgets/Dashboard/model/formatRelativeTime";

interface DocumentCardProps {
  document: UnifiedDocument;
  onOpen: (documentId: number) => void;
  onDelete?: (documentId: number) => void;
  onLeave?: (documentId: number) => void;
  busyId?: number | null;
}

export const DocumentCard = ({ document: doc, onOpen, onDelete, onLeave, busyId }: DocumentCardProps) => {
  const isShared = doc.relation_type === "shared";
  const isBusy = busyId === doc.document_id;

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isShared) onLeave?.(doc.document_id);
    else onDelete?.(doc.document_id);
  };

  const showAction = isShared ? onLeave : onDelete;

  return (
    <div
      onClick={() => onOpen(doc.document_id)}
      className="w-60 h-40 bg-(--bg) rounded-2xl p-2 flex flex-col items-center shadow-(--shadow-m) cursor-pointer break-all relative group"
    >
      {showAction && (
        <button
          onClick={handleAction}
          disabled={isBusy}
          title={isShared ? "Leave document" : "Delete document"}
          className="absolute top-2.5 right-2.5
           opacity-0 group-hover:opacity-100 transition-all duration-200
           w-7 h-7 flex items-center justify-center rounded-full cursor-pointer
           text-white/40 group-hover:text-red-400
           group-hover:bg-black/30
           disabled:cursor-wait disabled:opacity-50"
        >
          {isBusy ? (
            <Loader2
              size={14}
              className="animate-spin"
            />
          ) : isShared ? (
            <LogOut size={14} />
          ) : (
            <X size={14} />
          )}
        </button>
      )}

      <div className="flex items-center gap-4 h-1/2 w-full">
        <FilePenLine
          size={30}
          color="var(--text-muted)"
          className="shrink-0"
        />
        <div className="flex flex-col">
          <span>{doc.title}</span>
          <span>
            {isShared ? "Active" : "Edited"} {formatRelativeTime(doc.active_date)}
          </span>
        </div>
      </div>

      <div className="border-t w-full h-1/2 relative">
        <span>Contributors:</span>
        {isShared && <span className="absolute bottom-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full bg-(--bg-light) text-cyan-700 text-shadow-none">Shared</span>}
      </div>
    </div>
  );
};
