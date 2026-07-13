import { ConfirmModal } from "../../shared/ui/ConfirmModal/ConfirmModal";
import { RoutesProvider } from "../router";
import { AuthProvider } from "./AuthProvider";

export const AppProviders = () => {
  return (
    <AuthProvider>
      <RoutesProvider />
      <ConfirmModal/>
    </AuthProvider>
  );
};
