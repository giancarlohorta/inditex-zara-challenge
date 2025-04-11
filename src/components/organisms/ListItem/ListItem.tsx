import clsx from "clsx";
import Item from "../../molecules/Item";
import { Product } from "../../../types/product";
import style from "./ListItem.module.css";

interface ListItemProps {
  list: Product[];
  row?: boolean;
}

const ListItem = ({ list, row }: ListItemProps) => {
  return (
    <section className={clsx(row ? style["list-row"] : style.list)}>
      {list.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </section>
  );
};

export default ListItem;
