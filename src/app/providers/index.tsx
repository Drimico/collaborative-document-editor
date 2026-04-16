import { RoutesProvider } from "../router";
import { AuthProvider } from "./AuthProvider";
import { YjsProvider } from "./YjsProvider";

export const AppProviders = () => {
  return (
    <AuthProvider>
      <YjsProvider roomName="quill-demo">
        <RoutesProvider />
      </YjsProvider>
    </AuthProvider>
  );
};
