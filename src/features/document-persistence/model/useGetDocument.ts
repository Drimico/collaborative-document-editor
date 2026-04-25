import { useParams } from "react-router";
import { getDocument } from "../../../entities/document/api/getDocument";
import { useEffect, useState } from "react";

export const useGetDocument = () => {
  const [title, setTitle] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const fetch = async () => {
      const { data: document } = await getDocument({ docId: id ?? "" });
      if (document) setTitle(document.title);
    };
    fetch();
  }, [id]);
  return { title, setTitle };
};
