import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import Cart from "./Cart";
import { MemoryRouter } from "react-router-dom";
import { mockCartProduct } from "../../../mocks/cartProduct";
import { CartContext } from "../../../context/CartContext";

const mockRemoveFromCart = vi.fn();

const mockContextValue = {
  cart: [mockCartProduct],
  addToCart: vi.fn(),
  removeFromCart: mockRemoveFromCart,
  clearCart: vi.fn(),
  totalCart: 1200,
  totalCartItems: 1,
};

const ComponentWrapper = () => {
  return (
    <MemoryRouter initialEntries={["/cart"]}>
      <CartContext.Provider value={mockContextValue}>
        <Cart />
      </CartContext.Provider>
    </MemoryRouter>
  );
};

describe("Cart", () => {
  it("should render cart item details", () => {
    render(<ComponentWrapper />);

    expect(screen.getByText("CART (1)")).toBeInTheDocument();
    expect(screen.getByText("TEST PRODUCT")).toBeInTheDocument();
    expect(screen.getByText("128GB | BLACK")).toBeInTheDocument();
    expect(screen.getByText("1000 EUR")).toBeInTheDocument();
  });

  it("should remove item when Eliminar button is clicked", () => {
    render(<ComponentWrapper />);

    const removeButton = screen.getByRole("button", { name: /Eliminar/i });
    fireEvent.click(removeButton);

    expect(mockRemoveFromCart).toHaveBeenCalledWith(
      mockCartProduct.id,
      mockCartProduct.capacity,
      mockCartProduct.color
    );
  });

  it("should display the total cart value", () => {
    render(<ComponentWrapper />);

    expect(screen.getByText(/1200 EUR/i)).toBeInTheDocument();
  });

  it("should have link to continue shopping", () => {
    render(<ComponentWrapper />);

    const continueShoppingButton = screen.getByRole("link", {
      name: /CONTINUE SHOPPING/i,
    });
    expect(continueShoppingButton).toHaveAttribute("href", "/");
  });

  it("should show alert when PAY button is clicked", () => {
    const alertMock = vi.fn();
    window.alert = alertMock;

    render(<ComponentWrapper />);

    const payButton = screen.getByText("PAY");
    fireEvent.click(payButton);

    expect(alertMock).toHaveBeenCalledWith("Payment successful!");
  });

  it("should render empty cart state without PAY button and with CONTINUE SHOPPING", () => {
    render(
      <MemoryRouter initialEntries={["/cart"]}>
        <CartContext.Provider
          value={{
            ...mockContextValue,
            cart: [],
            totalCart: 0,
            totalCartItems: 0,
          }}
        >
          <Cart />
        </CartContext.Provider>
      </MemoryRouter>
    );

    const payButton = screen.queryByText("PAY");
    expect(payButton).not.toBeInTheDocument();
    const continueShoppingButton = screen.getByRole("link", {
      name: /CONTINUE SHOPPING/i,
    });
    expect(continueShoppingButton).toBeInTheDocument();
    expect(screen.getByText("CART (0)")).toBeInTheDocument();
    expect(screen.queryByText(/TOTAL/i)).not.toBeInTheDocument();
  });
});
