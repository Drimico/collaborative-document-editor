import { createPortal } from "react-dom";
import { Search, Share2, X } from "lucide-react";
import { useState } from "react";
import { useDocumentSharing } from "../../../features/document-sharing/model/useDocumentSharing";
import { ShareUserRow } from "./ShareUserRow";

interface Props {
  documentId: string;
  onClose: () => void;
}

export const ShareModal = ({ documentId, onClose }: Props) => {
  const [search, setSearch] = useState("");
  const { entries, loading, pendingId, handleGrant, handleRevoke, handleOk } = useDocumentSharing(documentId);

  const filtered = entries.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase()));

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-96 max-h-[70vh] bg-(--bg) border border-white/10 rounded-2xl shadow-2xl flex flex-col animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Share2
              size={18}
              className="text-(--text-muted)"
            />
            <span className="font-semibold text-(--text)">Share Document</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/30 text-(--text-muted) hover:text-(--text) transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded-lg shadow-[inset_0_0_3px_1px_black]/50">
            <Search
              size={16}
              className="text-(--text-muted) shrink-0"
            />
            <input
              autoFocus
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm w-full outline-none text-(--text) placeholder:text-(--text-muted)"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          {loading ? (
            <div className="flex items-center justify-center py-10 text-(--text-muted) text-sm">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="flex items-center justify-center py-10 text-(--text-muted) text-sm">No users found</div>
          ) : (
            filtered.map((entry) => (
              <ShareUserRow
                key={entry.id}
                entry={entry}
                isPending={pendingId === entry.id}
                onGrant={() => handleGrant(entry.id)}
                onRevoke={() => handleRevoke(entry.id)}
                onOk={() => handleOk(entry.id)}
              />
            ))
          )}
        </div>
      </div>
    </>,
    document.body,
  );
};
