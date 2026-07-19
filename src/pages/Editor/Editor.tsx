import { useLocation, useParams } from "react-router";
import { YjsProvider } from "../../app/providers/YjsProvider";
import { QuillEditor } from "../../widgets/QuillEditor/QuillEditor";
import { SaveIndicator } from "../../features/document-persistence/ui/SaveIndicator";
import { DocumentTitle } from "../../features/document-persistence/ui/DocumentTitle";
import { useAccessRevocation } from "../../features/document-sharing/model/useAccessRevocation";
export const Editor = () => {
  const { id } = useParams();
  const location = useLocation();
  // kick user out if access is revoked
  useAccessRevocation(id!);

  // optional: show a message if they were redirected due to revocation
  const wasRevoked = location.state?.revoked;
  return (
    <YjsProvider roomName={id ?? ""}>
      {wasRevoked && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm shadow-lg animate-fadeIn">
          Your access to this document was revoked.
        </div>
      )}
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
