import Input from "../../atoms/Input";
import Typography from "../../atoms/Typography";
import style from "./SearchArea.module.css";

interface SearchAreaProps {
  count: number;
  onEnter: (value: string) => void;
}

const SearchArea = ({ count, onEnter }: SearchAreaProps) => {
  return (
    <section aria-labelledby="search-heading">
      <Input placeholder={"Search for a smartphone..."} onEnter={onEnter} />
      <Typography
        content={`${count} RESULTS`}
        size="sm"
        weight="light"
        color="primary"
        as="p"
        className={style["search-result"]}
      />
    </section>
  );
};

export default SearchArea;
