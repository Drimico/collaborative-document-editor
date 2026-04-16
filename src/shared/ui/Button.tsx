import { twMerge } from "tailwind-merge";
interface ButtonProps {
  text: string;
  size: string;
  shadow: string;
  color: string;
  shadowSize: string;
  onClick: (e:React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}
export const Button = ({ text, size, shadow, color, shadowSize, onClick, disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge("text-2xl cursor-pointer relative", size)}
    >
      <div
        className={twMerge(
          `bg-${color} absolute w-full px-2 py-1 top-[5%] left-[1%] active:translate-0.5 transition-transform duration-100`,
          shadow,
        )}
      >
        {text}
      </div>
      <div className={twMerge("bg-black", shadowSize)} />
    </button>
  );
};
