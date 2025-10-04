import { ReactNode } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import style from "./Button.module.css";

interface ButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "primary" | "secondary" | "link";
  children: ReactNode;
  link?: string;
}

const Button = ({
  disabled = false,
  onClick,
  className,
  type = "primary",
  link,
  children,
}: ButtonProps) => {
  const buttonClass = clsx(style.button, style[type], className);

  if (link) {
    return (
      <Link to={link} className={buttonClass}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
