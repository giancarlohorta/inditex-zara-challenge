import Item from "../../molecules/Item";
import { Product } from "../../../types/product";
import style from "./ListItem.module.css";

interface ListItemProps {
  list: Product[];
}

const ListItem = ({ list }: ListItemProps) => {
  return (
    <section className={style.list}>
      {list.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </section>
  );
};

export default ListItem;
