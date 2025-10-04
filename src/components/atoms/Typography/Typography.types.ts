import { ElementType, ReactNode } from "react";

export const TYPOGRAPHY_ELEMENTS = {
  H1: "h1",
  H2: "h2",
  H3: "h3",
  H4: "h4",
  H5: "h5",
  H6: "h6",
  P: "p",
  SPAN: "span",
  LABEL: "label",
  DIV: "div",
} as const;

export const TYPOGRAPHY_SIZES = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl",
} as const;

export const TYPOGRAPHY_WEIGHTS = {
  LIGHT: "light",
  REGULAR: "regular",
  BOLD: "bold",
} as const;

export const TYPOGRAPHY_COLORS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  TERTIARY: "tertiary",
} as const;

export type TypographyElement =
  (typeof TYPOGRAPHY_ELEMENTS)[keyof typeof TYPOGRAPHY_ELEMENTS];

export type TypographySize =
  (typeof TYPOGRAPHY_SIZES)[keyof typeof TYPOGRAPHY_SIZES];

export type TypographyWeight =
  (typeof TYPOGRAPHY_WEIGHTS)[keyof typeof TYPOGRAPHY_WEIGHTS];

export type TypographyColor =
  (typeof TYPOGRAPHY_COLORS)[keyof typeof TYPOGRAPHY_COLORS];

export interface TypographyOwnProps<E extends ElementType = ElementType> {
  as?: E;
  children: ReactNode;
  size?: TypographySize;
  weight?: TypographyWeight;
  color?: TypographyColor;
  className?: string;
}

export type TypographyProps<E extends ElementType> = TypographyOwnProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof TypographyOwnProps>;

export type TypographyComponent = <E extends React.ElementType = "p">(
  props: TypographyProps<E>
) => React.ReactElement | null;

export const TYPOGRAPHY_CONFIG = {
  defaults: {
    element: TYPOGRAPHY_ELEMENTS.P,
    size: TYPOGRAPHY_SIZES.MD,
    weight: TYPOGRAPHY_WEIGHTS.REGULAR,
    color: TYPOGRAPHY_COLORS.PRIMARY,
  },
};
