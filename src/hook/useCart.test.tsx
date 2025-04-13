import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useCart } from "./useCart";
import { CartContext } from "../context/CartContext";
import { mockCartProduct } from "../mocks/cartProduct";

const mockContextValue = {
  cart: [mockCartProduct],
  addToCart: vi.fn(),
  removeFromCart: vi.fn(),
  clearCart: vi.fn(),
  totalCart: 1200,
  totalCartItems: 1,
};

describe("useCart", () => {
  it("should throw error when used outside CartProvider", () => {
    const render = () => renderHook(() => useCart());

    expect(render).toThrow("useCart must be used within a CartProvider");
  });

  it("should return context values when used inside CartProvider", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: ({ children }) => (
        <CartContext.Provider value={mockContextValue}>
          {children}
        </CartContext.Provider>
      ),
    });

    expect(result.current.cart).toEqual([mockCartProduct]);
    expect(result.current.totalCart).toBe(1200);
    expect(result.current.totalCartItems).toBe(1);
  });
});
