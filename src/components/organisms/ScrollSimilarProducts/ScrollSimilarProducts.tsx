import { useEffect, useRef, useState, useCallback } from "react";
import ListItem from "../ListItem";
import style from "./ScrollSimilarProducts.module.css";
import { Product } from "../../../types/product";
import { getClientX } from "../../../utils";

interface ScrollSimilarProductsProps {
  list: Product[];
}

const ScrollSimilarProducts = ({ list }: ScrollSimilarProductsProps) => {
  const listEl = useRef<HTMLDivElement>(null);
  const barEl = useRef<HTMLDivElement>(null);
  const thumbEl = useRef<HTMLDivElement>(null);

  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStart = useRef(0);

  const updateThumbPosition = useCallback(() => {
    const list = listEl.current;
    const bar = barEl.current;
    const thumb = thumbEl.current;

    if (list && bar && thumb) {
      const ratio = list.scrollLeft / (list.scrollWidth - list.clientWidth);
      const maxLeft = bar.clientWidth - thumb.clientWidth;
      thumb.style.left = `${ratio * maxLeft}px`;
    }
  }, []);

  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const nativeEvent = e.nativeEvent as MouseEvent | TouchEvent;
    const clientX = getClientX(nativeEvent);
    dragStartX.current = clientX;

    if (listEl.current) {
      scrollStart.current = listEl.current.scrollLeft;
    }

    setDragging(true);
  };

  const onDragMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (dragging && listEl.current && barEl.current && thumbEl.current) {
        const clientX = getClientX(e);
        const deltaX = clientX - dragStartX.current;

        const list = listEl.current;
        const bar = barEl.current;
        const thumb = thumbEl.current;

        const scrollable = list.scrollWidth - list.clientWidth;
        const thumbRange = bar.clientWidth - thumb.clientWidth;
        const ratio = scrollable / thumbRange;

        list.scrollLeft = scrollStart.current + deltaX * ratio;
      }
    },
    [dragging]
  );

  const onDragEnd = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    const list = listEl.current;
    if (list) {
      list.addEventListener("scroll", updateThumbPosition);
      document.addEventListener("mousemove", onDragMove);
      document.addEventListener("mouseup", onDragEnd);
      document.addEventListener("touchmove", onDragMove);
      document.addEventListener("touchend", onDragEnd);
    }

    return () => {
      if (list) {
        list.removeEventListener("scroll", updateThumbPosition);
        document.removeEventListener("mousemove", onDragMove);
        document.removeEventListener("mouseup", onDragEnd);
        document.removeEventListener("touchmove", onDragMove);
        document.removeEventListener("touchend", onDragEnd);
      }
    };
  }, [updateThumbPosition, onDragMove, onDragEnd]);

  useEffect(() => {
    const list = listEl.current;
    const bar = barEl.current;
    const thumb = thumbEl.current;

    if (list && bar && thumb) {
      const ratio = list.clientWidth / list.scrollWidth;
      thumb.style.width = `${ratio * bar.clientWidth}px`;
    }
  }, []);

  return (
    <>
      <div className={style["similar-list"]} ref={listEl} role="list">
        <ListItem list={list} row />
      </div>

      <div className={style["custom-scrollbar"]} ref={barEl} data-testid="bar">
        <div
          className={style["custom-thumb"]}
          data-testid="thumb"
          ref={thumbEl}
          onMouseDown={onDragStart}
          onTouchStart={onDragStart}
        />
      </div>
    </>
  );
};

export default ScrollSimilarProducts;
