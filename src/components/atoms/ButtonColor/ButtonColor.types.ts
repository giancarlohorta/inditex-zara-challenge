import { ColorOption } from "@/types/productDetail";

export const BUTTON_COLOR_STATES = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export const BUTTON_COLOR_SIZES = {
  SMALL: "sm",
  DEFAULT: "default",
  LARGE: "lg",
};

export type ButtonColorStates =
  (typeof BUTTON_COLOR_STATES)[keyof typeof BUTTON_COLOR_STATES];
export type ButtonColorSizes =
  (typeof BUTTON_COLOR_SIZES)[keyof typeof BUTTON_COLOR_SIZES];

export interface ColorSelectedData {
  hexCode: string;
  imageUrl?: string;
  colorName: string;
}

export interface buttonColorProps {
  color: ColorOption;
  selectedHexCode?: string;
  onSelected: (color: ColorSelectedData) => void;
  size?: ButtonColorSizes;
  disabled?: boolean;
  className?: string;
}

export const BUTTON_COLOR_CONFIG = {
  defaults: {
    size: BUTTON_COLOR_SIZES.DEFAULT,
  },
  sizes: {
    sm: {
      wrapper: "16px",
      swatch: "12px",
    },
    default: {
      wrapper: "24px",
      swatch: "20px",
    },
    lg: {
      wrapper: "32px",
      swatch: "28px",
    },
  },
};
