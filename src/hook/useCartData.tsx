import { CartItem } from "../types/product";
import { useState, useEffect, useCallback } from "react";

const CART_KEY = "my-cart";

export const useCartData = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_KEY);
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch {
        localStorage.removeItem(CART_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } else {
      localStorage.removeItem(CART_KEY);
    }
  }, [cart]);

  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const exists = prev.find(
        (i) =>
          i.id === item.id &&
          i.color === item.color &&
          i.capacity === item.capacity
      );
      if (exists) {
        return prev.map((i) =>
          i.id === item.id &&
          i.color === item.color &&
          i.capacity === item.capacity
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const totalCart = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalCart,
    totalCartItems,
  };
};
