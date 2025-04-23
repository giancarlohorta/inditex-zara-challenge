import { useEffect, useRef, useState, useCallback } from "react";
import { getClientX } from "../utils";

export const useCustomScrollbar = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStart = useRef(0);

  const updateThumbPosition = useCallback(() => {
    const list = listRef.current;
    const bar = barRef.current;
    const thumb = thumbRef.current;

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

    if (listRef.current) {
      scrollStart.current = listRef.current.scrollLeft;
    }

    setDragging(true);
  };

  const onDragMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (dragging && listRef.current && barRef.current && thumbRef.current) {
        const clientX = getClientX(e);
        const deltaX = clientX - dragStartX.current;

        const list = listRef.current;
        const bar = barRef.current;
        const thumb = thumbRef.current;

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
    const list = listRef.current;

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
    const list = listRef.current;
    const bar = barRef.current;
    const thumb = thumbRef.current;

    if (list && bar && thumb) {
      const ratio = list.clientWidth / list.scrollWidth;
      thumb.style.width = `${ratio * bar.clientWidth}px`;
    }
  }, []);

  return {
    listRef,
    barRef,
    thumbRef,
    onDragStart,
  };
};
