import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps {
  text: string;
  icon?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  gap?: string;
  buttonClass?: string;
  frontClass?: string;
  shadowClass?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const variantPresets: Record<ButtonVariant, { shadowClass: string; frontClass: string }> = {
  primary: {
    shadowClass: "bg-black/70",
    frontClass: "bg-(--bg) shadow-[inset_1px_1px_3px_white] active:shadow-[inset_1px_1px_3px_black] active:translate-0.5",
  },
  danger: {
    shadowClass: "bg-red-900/80",
    frontClass: "bg-red-950 shadow-[inset_1px_1px_3px_rgba(255,100,100,0.3)] active:shadow-[inset_1px_1px_3px_black] active:translate-0.5",
  },
};

const sizePresets: Record<ButtonSize, { buttonClass: string; shadowClass: string; frontClass: string }> = {
  sm: {
    buttonClass: "w-31 h-8 text-lg",
    shadowClass: "w-32 h-9.5",
    frontClass: "w-30.5 h-8 top-0.5 left-0.5",
  },
  md: {
    buttonClass: "w-54 h-10 text-2xl",
    shadowClass: "w-55.5 h-12",
    frontClass: "w-53.5 h-10 top-[3px] left-[3px]",
  },
  lg: {
    buttonClass: "w-80 h-16 text-2xl",
    shadowClass: "w-81 h-18",
    frontClass: "w-79 h-16 top-1 left-1 text-2xl",
  },
  xl: {
    buttonClass: "w-108 h-20 text-3xl",
    shadowClass: "w-109.5 h-22.5",
    frontClass: "w-107 h-20 top-1 left-1 text-3xl",
  },
};

const baseClasses = "cursor-pointer relative rounded-xl text-shadow-[1px_1px_1px_black] ";
const frontBaseClasses = "absolute transition-all duration-100 flex justify-center items-center rounded-xl hover:bg-(--bg-light) hover:text-(--text)";
const iconWrapperClasses = "shrink-0 flex items-center";
const shadowBaseClasses = "rounded-2xl";

export const Button = ({ text, icon, variant = "primary", size = "md", gap = "gap-2", buttonClass, frontClass, shadowClass, onClick, disabled }: ButtonProps) => {
  const v = variantPresets[variant];
  const s = sizePresets[size];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(baseClasses, s.buttonClass, buttonClass)}
    >
      <div className={twMerge(frontBaseClasses, icon && gap, s.frontClass, v.frontClass, frontClass)}>
        {icon && <span className={iconWrapperClasses}>{icon}</span>}
        <span>{text}</span>
      </div>
      <div className={twMerge(shadowBaseClasses, s.shadowClass, v.shadowClass, shadowClass)} />
    </button>
  );
};
