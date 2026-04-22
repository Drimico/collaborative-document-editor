import { useParams } from "react-router";
import { YjsProvider } from "../../app/providers/YjsProvider";
import { QuillEditor } from "../../widgets/QuillEditor/QuillEditor";

export const Editor = () => {
  const { id } = useParams();

  return (
    <YjsProvider roomName={id ?? ""}>
      <QuillEditor
        sharedTypeName="quill"
        placeholder="type"
      />
    </YjsProvider>
  );
};
