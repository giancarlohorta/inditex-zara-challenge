import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useCartData } from "./useCartData";
import { CartItem } from "../types/product";
import { mockCartProduct } from "../mocks/cartProduct";

const CART_KEY = "my-cart";

const repeatedItem: CartItem = {
  ...mockCartProduct,
  quantity: 2,
};

describe("useCartData", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with empty cart if localStorage is empty", () => {
    const { result } = renderHook(() => useCartData());
    expect(result.current.cart).toEqual([]);
    expect(result.current.totalCart).toBe(0);
    expect(result.current.totalCartItems).toBe(0);
  });

  it("should load cart from localStorage if present", () => {
    localStorage.setItem(CART_KEY, JSON.stringify([mockCartProduct]));

    const { result } = renderHook(() => useCartData());
    expect(result.current.cart).toEqual([mockCartProduct]);
    expect(result.current.totalCart).toBe(2000);
    expect(result.current.totalCartItems).toBe(2);
  });

  it("should remove invalid JSON from localStorage", () => {
    localStorage.setItem(CART_KEY, "invalid-json");

    const { result } = renderHook(() => useCartData());
    expect(result.current.cart).toEqual([]);
    expect(localStorage.getItem(CART_KEY)).toBe(null);
  });

  it("should add new item to cart and store in localStorage", () => {
    const { result } = renderHook(() => useCartData());

    act(() => {
      result.current.addToCart(mockCartProduct);
    });

    expect(result.current.cart).toEqual([mockCartProduct]);
    expect(result.current.totalCart).toBe(2000);
    expect(result.current.totalCartItems).toBe(2);

    const stored = JSON.parse(localStorage.getItem(CART_KEY)!);
    expect(stored).toEqual([mockCartProduct]);
  });

  it("should increment quantity if item with same id/color/capacity exists", () => {
    const { result } = renderHook(() => useCartData());

    act(() => {
      result.current.addToCart(mockCartProduct);
    });

    act(() => {
      result.current.addToCart(repeatedItem);
    });

    expect(result.current.cart).toEqual([{ ...mockCartProduct, quantity: 4 }]);
    expect(result.current.totalCart).toBe(4000);
    expect(result.current.totalCartItems).toBe(4);
  });

  it("should treat items with different colors as separate and increment quantity accordingly", () => {
    const { result } = renderHook(() => useCartData());

    const itemDefault = mockCartProduct;
    const itemRed = { ...mockCartProduct, color: "RED" };

    act(() => {
      result.current.addToCart(itemDefault);
      result.current.addToCart(itemRed);
      result.current.addToCart(itemRed);
    });

    expect(result.current.cart).toEqual([
      { ...itemDefault },
      { ...itemRed, quantity: 4 },
    ]);
    expect(result.current.totalCart).toBe(6000);
    expect(result.current.totalCartItems).toBe(6);
  });

  it("should remove item by id", () => {
    const { result } = renderHook(() => useCartData());

    act(() => {
      result.current.addToCart(mockCartProduct);
    });

    act(() => {
      result.current.removeFromCart(mockCartProduct.id);
    });

    expect(result.current.cart).toEqual([]);
    expect(localStorage.getItem(CART_KEY)).toBe(null);
  });

  it("should clear the cart", () => {
    const { result } = renderHook(() => useCartData());

    act(() => {
      result.current.addToCart(mockCartProduct);
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cart).toEqual([]);
    expect(localStorage.getItem(CART_KEY)).toBe(null);
  });
});
