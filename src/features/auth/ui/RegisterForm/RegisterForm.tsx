import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/ui/Button";
import useRegister from "../../lib/useRegister";

export const RegisterForm = () => {
  const { registerForm, setRegisterForm, errorMessages, isLoading, onRegister } = useRegister();
  const navigate = useNavigate();

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await onRegister(e);
  };

  return (
    <div className="w-100 h-140 bg-(--bg-light) border-6 shadow-(--shadow-l) font-bold flex flex-col items-center justify-center gap-20 relative rounded-2xl">
      <div className="text-4xl absolute top-5 text-shadow-[2px_2px_2px_black]">REGISTER</div>
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
          value={registerForm.email}
          onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
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
          value={registerForm.password}
          onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
        />
        <div>{errorMessages.password}</div>
      </div>
      <div className="flex flex-col w-55 h-10">
        <label
          className="text-2xl text-shadow-[1px_1px_1px_black]"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="bg-(--bg) border-2 shadow-(--shadow-s) px-2 py-1 rounded-xl"
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
        buttonClass="w-54 h-10"
        shadowClass="w-55 h-11.5 bg-black/70"
        frontClass="w-53.5 h-10 bg-(--bg) shadow-[inset_1px_1px_3px_white] active:shadow-[inset_1px_1px_3px_black] active:translate-0.5 top-0.5 left-0.5"
      />
      <div className="flex flex-col items-center absolute bottom-2">
        <span>Already have an account?</span>
        <button
          className="cursor-pointer underline text-(--text)"
          onClick={() => navigate("/login")}
        >
          Log in
        </button>
      </div>
    </div>
  );
};
