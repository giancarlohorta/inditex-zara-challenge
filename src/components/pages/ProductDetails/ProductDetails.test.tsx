import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import MockAdapter from "axios-mock-adapter";
import { api } from "../../../services/api";
import { mockProductDetailsData } from "../../../mocks/productDetails";
import { CartContext } from "../../../context/CartContext";
import { mockCartProduct } from "../../../mocks/cartProduct";

const mock = new MockAdapter(api);

const mockAddToCart = vi.fn();

const mockContext = {
  cart: [mockCartProduct],
  addToCart: mockAddToCart,
  removeFromCart: vi.fn(),
  clearCart: vi.fn(),
  totalCart: 2000,
  totalCartItems: 2,
};

const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0 },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <CartContext.Provider value={mockContext}>
      <MemoryRouter initialEntries={["/product/1"]}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/product/:id" element={children} />
          </Routes>
        </QueryClientProvider>
      </MemoryRouter>
    </CartContext.Provider>
  );
};

describe("ProductDetails Component (integrated)", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("renders product details when data is successfully fetched", async () => {
    mock.onGet("/products/1").reply(200, mockProductDetailsData);

    render(<ProductDetails />, { wrapper: createWrapper() });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(
      mockProductDetailsData.name.toUpperCase()
    );

    expect(
      screen.getByRole("heading", { level: 2, name: /SPECIFICATIONS/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /SIMILAR ITEMS/i })
    ).toBeInTheDocument();

    const img = screen.getByRole("img", { name: mockProductDetailsData.name });
    expect(img).toHaveAttribute(
      "src",
      mockProductDetailsData.colorOptions[0].imageUrl
    );
  });

  it("handle add product on cart", async () => {
    mock.onGet("/products/1").reply(200, mockProductDetailsData);

    render(<ProductDetails />, { wrapper: createWrapper() });
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });
    const basePrice = screen.getByText(/999 EUR/i);
    const selectedStorage = screen.getByText(/128 GB/i);
    const selectedColor = screen.getByRole("button", {
      name: /Porcelana/i,
    });
    expect(selectedColor).toBeInTheDocument();

    expect(basePrice).toBeInTheDocument();
    expect(selectedStorage).toBeInTheDocument();

    const addToCartBtn = screen.getByRole("button", { name: /ADD TO CART/i });
    expect(addToCartBtn).toBeInTheDocument();
    expect(addToCartBtn).toBeDisabled();

    fireEvent.click(selectedStorage);
    fireEvent.click(selectedColor);

    expect(screen.getByText(/Porcelana/i)).toBeInTheDocument();

    expect(addToCartBtn).toBeEnabled();

    fireEvent.click(addToCartBtn);
    expect(mockAddToCart).toHaveBeenCalledTimes(1);

    expect(navigateMock).toHaveBeenCalledWith("/cart");
  });

  it("renders error message on failed fetch", async () => {
    const consoleErrorMock = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mock.onGet("/products/1").reply(500);

    render(<ProductDetails />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText(/error loading data/i)).toBeInTheDocument();
    });

    consoleErrorMock.mockRestore();
  });
});
