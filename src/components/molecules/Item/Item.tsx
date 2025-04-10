import { Product } from "@/types/product";
import Typography from "../../atoms/Typography";
import { formatText } from "../../../utils";
import style from "./Item.module.css";
import { Link } from "react-router-dom";

interface ItemProps {
  item: Product;
}

const Item = ({ item }: ItemProps) => {
  return (
    <Link
      to={`/product/${item.id}`}
      key={item.id}
      aria-labelledby={`title-${item.id}`}
      className={style.item}
    >
      <img
        src={item.imageUrl}
        alt={`Imagem do ${item.name}`}
        className={style.image}
      />
      <div className={style.content}>
        <Typography
          content={formatText(item.brand)}
          size="sm"
          weight="light"
          color="tertiary"
          as="p"
        />
        <div className={style.details}>
          <Typography
            content={formatText(item.name)}
            size="sm"
            weight="light"
            color="primary"
            as="p"
          />
          <Typography
            content={`${item.basePrice} EUR`}
            size="sm"
            weight="light"
            color="primary"
            as="p"
          />
        </div>
      </div>
    </Link>
  );
};

export default Item;
