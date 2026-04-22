import { RoutesProvider } from "../router";
import { AuthProvider } from "./AuthProvider";

export const AppProviders = () => {
  return (
    <AuthProvider>
      <RoutesProvider />
    </AuthProvider>
  );
};
