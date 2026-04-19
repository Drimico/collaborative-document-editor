import { useEffect, useState } from "react";
import { getDocuments } from "../../../entities/document/api/getDocuments";
import { type Document } from "../../../entities/model/types";
import { useAuth } from "../../../app/providers/AuthProvider";

export const useGetDocuments = ({ search }: { search: string }) => {
  const [documents, setDocuments] = useState<Document[]>();
  const { user } = useAuth();
  useEffect(() => {
    const result = async () => {
      if (!user?.id) return;
      const { data, error } = await getDocuments({ userId: user?.id, search });
      if (error || !data) throw new Error("Couldn't get the documents");
      setDocuments(data);
    };
    result();
  }, [user?.id, search]);
  return { documents };
};
