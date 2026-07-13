import { useEffect, useState } from "react";
import { getDocuments } from "../../../entities/document/api/getDocuments";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useSearchDebounce } from "./useSearchDebounce";
import { useAutosaveStore } from "../../../shared/stores/autosaveStore";
import type { Document } from "../../../entities/model/schemas";
import { useDocumentInvalidationStore } from "../../../shared/stores/documentInvalidationStore";

const fetchDocs = async (params: { userId: string; search: string; start: number; end: number }) => {
  const { data, error, count } = await getDocuments(params);
  if (error || !data) {
    console.error("Couldn't get the documents");
    return { documents: [], totalCount: 0 };
  }
  return { documents: data, totalCount: count ?? 0 };
};

export const useGetDocuments = ({ start = 0, end = 12, search = "" }: { start?: number; end?: number; search?: string } = {}) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const lastUpdated = useAutosaveStore((state) => state.lastUpdated);
  const { debounced } = useSearchDebounce(search);
  const { user } = useAuth();
  const version = useDocumentInvalidationStore((state) => state.version);
  const params = { userId: user?.id ?? "", search: debounced, start, end };

  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;

    fetchDocs(params).then(({ documents, totalCount }) => {
      if (cancelled) return;
      setDocuments(documents);
      setTotalCount(totalCount);
    });

    return () => {
      cancelled = true;
    };
  }, [user?.id, debounced, start, end, lastUpdated, version]);

  const refetch = async () => {
    if (!user?.id) return;
    const result = await fetchDocs(params);
    setDocuments(result.documents);
    setTotalCount(result.totalCount);
  };

  return { documents, totalCount, refetch };
};
