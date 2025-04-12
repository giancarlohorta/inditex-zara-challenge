import { useCartData } from "../hook/useCartData";
import { ReactNode } from "react";
import { CartContext } from "./CartContext";

interface CartProviderProps {
  children: ReactNode;
}

const CartProvider = ({ children }: CartProviderProps) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalCart,
    totalCartItems,
  } = useCartData();

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalCart,
        totalCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
