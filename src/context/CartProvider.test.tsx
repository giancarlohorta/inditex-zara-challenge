import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { CartContext } from "./CartContext";
import CartProvider from "./CartProvider";
import * as useCartDataHook from "../hook/useCartData";
import React from "react";
import { mockCartProduct } from "../mocks/cartProduct";

const TestComponent = () => {
  const context = React.useContext(CartContext);
  return (
    <div>
      <span>Items: {context?.totalCartItems}</span>
      <span>Total: {context?.totalCart}</span>
    </div>
  );
};

describe("CartProvider", () => {
  it("should provide cart context values from useCartData", () => {
    vi.spyOn(useCartDataHook, "useCartData").mockReturnValue({
      cart: [mockCartProduct],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      clearCart: vi.fn(),
      totalCart: 2000,
      totalCartItems: 2,
    });

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByText("Items: 2")).toBeInTheDocument();
    expect(screen.getByText("Total: 2000")).toBeInTheDocument();
  });
});
