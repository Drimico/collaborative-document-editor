import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../model/store";
import { AuthError } from "@supabase/supabase-js";

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
    const newErrors: Record<string, string> = {};
    if (!loginForm.email) newErrors.email = "Email is required";
    if (!loginForm.password) newErrors.password = "Password is required";
    if (!loginForm.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.email)) newErrors.email = "Please enter a valid email address";
    if (!loginForm.password) newErrors.password = "Password is required";
    else if (loginForm.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrorMessages(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await login({ email: loginForm.email, password: loginForm.password });

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
