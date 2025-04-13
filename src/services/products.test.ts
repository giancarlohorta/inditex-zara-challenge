import { describe, it, expect, beforeEach } from "vitest";
import MockAdapter from "axios-mock-adapter";
import { api } from "./api";
import { getProducts, getProductDetails } from "./products";
import { mockList } from "../mocks/products";
import { mockProductDetailsData } from "../mocks/productDetails";

const mock = new MockAdapter(api);

describe("products service", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("should fetch products without search query", async () => {
    const mockResponse = [mockList[0]];

    mock.onGet("/products").reply(200, mockResponse);

    const result = await getProducts();
    expect(result).toEqual(mockResponse);
  });

  it("should fetch products with search query", async () => {
    const searchTerm = "samsung";
    const encoded = encodeURIComponent(searchTerm);
    const mockResponse = [mockList[0]];

    mock.onGet(`/products?search=${encoded}`).reply(200, mockResponse);

    const result = await getProducts(searchTerm);
    expect(result).toEqual(mockResponse);
  });

  it("should fetch product details by id", async () => {
    const productId = "123";

    mock.onGet(`/products/${productId}`).reply(200, mockProductDetailsData);

    const result = await getProductDetails(productId);
    expect(result).toEqual(mockProductDetailsData);
  });

  it("should throw error if request fails", async () => {
    mock.onGet("/products").reply(500);

    await expect(getProducts()).rejects.toThrowError();
  });
});
