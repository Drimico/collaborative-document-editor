import { useEffect, useState } from "react";
import { getDocuments } from "../../../entities/document/api/getDocuments";
import { type Document } from "../../../entities/model/types";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useSearchDebounce } from "./useSearchDebounce";

export const useGetDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>();
  const [search, setSearch] = useState("");
  const { debounced } = useSearchDebounce(search);

  const { user } = useAuth();
  useEffect(() => {
    const result = async () => {
      if (!user?.id) return;
      const { data, error } = await getDocuments({ userId: user?.id, search: debounced });
      if (error || !data) throw new Error("Couldn't get the documents");
      setDocuments(data);
    };
    result();
  }, [user?.id, debounced]);
  return { documents, search, setSearch };
};
