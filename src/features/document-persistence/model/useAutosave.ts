import { useParams } from "react-router";
import { useYjs } from "../../../app/providers/YjsProvider";
import { useEffect, useRef, type RefObject } from "react";
import { updateDocumentContent } from "../../../entities/document/api/updateDocumentContent";
import type ReactQuill from "react-quill-new";
import { useAutosaveStore } from "../../../shared/stores/autosaveStore";

export const useAutosave = (editorRef: RefObject<ReactQuill | null>) => {
  const setStatus = useAutosaveStore((state) => state.setStatus);
  const { doc } = useYjs();
  const { id } = useParams();
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => {
    const editor = editorRef.current?.getEditor();
    if (!editor) return;
    const event = doc.on("update", () => {
      setStatus("saving");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(async () => {
        const text = editor.root.innerHTML;
        await updateDocumentContent({ docId: id ?? "", content: text });
        setStatus("saved");
      }, 3000);
    });
    return () => {
      clearTimeout(timer.current);
      doc.off("update", event);
    };
  }, [doc, editorRef, id, setStatus]);
};
