import { Product } from "../types/product";
import { api } from "./api";

export const getProducts = async (search: string = ""): Promise<Product[]> => {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";

  const { data } = await api.get<Product[]>(`/products${query}`);

  return data;
};
