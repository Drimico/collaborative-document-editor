import { RoutesProvider } from "../router";
import { YjsProvider } from "./YjsProvider";

export const AppProviders = () => {
  return (
    <YjsProvider roomName="quill-demo">
      <RoutesProvider />
    </YjsProvider>
  );
};
