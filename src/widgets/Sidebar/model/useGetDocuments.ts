import { useEffect, useState } from "react";
import { getDocuments } from "../../../entities/document/api/getDocuments";
import { type Document } from "../../../entities/model/types";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useSearchDebounce } from "./useSearchDebounce";

export const useGetDocuments = ({ start = 0, end = 12 }: { start?: number; end?: number } = {}) => {
  const [documents, setDocuments] = useState<Document[]>();
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const { debounced } = useSearchDebounce(search);
  const { user } = useAuth();
  useEffect(() => {
    const result = async () => {
      if (!user?.id) return;
      const { data, error, count } = await getDocuments({ userId: user?.id, search: debounced, start, end });
      if (error || !data) throw new Error("Couldn't get the documents");
      setDocuments(data);
      setTotalCount(count ?? 0);
    };
    result();
  }, [user?.id, debounced, start, end]);
  return { documents, search, setSearch, totalCount };
};
