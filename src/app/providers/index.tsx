import { YjsProvider } from "../../shared/lib/yjs/Provider";
import RoutesProvider from "../router";

const AppProviders = () => {
  return (
    <YjsProvider roomName="quill-demo">
      <RoutesProvider />
    </YjsProvider>
  );
};

export default AppProviders;
