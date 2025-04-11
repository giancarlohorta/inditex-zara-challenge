import { Product, ProductDetails } from "../types/product";
import { api } from "./api";

export const getProducts = async (search: string = ""): Promise<Product[]> => {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";

  const { data } = await api.get<Product[]>(`/products${query}`);

  return data;
};

export const getProductDetails = async (
  id: string
): Promise<ProductDetails> => {
  const { data } = await api.get<ProductDetails>(`/products/${id}`);

  return data;
};
