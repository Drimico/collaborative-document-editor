import { Button } from "../../../../shared/ui/Button";
import useRegister from "../../lib/useRegister";

export const RegisterForm = () => {
  const { registerForm, setRegisterForm, errorMessages, isLoading, onRegister } = useRegister();
  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await onRegister(e);
  };

  return (
    <div className="w-100 h-140 bg-(--bg-light) border-6 shadow-(--shadow-l) font-bold flex flex-col items-center justify-center gap-20 relative">
      <div className="text-4xl absolute top-5">REGISTER</div>
      <div className="flex flex-col w-55 h-10">
        <label
          className="text-2xl"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="bg-(--bg) border-2 shadow-(--shadow-s) px-2 py-1"
          type="text"
          value={registerForm.email}
          onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
        />
        <div>{errorMessages.email}</div>
      </div>
      <div className="flex flex-col w-55 h-10">
        <label
          className="text-2xl"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="bg-(--bg) border-2 shadow-(--shadow-s) px-2 py-1"
          type="password"
          value={registerForm.password}
          onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
        />
        <div>{errorMessages.password}</div>
      </div>
      <div className="flex flex-col w-55 h-10">
        <label
          className="text-2xl"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="bg-(--bg) border-2 shadow-(--shadow-s) px-2 py-1"
          type="text"
          value={registerForm.name}
          onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
        />
        <div>{errorMessages.name}</div>
      </div>
      <div className="absolute bottom-30">{errorMessages.general}</div>
      <Button
        disabled={isLoading}
        onClick={handleRegister}
        text="Register"
        shadow="shadow-[inset_1px_1px_3px_white] active:shadow-[inset_1px_1px_3px]"
        color="bg-yellow-200"
        buttonSize="w-55 h-10"
        colorSize="w-54 h-10"
        shadowSize="w-55.5 h-11.5"
      />
    </div>
  );
};
