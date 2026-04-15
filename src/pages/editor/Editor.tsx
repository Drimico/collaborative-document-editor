import { CollaborativeEditor } from "../../shared/lib/quill/CollaborativeEditor";

export const Editor = () => {
  return (
    <CollaborativeEditor
      sharedTypeName="quill"
      placeholder="type"
    />
  );
};

