import { useState } from "react";
import Button from "../../atoms/Button";
import Typography from "../../atoms/Typography";
import ClearIcon from "../../../assets/close.svg?react";
import style from "./FilterColor.module.css";
import ButtonColor from "../../atoms/ButtonColor";
import { SelectedType } from "../../../types/productDetail";

interface FilterColorProps {
  onIsOpen: (isOpen?: boolean) => void;
}

const FilterColor = ({ onIsOpen }: FilterColorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState({
    name: "",
    hexCode: "",
  });

  const colors = [
    { name: "1", hexCode: "#62605F" },
    { name: "2", hexCode: "#4D4E5F" },
    { name: "3", hexCode: "#ACA49B" },
    { name: "4", hexCode: "#F0E1B9" },
  ];

  const handleSelected = (item: Partial<SelectedType>) => {
    if (item && item.hexCode && item.colorName) {
      setSelected({
        hexCode: item.hexCode,
        name: item.colorName,
      });
    }
  };

  return (
    <div className={style["filter"]}>
      {!isOpen && (
        <div className={style["button-container"]}>
          <Button
            type="link"
            onClick={() => {
              setIsOpen(true);
              onIsOpen(true);
            }}
            className={style["open-button"]}
          >
            <Typography
              content={`FILTRAR ${selected.hexCode ? "(1)" : ""}`}
              size="sm"
              weight="light"
              as="p"
            />
          </Button>

          {selected.hexCode && (
            <button
              type="button"
              className={style["clear-button"]}
              onClick={() => {
                setSelected({
                  name: "",
                  hexCode: "",
                });
              }}
              aria-label="clear filter"
              title="clear filter"
            >
              <ClearIcon aria-hidden="true" focusable="false" />
            </button>
          )}
        </div>
      )}

      {isOpen && (
        <div className={style["color-container"]}>
          <div className={style["color-list"]}>
            {colors.map((color) => (
              <ButtonColor
                color={color}
                selected={selected}
                key={color.name}
                onSelected={(item) => handleSelected(item)}
              />
            ))}
          </div>
          <Button
            type="link"
            onClick={() => {
              setIsOpen(false);
              onIsOpen(false);
            }}
            className={style["open-button"]}
          >
            <Typography content="CERRAR" size="sm" weight="light" as="p" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterColor;
