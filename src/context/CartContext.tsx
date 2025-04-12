import { CartItem } from "../types/product";
import { createContext } from "react";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalCart: number;
  totalCartItems: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
