import "../../shared/lib/quill";
import { useEffect, useRef } from "react";
import { QuillBinding } from "y-quill";
import ReactQuill from "react-quill-new";
import { useYjs } from "../../app/providers/YjsProvider";
import "react-quill-new/dist/quill.snow.css";
import { useAuth } from "../../app/providers/AuthProvider";
import { useAwarenessStore } from "../../shared/stores/awarenessStore";
import { useAutosave } from "../../features/document-persistence/model/useAutosave";

export const QuillEditor = ({ sharedTypeName, placeholder }: { sharedTypeName: string; placeholder: string }) => {
  const { doc, provider } = useYjs();
  const { user } = useAuth();
  const color = useAwarenessStore((state) => state.color);
  const quillRef = useRef<ReactQuill>(null);
  useAutosave(quillRef);
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
      modules={{
        cursors: true,
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          ["link", "image", "video", "formula"],

          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],

          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],

          ["clean"],
        ],
      }}
      className="[&_.ql-container.ql-snow]:bg-white  [&_.ql-snow]:h-fit h-full bg-white w-full text-black"
    />
  );
};
