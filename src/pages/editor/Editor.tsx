import { useParams } from "react-router";
import { YjsProvider } from "../../app/providers/YjsProvider";
import { QuillEditor } from "../../widgets/QuillEditor/QuillEditor";
import { SaveIndicator } from "../../features/document-persistence/ui/SaveIndicator";
import { DocumentTitle } from "../../features/document-persistence/ui/DocumentTitle";

export const Editor = () => {
  const { id } = useParams();
  return (
    <YjsProvider roomName={id ?? ""}>
      <div className="flex flex-col justify-center items-center px-50 py-20 h-full">
        <div className="flex items-center text-4xl gap-5 w-full">
          <DocumentTitle />
          <SaveIndicator />
        </div>
        <QuillEditor
          sharedTypeName="quill"
          placeholder="type"
        />
      </div>
    </YjsProvider>
  );
};
