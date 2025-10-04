import clsx from "clsx";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";
import style from "./Button.module.css";
import { Link } from "react-router-dom";

const BUTTON_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  GHOST: "ghost",
} as const;

const BUTTON_SIZES = {
  DEFAULT: "default",
  SMALL: "sm",
  LARGE: "lg",
} as const;

const BUTTON_TYPES = {
  BUTTON: "button",
  SUBMIT: "submit",
  RESET: "reset",
} as const;

type ButtonVariant = (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS];

type ButtonSize = (typeof BUTTON_SIZES)[keyof typeof BUTTON_SIZES];

type ButtonType = (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES];

type ButtonAsButton = {
  href?: never;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

type ButtonAsLink = {
  href: string;
  onClick?: never;
};

interface ButtonPropsBase {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
}

type ButtonProps = ButtonPropsBase & (ButtonAsButton | ButtonAsLink);

const DEFAULT_VARIANT: ButtonVariant = BUTTON_VARIANTS.PRIMARY;
const DEFAULT_SIZE: ButtonSize = BUTTON_SIZES.DEFAULT;
const DEFAULT_TYPE: ButtonType = BUTTON_TYPES.BUTTON;

const Button = ({
  children,
  variant = DEFAULT_VARIANT,
  size = DEFAULT_SIZE,
  disabled = false,
  className,
  href,
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
      type={DEFAULT_TYPE}
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
