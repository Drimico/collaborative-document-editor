import { Button } from "../../../../shared/ui/Button";
import useLogin from "../../lib/useLogin";

export const LoginForm = () => {
  const { errorMessages, isLoading, loginForm, onLogin, setLoginForm } = useLogin();
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await onLogin(e);
  };

  return (
    <div className="w-100 h-120 bg-yellow-100 border-6 shadow-[3px_3px_0px_3px] font-bold flex flex-col items-center justify-center gap-20 relative">
      <div className="text-4xl absolute top-5">LOG IN</div>
      <div className="flex flex-col w-56.5 h-10">
        <label
          className="text-2xl"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="bg-yellow-200 border-2 shadow-[1px_1px_0px_1px] px-2 py-1"
          type="text"
          value={loginForm.email}
          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
        />
        <div>{errorMessages.email}</div>
      </div>
      <div className="flex flex-col w-56.5 h-10">
        <label
          className="text-2xl"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="bg-yellow-200 border-2 shadow-[1px_1px_0px_1px] px-2 py-1"
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
        size="w-55 h-10"
        shadow="shadow-[inset_1px_1px_3px_white] active:shadow-[inset_1px_1px_3px]"
        color="yellow-200"
        shadowSize="w-56.5 h-11.5"
      />
    </div>
  );
};
