import { useEffect } from "react";
import { updateDocumentTitle } from "../../../entities/document/api/updateDocumentTitle";
import { useParams } from "react-router";
import { useAutosaveStore } from "../../../shared/stores/autosaveStore";

export const useAutosaveTitle = (title: string) => {
  const { id } = useParams();
  const setLastUpdated = useAutosaveStore((state) => state.setLastUpdated);
  useEffect(() => {
    const timer = setTimeout(async () => {
      await updateDocumentTitle({ docId: id ?? "", title });
      setLastUpdated();
    }, 3000);

    return () => clearTimeout(timer);
  }, [title, id, setLastUpdated]);
};
