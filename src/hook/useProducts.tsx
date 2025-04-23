import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/products";
import { useState } from "react";
import { uniqueProducts } from "../utils";

export const useProducts = () => {
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", searchValue],
    queryFn: () => getProducts(searchValue),
  });

  const cleanProductList = uniqueProducts(data);

  const handleSearch = (value: string) => setSearchValue(value);

  const isEmpty = Array.isArray(data) && data.length === 0;
  const count = data?.length ?? 0;

  return {
    data: cleanProductList,
    isLoading,
    error,
    handleSearch,
    isEmpty,
    count,
  };
};
