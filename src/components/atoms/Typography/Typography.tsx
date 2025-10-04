import clsx from "clsx";
import style from "./Typography.module.css";
import {
  TYPOGRAPHY_CONFIG,
  TYPOGRAPHY_ELEMENTS,
  TypographyComponent,
  TypographyProps,
} from "./Typography.types";

const Typography: TypographyComponent = <
  E extends React.ElementType = typeof TYPOGRAPHY_ELEMENTS.P,
>({
  as,
  children,
  size = TYPOGRAPHY_CONFIG.defaults.size,
  weight = TYPOGRAPHY_CONFIG.defaults.weight,
  color = TYPOGRAPHY_CONFIG.defaults.color,
  className,
  ...props
}: TypographyProps<E>) => {
  const Component = as || TYPOGRAPHY_CONFIG.defaults.element;

  const classes = clsx(
    style.typography,
    style[`size-${size}`],
    style[`weight-${weight}`],
    style[`color-${color}`],
    className
  );

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
