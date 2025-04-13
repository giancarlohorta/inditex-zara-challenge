import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CartContext } from "./CartContext";
import { useContext } from "react";
import { mockCartProduct } from "../mocks/cartProduct";

const mockContext = {
  cart: [mockCartProduct],
  addToCart: vi.fn(),
  removeFromCart: vi.fn(),
  clearCart: vi.fn(),
  totalCart: 2000,
  totalCartItems: 2,
};

const TestComponent = () => {
  const context = useContext(CartContext);
  return <div>{context?.totalCart}</div>;
};

describe("CartContext", () => {
  it("should provide the context value to children", () => {
    render(
      <CartContext.Provider value={mockContext}>
        <TestComponent />
      </CartContext.Provider>
    );

    expect(screen.getByText("2000")).toBeInTheDocument();
  });
});
