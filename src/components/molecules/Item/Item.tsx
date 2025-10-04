import { Product } from "@/types/product";
import Typography from "../../atoms/Typography";
import { formatText } from "../../../utils";
import style from "./Item.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

interface ItemProps {
  item: Product;
}

const Item = ({ item }: ItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
      to={`/product/${item.id}`}
      key={item.id}
      role="link"
      aria-labelledby={`title-${item.id}`}
      className={style.item}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={style["image-container"]}>
        <img
          src={item.imageUrl}
          alt={`${item.name} image`}
          className={style.image}
          loading="lazy"
        />
      </div>
      <div className={style.content}>
        <Typography size="xs" weight="light" color="tertiary" as="p">
          {formatText(item.brand)}
        </Typography>
        <div className={style.details}>
          <Typography
            size="sm"
            weight="light"
            color={isHovered ? "secondary" : "primary"}
            as="p"
          >
            {formatText(item.name)}
          </Typography>
          <Typography
            size="sm"
            weight="light"
            color={isHovered ? "secondary" : "primary"}
            as="p"
          >{`${item.basePrice} EUR`}</Typography>
        </div>
      </div>
    </Link>
  );
};

export default Item;
