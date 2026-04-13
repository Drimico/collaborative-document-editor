import { CollaborativeEditor } from "../../shared/lib/quill/CollaborativeEditor";

const Editor = () => {
  return (
    <CollaborativeEditor
      sharedTypeName="quill"
      placeholder="type"
    />
  );
};

export default Editor;
