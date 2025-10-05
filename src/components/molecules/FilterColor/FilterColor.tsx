import { useState } from "react";
import Button from "../../atoms/Button";
import Typography from "../../atoms/Typography";
import ButtonColor from "../../atoms/ButtonColor";
import ClearIcon from "../../../assets/close.svg?react";
import style from "./FilterColor.module.css";
import { ColorSelectedData } from "@/components/atoms/ButtonColor/ButtonColor.types";

interface FilterColorProps {
  onIsOpen?: (isOpen: boolean) => void;
}

// Constants
const FILTER_COLORS = [
  { name: "Gray", hexCode: "#62605F" },
  { name: "Blue Gray", hexCode: "#4D4E5F" },
  { name: "Beige", hexCode: "#ACA49B" },
  { name: "Cream", hexCode: "#F0E1B9" },
] as const;

const FilterColor = ({ onIsOpen }: FilterColorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHexCode, setSelectedHexCode] = useState<string>("");

  const handleOpen = () => {
    setIsOpen(true);
    onIsOpen?.(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    onIsOpen?.(false);
  };

  const handleColorSelect = (data: ColorSelectedData) => {
    setSelectedHexCode(data.hexCode);
  };

  const handleClear = () => {
    setSelectedHexCode("");
  };

  const hasSelection = Boolean(selectedHexCode);
  const filterLabel = hasSelection ? "FILTRAR (1)" : "FILTRAR";

  return (
    <div className={style.filter}>
      {!isOpen && (
        <div className={style["button-container"]}>
          <Button
            variant="ghost"
            onClick={handleOpen}
            className={style["open-button"]}
          >
            <Typography size="sm" weight="light">
              {filterLabel}
            </Typography>
          </Button>

          {hasSelection && (
            <button
              type="button"
              className={style["clear-button"]}
              onClick={handleClear}
              aria-label="Clear filter"
              title="Clear filter"
            >
              <ClearIcon aria-hidden="true" focusable={false} />
            </button>
          )}
        </div>
      )}

      {isOpen && (
        <div className={style["color-container"]}>
          <div className={style["color-list"]}>
            {FILTER_COLORS.map((color) => (
              <ButtonColor
                key={color.hexCode}
                color={color}
                selectedHexCode={selectedHexCode}
                onSelected={handleColorSelect}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            onClick={handleClose}
            className={style["open-button"]}
          >
            <Typography size="sm" weight="light">
              CERRAR
            </Typography>
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterColor;
