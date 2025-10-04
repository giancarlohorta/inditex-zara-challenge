import clsx from "clsx";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import style from "./Button.module.css";
import { Link } from "react-router-dom";
import {
  ButtonAsButton,
  ButtonAsLink,
  ButtonPropsBase,
  DEFAULT_SIZE,
  DEFAULT_TYPE,
  DEFAULT_VARIANT,
} from "./Button.types";

export type ButtonProps = ButtonPropsBase & (ButtonAsButton | ButtonAsLink);

const Button = ({
  children,
  variant = DEFAULT_VARIANT,
  size = DEFAULT_SIZE,
  disabled = false,
  className,
  href,
  type = DEFAULT_TYPE,
  onClick,
  ...props
}: ButtonProps) => {
  const buttonClass = clsx(
    style.button,
    style[variant],
    size !== DEFAULT_SIZE && style[size],
    className
  );

  if (href) {
    return (
      <Link
        to={href}
        className={buttonClass}
        aria-disabled={disabled}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};

export default Button;
