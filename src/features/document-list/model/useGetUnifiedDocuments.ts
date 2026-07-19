import { useEffect, useState } from "react";
import { getUnifiedDocuments } from "../../../entities/document/api/getUnifiedDocuments";
import type { UnifiedFilter, UnifiedSort } from "../../../entities/document/api/getUnifiedDocuments";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useAutosaveStore } from "../../../shared/stores/autosaveStore";
import type { UnifiedDocument } from "../../../entities/model/schemas";
import { useDocumentInvalidationStore } from "../../../shared/stores/documentInvalidationStore";

interface FetchParams {
  userId: string;
  filter: UnifiedFilter;
  sort: UnifiedSort;
  start: number;
  end: number;
}

const fetchDocs = async (params: FetchParams) => {
  const { data, error, count } = await getUnifiedDocuments(params);
  if (error || !data) {
    console.error("Couldn't get the documents");
    return { documents: [] as UnifiedDocument[], totalCount: 0 };
  }
  return { documents: data as UnifiedDocument[], totalCount: count ?? 0 };
};

interface UseGetUnifiedDocumentsArgs {
  start?: number;
  end?: number;
  filter?: UnifiedFilter;
  sort?: UnifiedSort;
}

export const useGetUnifiedDocuments = ({ start = 0, end = 12, filter = "all", sort = "newest" }: UseGetUnifiedDocumentsArgs = {}) => {
  const [documents, setDocuments] = useState<UnifiedDocument[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const lastUpdated = useAutosaveStore((state) => state.lastUpdated);
  const { user } = useAuth();
  const version = useDocumentInvalidationStore((state) => state.version);
  const params = { userId: user?.id ?? "", filter, sort, start, end };

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
  }, [user?.id, filter, sort, start, end, lastUpdated, version]);

  const refetch = async () => {
    if (!user?.id) return;
    const result = await fetchDocs(params);
    setDocuments(result.documents);
    setTotalCount(result.totalCount);
  };

  return { documents, totalCount, refetch };
};
