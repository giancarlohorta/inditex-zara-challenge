import { Product, ProductDetailsData } from "../types/product";
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
    console.error(`Erro ao buscar detalhes do produto com id ${id}:`, error);
    throw error;
  }
};
