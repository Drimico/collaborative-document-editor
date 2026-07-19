import { useParams } from "react-router";
import { useEffect, type RefObject } from "react";
import type ReactQuill from "react-quill-new";
import { useYjs } from "../../../app/providers/YjsProvider";
import { getDocument } from "../../../entities/document/api/getDocument";

// The websocket server keeps document state in memory only. When the first
// client joins a room the server no longer remembers (restart / cold start),
// restore the last autosaved content from the database into the editor so it
// propagates through the binding to the ydoc and every other client.
export const useSeedContent = (editorRef: RefObject<ReactQuill | null>, sharedTypeName: string) => {
  const { doc, provider } = useYjs();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const seed = async () => {
      if (doc.getText(sharedTypeName).length > 0) return;
      const { data } = await getDocument({ docId: id });
      const editor = editorRef.current?.getEditor();
      if (cancelled || !editor || !data?.content) return;
      // re-check: another client may have seeded while we were fetching
      if (doc.getText(sharedTypeName).length > 0) return;
      editor.clipboard.dangerouslyPasteHTML(data.content);
    };

    if (provider.synced) {
      seed();
      return () => {
        cancelled = true;
      };
    }

    const onSync = (isSynced: boolean) => {
      if (isSynced) seed();
    };
    provider.on("sync", onSync);
    return () => {
      cancelled = true;
      provider.off("sync", onSync);
    };
  }, [doc, provider, id, sharedTypeName, editorRef]);
};
