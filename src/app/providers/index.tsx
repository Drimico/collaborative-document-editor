import RoutesProvider from "../router";
import { YjsProvider } from "./YjsProvider";

const AppProviders = () => {
  return (
    <YjsProvider roomName="quill-demo">
      <RoutesProvider />
    </YjsProvider>
  );
};

export default AppProviders;
