import { useState, KeyboardEvent, ChangeEvent } from "react";
import clsx from "clsx";
import ClearIcon from "../../../assets/close.svg?react";
import style from "./Input.module.css";

interface InputProps {
  placeholder?: string;
  onEnter: (value: string) => void;
  className?: string;
}

const Input = ({ placeholder, onEnter, className = "" }: InputProps) => {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnter(value);
    }
  };

  const handleClear = () => {
    setValue("");
    onEnter("");
  };

  return (
    <div className={clsx(style["input-wrapper"], className)}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={style.input}
        aria-label={placeholder}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className={style["clear-button"]}
          aria-label="Clear input"
          title="Clear input"
        >
          <ClearIcon aria-hidden="true" focusable="false" />
        </button>
      )}
    </div>
  );
};

export default Input;
