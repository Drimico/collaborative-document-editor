import { useState } from "react";
import { leaveDocumentShare } from "../../../entities/document/api/leaveDocumentShare";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useConfirm } from "../../../shared/hooks/useConfirm";
import { useDocumentInvalidationStore } from "../../../shared/stores/documentInvalidationStore";

export const useLeaveDocument = () => {
  const [leavingId, setLeavingId] = useState<number | null>(null);
  const { confirm } = useConfirm();
  const { user } = useAuth();
  const invalidate = useDocumentInvalidationStore((state) => state.invalidate);

  const leave = async (documentId: number): Promise<boolean> => {
    const isConfirmed = await confirm("Leave this document? You'll lose access to it.");

    if (!isConfirmed) return false;

    setLeavingId(documentId);
    const { error } = await leaveDocumentShare(documentId, user?.id ?? "");

    if (error) {
      console.error("Failed to leave document");
      setLeavingId(null);
      return false;
    }

    setLeavingId(null);
    invalidate();
    return true;
  };

  return { leave, leavingId };
};
