import clsx from "clsx";
import style from "./ButtonColor.module.css";
import { BUTTON_COLOR_CONFIG, buttonColorProps } from "./ButtonColor.types";

const ButtonColor = ({
  color,
  selectedHexCode,
  onSelected,
  size = BUTTON_COLOR_CONFIG.defaults.size,
  disabled = false,
  className,
}: buttonColorProps) => {
  const isActive = selectedHexCode === color.hexCode;

  const stylesButton = clsx(
    style["color-button"],
    style[`size-${size}`],
    isActive && style.active,
    className
  );

  const handleClick = () => {
    if (!disabled) {
      onSelected({
        hexCode: color.hexCode,
        imageUrl: color.imageUrl,
        colorName: color.name,
      });
    }
  };

  return (
    <button
      key={color.name}
      className={stylesButton}
      onClick={handleClick}
      aria-label={`Select ${color.name} color`}
      aria-pressed={isActive}
      title={color.name}
      disabled={disabled}
      type="button"
    >
      <span
        className={style.swatch}
        style={{ backgroundColor: color.hexCode }}
        aria-hidden="true"
      ></span>
    </button>
  );
};

export default ButtonColor;
