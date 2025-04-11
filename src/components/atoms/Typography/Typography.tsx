import clsx from "clsx";
import style from "./Typography.module.css";

interface TypographyProps {
  content: string;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  weight?: "light" | "regular" | "bold";
  color?: "primary" | "secondary" | "tertiary";
  as?: "p" | "span" | "h1" | "h2" | "h3";
}

const Typography = ({
  content,
  className,
  size = "md",
  weight = "light",
  color = "primary",
  as: Component = "p",
}: TypographyProps) => {
  const classes = clsx(
    style.typography,
    style[`size-${size}`],
    style[`weight-${weight}`],
    style[`color-${color}`],
    className
  );

  return <Component className={classes}>{content}</Component>;
};

export default Typography;
