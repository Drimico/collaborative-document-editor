import { useEffect, useState } from "react";
import { getDocuments } from "../../../entities/document/api/getDocuments";
import { type Document } from "../../../entities/model/types";
import { useAuth } from "../../../app/providers/AuthProvider";

export const useGetDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>();
  const { user } = useAuth();
  useEffect(() => {
    const result = async () => {
      if (!user?.id) throw new Error("user is not authenticated");
      const { data, error } = await getDocuments({ userId: user?.id });
      if (error || !data) throw new Error("Couldn't get the documents");
      setDocuments(data);
    };
    result();
  }, [user?.id]);
  return { documents };
};
