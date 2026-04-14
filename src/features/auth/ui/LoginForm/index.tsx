import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <div className="w-100 h-120 bg-yellow-100 border-6 shadow-[3px_3px_0px_3px] font-bold flex flex-col items-center justify-center gap-10 relative">
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

      <button className="text-2xl w-50 h-10 cursor-pointer relative">
        <div className="bg-yellow-200 absolute w-full px-2 py-1 top-[5%] left-[1%] shadow-[inset_1px_1px_3px_white] active:translate-0.5 active:shadow-[inset_1px_1px_3px] transition-transform duration-100">
          Log In
        </div>
        <div className="bg-black  w-[103%] h-[115%] " />
      </button>
    </div>
  );
};

export default LoginForm;
