import { renderHook, waitFor, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MockAdapter from "axios-mock-adapter";
import { api } from "../services/api";
import { useProductDetails } from "./useProductDetails";
import { mockProductDetailsData } from "../mocks/productDetails";
import { MemoryRouter } from "react-router-dom";

const mock = new MockAdapter(api);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MemoryRouter>
  );
};

const addToCartMock = vi.fn();

vi.mock("./useCart", () => ({
  useCart: () => ({
    addToCart: addToCartMock,
  }),
}));

const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("useProductDetails (integrated)", () => {
  beforeEach(() => {
    mock.reset();
    vi.clearAllMocks();
  });

  it("should fetch product details and update selected values", async () => {
    const id = "1";

    mock.onGet(`/products/${id}`).reply(200, mockProductDetailsData);

    const { result } = renderHook(() => useProductDetails(id), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockProductDetailsData);

    act(() => {
      result.current.handleSelected({});
    });

    expect(result.current.selected).toEqual({
      id: mockProductDetailsData.id,
      name: mockProductDetailsData.name,
      capacity: mockProductDetailsData.storageOptions[0].capacity,
      price: mockProductDetailsData.storageOptions[0].price,
      hexCode: mockProductDetailsData.colorOptions[0].hexCode,
      imageUrl: mockProductDetailsData.colorOptions[0].imageUrl,
      colorName: mockProductDetailsData.colorOptions[0].name,
    });
  });

  it("should call addToCart and navigate to /cart", async () => {
    const id = "1";
    mock.onGet(`/products/${id}`).reply(200, mockProductDetailsData);

    const { result } = renderHook(() => useProductDetails(id), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      result.current.handleSelected({});
    });

    act(() => {
      result.current.handleAddToCart();
    });

    expect(addToCartMock).toHaveBeenCalledWith({
      id: mockProductDetailsData.id,
      name: mockProductDetailsData.name,
      imageUrl: mockProductDetailsData.colorOptions[0].imageUrl,
      color: mockProductDetailsData.colorOptions[0].name,
      capacity: mockProductDetailsData.storageOptions[0].capacity,
      price: mockProductDetailsData.storageOptions[0].price,
      quantity: 1,
    });

    expect(navigateMock).toHaveBeenCalledWith("/cart");
  });

  it("should handle error on failed request", async () => {
    const consoleErrorMock = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const id = "999";
    mock.onGet(`/products/${id}`).reply(500);

    const { result } = renderHook(() => useProductDetails(id), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeDefined();
    expect(result.current.data).toBeUndefined();
    consoleErrorMock.mockRestore();
  });
});
