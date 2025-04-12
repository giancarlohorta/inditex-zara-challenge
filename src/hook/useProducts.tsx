import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/products";
import { useState } from "react";

export const useProducts = () => {
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", searchValue],
    queryFn: () => getProducts(searchValue),
  });

  const handleSearch = (value: string) => setSearchValue(value);

  const isEmpty = Array.isArray(data) && data.length === 0;
  const count = data?.length ?? 0;

  return {
    data,
    isLoading,
    error,
    handleSearch,
    isEmpty,
    count,
  };
};
