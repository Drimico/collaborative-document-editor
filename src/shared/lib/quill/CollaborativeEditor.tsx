import { useEffect, useRef } from "react";
import { useYjs } from "../yjs/Provider";
import Quill from "quill";
import { QuillBinding } from "y-quill";
import QuillCursors from "quill-cursors";
import "quill/dist/quill.snow.css";

Quill.register("modules/cursors", QuillCursors);

export const CollaborativeEditor = ({ sharedTypeName, placeholder }: { sharedTypeName: string; placeholder: string }) => {
  const { doc, provider } = useYjs();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const editorContainer = document.createElement("div");
    wrapper.appendChild(editorContainer);

    const quill = new Quill(editorContainer, {
      modules: {
        cursors: true,
        toolbar: true,
      },
      theme: "snow",
      placeholder,
    });

    const ytext = doc.getText(sharedTypeName);
    const binding = new QuillBinding(ytext, quill, provider.awareness);

    return () => {
      binding.destroy();
      quill.disable();

      if (wrapper) {
        wrapper.innerHTML = "";
      }
    };
  }, [doc, provider, placeholder, sharedTypeName]);

  useEffect(() => {
    provider.awareness.setLocalState({
      user: {
        name: "Anonymous",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      },
    });
  }, [provider]);

  return (
    <div
      ref={wrapperRef}
      className="w-full h-full"
    />
  );
};
