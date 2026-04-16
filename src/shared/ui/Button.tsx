import { twMerge } from "tailwind-merge";
interface ButtonProps {
  text: string;
  buttonSize: string;
  shadow: string;
  color: string;
  colorSize: string;
  shadowSize: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}
export const Button = ({ text, buttonSize, shadow, color, colorSize, shadowSize, onClick, disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge("text-2xl cursor-pointer relative", buttonSize)}
    >
      <div
        className={twMerge(`absolute  px-2 py-1 top-[5%] left-[1%] active:translate-0.5 transition-transform duration-100`, shadow, colorSize, color)}
      >
        {text}
      </div>
      <div className={twMerge("bg-black", shadowSize)} />
    </button>
  );
};
