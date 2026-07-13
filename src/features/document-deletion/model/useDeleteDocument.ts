import { useState } from "react";
import { deleteDocument } from "../../../entities/document/api/deleteDocument";
import { useConfirm } from "../../../shared/hooks/useConfirm";
import { useDocumentInvalidationStore } from "../../../shared/stores/documentInvalidationStore";

export const useDeleteDocument = () => {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { confirm } = useConfirm();
  const invalidate = useDocumentInvalidationStore((state) => state.invalidate);
  const remove = async (documentId: number): Promise<boolean> => {
    const isConfirmed = await confirm("Delete this document? This cannot be undone.");

    if (!isConfirmed) return false;

    setDeletingId(documentId);
    const { error } = await deleteDocument(documentId);

    if (error) {
      console.error("Failed to delete document");
      setDeletingId(null);
      return false;
    }

    setDeletingId(null);
    invalidate();
    return true;
  };

  return { remove, deletingId };
};
