import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../model/store";
import { AuthError } from "@supabase/supabase-js";

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
    const newErrors: Record<string, string> = {};
    if (!registerForm.email) newErrors.email = "Email is required";
    if (!registerForm.password) newErrors.password = "Password is required";
    if (!registerForm.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email)) newErrors.email = "Please enter a valid email address";
    if (!registerForm.password) newErrors.password = "Password is required";
    else if (registerForm.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!registerForm.name) newErrors.name = "Name is required";

    if (Object.keys(newErrors).length > 0) {
      setErrorMessages(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await register({ email: registerForm.email, password: registerForm.password, name: registerForm.name });

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
