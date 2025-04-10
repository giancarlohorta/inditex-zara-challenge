import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/products";

export const usePhones = (searchValue: string) => {
  return useQuery({
    queryKey: ["phones", searchValue],
    queryFn: () => getProducts(searchValue),
  });
};
