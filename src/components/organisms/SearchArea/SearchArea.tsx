import FilterColor from "../../molecules/FilterColor/FilterColor";
import Input from "../../atoms/Input";
import Typography from "../../atoms/Typography";
import style from "./SearchArea.module.css";
import { useState } from "react";

interface SearchAreaProps {
  count: number;
  onEnter: (value: string) => void;
}

const SearchArea = ({ count, onEnter }: SearchAreaProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section aria-labelledby="search-heading">
      <Input placeholder={"Search for a smartphone..."} onEnter={onEnter} />
      <div className={style["info-container"]}>
        {!isOpen && (
          <Typography
            size="sm"
            weight="light"
            color="primary"
            as="p"
            className={style["search-result"]}
          >{`${count} RESULTS`}</Typography>
        )}
        <FilterColor onIsOpen={(state) => state && setIsOpen(state)} />
      </div>
    </section>
  );
};

export default SearchArea;
