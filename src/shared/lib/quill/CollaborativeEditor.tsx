import { useEffect, useRef } from "react";
import { Quill } from "react-quill-new";
import { QuillBinding } from "y-quill";
import QuillCursors from "quill-cursors";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useYjs } from "../../../app/providers/YjsProvider";

Quill.register("modules/cursors", QuillCursors);

export const CollaborativeEditor = ({ sharedTypeName, placeholder }: { sharedTypeName: string; placeholder: string }) => {
  const { doc, provider } = useYjs();
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill?.getEditor()) return;

    const ytext = doc.getText(sharedTypeName);
    const binding = new QuillBinding(ytext, quill.getEditor(), provider.awareness);

    return () => {
      binding.destroy();
    };
  }, [doc, provider, sharedTypeName]);

  useEffect(() => {
    provider.awareness.setLocalState({
      user: {
        name: "Anonymous",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      },
    });
  }, [provider]);

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
