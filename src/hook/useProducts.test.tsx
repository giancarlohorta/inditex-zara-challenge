import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, beforeEach, vi } from "vitest";
import MockAdapter from "axios-mock-adapter";
import { api } from "../services/api";
import { useProducts } from "./useProducts";
import { mockList } from "../mocks/products";

const mock = new MockAdapter(api);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useProducts hook", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("should fetch products without a search query by default", async () => {
    const mockResponse = [mockList[0]];

    mock.onGet("/products").reply(200, mockResponse);

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.count).toEqual(mockResponse.length);
    expect(result.current.isEmpty).toBe(false);
  });

  it("should fetch products with a search query when handleSearch is called", async () => {
    mock.onGet("/products").reply(200, []);

    const searchTerm = "samsung";
    const encoded = encodeURIComponent(searchTerm);
    const mockResponse = [mockList[0]];
    mock.onGet(`/products?search=${encoded}`).reply(200, mockResponse);

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toEqual([]);

    act(() => {
      result.current.handleSearch(searchTerm);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.count).toEqual(mockResponse.length);
    expect(result.current.isEmpty).toBe(false);
  });

  it("should set an error if the request fails", async () => {
    const consoleErrorMock = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mock.onGet("/products").reply(500);

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeDefined();
    consoleErrorMock.mockRestore();
  });
});
