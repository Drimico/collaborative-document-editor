import "../../shared/lib/quill";
import { useEffect, useRef } from "react";
import { QuillBinding } from "y-quill";
import ReactQuill from "react-quill-new";
import { useYjs } from "../../app/providers/YjsProvider";
import "react-quill-new/dist/quill.snow.css";
import { useAuth } from "../../app/providers/AuthProvider";
import { useAwarenessStore } from "../../shared/stores/awarenessStore";

export const QuillEditor = ({ sharedTypeName, placeholder }: { sharedTypeName: string; placeholder: string }) => {
  const { doc, provider } = useYjs();
  const { user } = useAuth();
  const color = useAwarenessStore((state) => state.color);
  const quillRef = useRef<ReactQuill>(null);
  useEffect(() => {
    const quill = quillRef.current;
    if (!quill?.getEditor()) return;
    const editor = quill.getEditor();
    const ytext = doc.getText(sharedTypeName);
    const binding = new QuillBinding(ytext, editor, provider.awareness);
    return () => {
      binding.destroy();
    };
  }, [doc, provider, sharedTypeName]);

  useEffect(() => {
    provider.awareness.setLocalState({
      user: {
        name: user?.identities?.[0]?.identity_data?.name,
        color: color,
        cursor: null,
      },
    });
    return () => provider.awareness.setLocalState(null);
  }, [provider, user, color]);

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      placeholder={placeholder}
      defaultValue=""
      modules={{ cursors: true, toolbar: true }}
    />
  );
};
