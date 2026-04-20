import { twMerge } from "tailwind-merge";
interface ButtonProps {
  text: string;
  buttonClass: string;
  frontClass: string;
  shadowClass: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}
export const Button = ({ text, buttonClass, frontClass, shadowClass, onClick, disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge("text-2xl cursor-pointer relative rounded-xl text-shadow-[2px_2px_2px_black]", buttonClass)}
    >
      <div className={twMerge(`absolute transition-transform duration-100 flex justify-center items-center rounded-xl`, frontClass)}>{text}</div>
      <div className={twMerge(" rounded-2xl", shadowClass)} />
    </button>
  );
};
