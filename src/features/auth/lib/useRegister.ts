import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../model/authStore";
import { AuthError } from "@supabase/supabase-js";
import { registerSchema } from "./schemas";

const useRegister = () => {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const register = authStore((s) => s.register);
  const navigate = useNavigate();
  const onRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();

    const result = registerSchema.safeParse(registerForm);
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
      await register(result.data);

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
    registerForm,
    setRegisterForm,
    errorMessages,
    isLoading,
    onRegister,
  };
};

export default useRegister;
