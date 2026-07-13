import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../model/authStore";
import { AuthError } from "@supabase/supabase-js";
import { loginSchema } from "./schemas";
const useLogin = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const login = authStore((s) => s.login);
  const navigate = useNavigate();

  const onLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();

    const result = loginSchema.safeParse(loginForm);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path.join(".");
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrorMessages(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      await login(result.data);

      navigate("/dashboard");
    } catch (error) {
      if (error instanceof AuthError) {
        setErrorMessages({ general: error.message });
      }
    } finally {
      setIsLoading(false);
    }
  };
  return {
    loginForm,
    setLoginForm,
    errorMessages,
    isLoading,
    onLogin,
  };
};

export default useLogin;
