import clsx from "clsx";
import { ColorOption, SelectedType } from "../../../types/productDetail";
import style from "./ButtonColor.module.css";

interface buttonColorProps {
  color: ColorOption;
  selected: ColorOption;
  onSelected: (color: Partial<SelectedType>) => void;
}

const ButtonColor = ({ color, selected, onSelected }: buttonColorProps) => {
  return (
    <button
      key={color.name}
      className={clsx(
        style["color-button"],
        selected.hexCode === color.hexCode && style["active"]
      )}
      onClick={() =>
        onSelected({
          hexCode: color.hexCode,
          imageUrl: color.imageUrl,
          colorName: color.name,
        })
      }
      aria-label={color.name}
    >
      <span
        style={{
          backgroundColor: color.hexCode,
          width: "20px",
          height: "20px",
          display: "block",
        }}
      ></span>
    </button>
  );
};

export default ButtonColor;
