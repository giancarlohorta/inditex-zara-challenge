import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "../services/products";

export const useProductDetails = (id: string) => {
  return useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => getProductDetails(id),
  });
};
