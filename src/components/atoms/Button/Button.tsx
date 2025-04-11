import { ReactNode } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import style from "./Button.module.css";

interface ButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  width?: number;
  type?: "primary" | "secondary" | "link";
  children: ReactNode;
  link?: string;
}

const Button = ({
  disabled = false,
  onClick,
  width,
  type = "primary",
  link,
  children,
}: ButtonProps) => {
  const buttonClass = clsx(style.button, style[type]);
  const styleProps = width ? { maxWidth: `${width}px` } : undefined;

  if (link) {
    return (
      <Link to={link} className={buttonClass} style={styleProps}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={buttonClass}
      style={styleProps}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
