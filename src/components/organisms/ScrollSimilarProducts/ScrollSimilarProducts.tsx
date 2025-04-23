import ListItem from "../ListItem";
import style from "./ScrollSimilarProducts.module.css";
import { Product } from "../../../types/product";
import { useCustomScrollbar } from "../../../hook/useCustomScrollbar";

interface ScrollSimilarProductsProps {
  list: Product[];
}

const ScrollSimilarProducts = ({ list }: ScrollSimilarProductsProps) => {
  const { listRef, barRef, thumbRef, onDragStart } = useCustomScrollbar();

  return (
    <>
      <div className={style["similar-list"]} ref={listRef} role="list">
        <ListItem list={list} row />
      </div>

      <div className={style["custom-scrollbar"]} ref={barRef} data-testid="bar">
        <div
          className={style["custom-thumb"]}
          data-testid="thumb"
          ref={thumbRef}
          onMouseDown={onDragStart}
          onTouchStart={onDragStart}
        />
      </div>
    </>
  );
};

export default ScrollSimilarProducts;
