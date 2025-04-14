import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, beforeEach, vi } from "vitest";
import MockAdapter from "axios-mock-adapter";
import { api } from "../../../services/api";
import { mockList } from "../../../mocks/products";
import Products from "./Products";
import { MemoryRouter } from "react-router-dom";

const mock = new MockAdapter(api);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

vi.mock("../../../hook/useCart", () => ({
  useCart: () => ({
    totalCartItems: 3,
  }),
}));

const ComponentWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/"]}>
        <Products />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe("Products page", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("should display products when there is no search query", async () => {
    mock.onGet("/products").reply(200, mockList);

    render(<ComponentWrapper />);

    expect(await screen.findByText(/Galaxy A05s/i)).toBeInTheDocument();
    expect(screen.getByText(/Iphone 16/i)).toBeInTheDocument();

    const results = screen.getByText(/2 results/i);
    expect(results).toBeInTheDocument();

    const cartLink = screen.getByRole("link", { name: /shopping cart/i });
    expect(cartLink).toHaveAttribute("href", "/cart");
  });

  it("should display 'No products found' when there are no products", async () => {
    mock.onGet("/products").reply(200, []);

    render(<ComponentWrapper />);

    expect(await screen.findByText(/No products found/i)).toBeInTheDocument();
  });

  it("should filter products when a search query is entered", async () => {
    mock.onGet("/products").reply(200, []);
    const searchTerm = "Samsung";
    const encoded = encodeURIComponent(searchTerm);
    const mockResponse = [mockList[0]];

    mock.onGet(`/products?search=${encoded}`).reply(200, mockResponse);

    render(<ComponentWrapper />);

    const inputElement = screen.getByRole("textbox");

    fireEvent.change(inputElement, { target: { value: "Samsung" } });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Galaxy A05s/i)).toBeInTheDocument();
      expect(screen.queryByText(/Iphone 16/i)).not.toBeInTheDocument();
      expect(screen.getByText(/1 results/i)).toBeInTheDocument();
    });
  });

  it("should show an error message when the request fails", async () => {
    const consoleErrorMock = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mock.onGet("/products").reply(500);

    render(<ComponentWrapper />);

    await waitFor(() => {
      expect(screen.getByText(/Error loading data./i)).toBeInTheDocument();
    });

    consoleErrorMock.mockRestore();
  });
});
