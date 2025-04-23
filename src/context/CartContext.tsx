import { CartItem } from "../types/productCart";
import { createContext } from "react";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, capacity: string, color: string) => void;
  clearCart: () => void;
  totalCart: number;
  totalCartItems: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
