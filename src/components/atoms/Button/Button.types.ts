import { MouseEventHandler, ReactNode } from "react";

export const BUTTON_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  GHOST: "ghost",
} as const;

export const BUTTON_SIZES = {
  DEFAULT: "default",
  SMALL: "sm",
  LARGE: "lg",
} as const;

export const BUTTON_TYPES = {
  BUTTON: "button",
  SUBMIT: "submit",
  RESET: "reset",
} as const;

export type ButtonVariant =
  (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS];
export type ButtonSize = (typeof BUTTON_SIZES)[keyof typeof BUTTON_SIZES];
export type ButtonType = (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES];

export type ButtonAsButton = {
  href?: never;
  onClick: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonType;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export type ButtonAsLink = {
  href: string;
  onClick?: never;
  type?: never;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export interface ButtonPropsBase {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
}

export const DEFAULT_VARIANT: ButtonVariant = BUTTON_VARIANTS.PRIMARY;
export const DEFAULT_SIZE: ButtonSize = BUTTON_SIZES.DEFAULT;
export const DEFAULT_TYPE: ButtonType = BUTTON_TYPES.BUTTON;
