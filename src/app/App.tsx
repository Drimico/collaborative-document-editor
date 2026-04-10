import { CollaborativeEditor } from "../shared/lib/quill/CollaborativeEditor";
import { YjsProvider } from "../shared/lib/yjs/Provider";

function App() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <YjsProvider
        roomName="quill-demo"
      >
        <CollaborativeEditor
          sharedTypeName="quill"
          placeholder="type"
        />
      </YjsProvider>
    </div>
  );
}

export default App;
