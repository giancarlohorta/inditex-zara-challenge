import { ProductDetailsData } from "../../../types/productDetail";
import { formatSpecList, humanizeKey } from "../../../utils";
import Typography from "../../atoms/Typography";
import style from "./SpecsList.module.css";

interface SpecsListProps {
  data: ProductDetailsData;
}

const SpecsList = ({ data }: SpecsListProps) => {
  return (
    <ul className={style["specs-list"]}>
      {Object.entries(formatSpecList(data)).map(([key, value]) => (
        <li key={key} className={style["spec-item"]}>
          <Typography size="sm" weight="light" color="primary" as="p">
            {humanizeKey(key)}
          </Typography>
          <Typography size="sm" weight="light" color="primary" as="p">
            {value}
          </Typography>
        </li>
      ))}
    </ul>
  );
};

export default SpecsList;
