import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export const usePhones = () => {
  return useQuery({
    queryKey: ["phones"],
    queryFn: async () => {
      const { data } = await api.get("/products");
      return data;
    },
  });
};
