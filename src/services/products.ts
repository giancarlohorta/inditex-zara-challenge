import { ProductDetailsData } from "../types/productDetail";
import { Product } from "../types/product";
import { api } from "./api";

export const getProducts = async (search: string = ""): Promise<Product[]> => {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";

  try {
    const { data } = await api.get<Product[]>(`/products${query}`);
    return data;
  } catch (error) {
    console.error("Error ", error);
    throw error;
  }
};

export const getProductDetails = async (
  id: string
): Promise<ProductDetailsData> => {
  try {
    const { data } = await api.get<ProductDetailsData>(`/products/${id}`);
    return data;
  } catch (error) {
    console.error(`Failed to retrieve product details for id ${id}:`, error);
    throw error;
  }
};
