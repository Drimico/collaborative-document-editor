import { useNavigate } from "react-router";
import { Button } from "../../../../shared/ui/Button";
import useLogin from "../../lib/useLogin";

export const LoginForm = () => {
  const { errorMessages, isLoading, loginForm, onLogin, setLoginForm } = useLogin();
  const navigate = useNavigate();
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await onLogin(e);
  };

  return (
    <div className="w-100 h-120 bg-(--bg-light) border-6 shadow-(--shadow-l) font-bold flex flex-col items-center justify-center gap-20 relative rounded-2xl">
      <div className="text-4xl absolute top-5 text-shadow-[2px_2px_2px_black]">LOG IN</div>
      <div className="flex flex-col w-55 h-10">
        <label
          className="text-2xl text-shadow-[1px_1px_1px_black]"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="bg-(--bg) border-2 shadow-(--shadow-s) px-2 py-1 rounded-xl"
          type="text"
          value={loginForm.email}
          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
        />
        <div>{errorMessages.email}</div>
      </div>
      <div className="flex flex-col w-55 h-10">
        <label
          className="text-2xl text-shadow-[1px_1px_1px_black]"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="bg-(--bg) border-2 shadow-(--shadow-s) px-2 py-1 rounded-xl"
          type="password"
          value={loginForm.password}
          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
        />
        <div>{errorMessages.password}</div>
      </div>

      <Button
        disabled={isLoading}
        onClick={handleLogin}
        text="Log In"
        buttonClass="w-54 h-10"
        shadowClass="w-55 h-11.5 bg-black/70"
        frontClass="w-53.5 h-10 bg-(--bg) shadow-[inset_1px_1px_3px_white] active:shadow-[inset_1px_1px_3px_black] active:translate-0.5 top-0.5 left-0.5"
      />
      <div className="flex flex-col items-center absolute bottom-2">
        <span>Don't have an account?</span>
        <button
          className="cursor-pointer underline text-(--text)"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};
