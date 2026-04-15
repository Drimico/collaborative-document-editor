import { useState } from "react";
import { Button } from "../../../../shared/ui/Button";
import { authStore } from "../../model/store";
import { AuthError } from "@supabase/supabase-js";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = authStore((s) => s.login);

  const handleLogin = async () => {
    try {
      await login({ email, password });
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="w-100 h-120 bg-yellow-100 border-6 shadow-[3px_3px_0px_3px] font-bold flex flex-col items-center justify-center gap-20 relative">
      <div className="text-4xl absolute top-5">LOG IN</div>
      <div className="flex flex-col w-fit h-10">
        <label
          className="text-2xl"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="bg-yellow-200 border-2 shadow-[1px_1px_0px_1px] px-2 py-1"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>{errorMessage.includes("email") ? "Please enter your email" : errorMessage}</div>
      </div>
      <div className="flex flex-col w-fit h-10">
        <label
          className="text-2xl"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="bg-yellow-200 border-2 shadow-[1px_1px_0px_1px] px-2 py-1"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button
        onClick={handleLogin}
        text="Log In"
        size="w-50 h-10"
        shadow="shadow-[inset_1px_1px_3px_white] active:shadow-[inset_1px_1px_3px]"
        color="yellow-200"
        shadowSize="w-[103%] h-[115%]"
      />
    </div>
  );
};
