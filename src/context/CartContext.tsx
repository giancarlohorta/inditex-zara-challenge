import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  color: string;
  capacity: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalCart: number;
  totalCartItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// const CART_KEY = "cart-storage";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  //   // Load cart from localStorage on mount
  //   useEffect(() => {
  //     const storedCart = localStorage.getItem(CART_KEY);
  //     if (storedCart) {
  //       setCart(JSON.parse(storedCart));
  //     }
  //   }, []);

  //   // Save cart to localStorage whenever it changes
  //   useEffect(() => {
  //     if (cart.length === 0) {
  //       localStorage.setItem(CART_KEY, JSON.stringify(cart));
  //     }
  //   }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const exists = prev.find(
        (i) =>
          i.id === item.id &&
          i.color === item.color &&
          i.capacity === item.capacity
      );
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalCart = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const totalCartItems = (): number => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalCart: totalCart(),
        totalCartItems: totalCartItems(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
