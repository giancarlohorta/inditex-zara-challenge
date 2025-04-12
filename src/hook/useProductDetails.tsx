import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "../services/products";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./useCart";

interface selectedType {
  id: string;
  name: string;
  capacity: string;
  hexCode: string;
  price: number;
  imageUrl: string;
  colorName: string;
}

export const useProductDetails = (id: string) => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => getProductDetails(id),
  });

  const { addToCart } = useCart();

  const [selected, setSelected] = useState<selectedType>({
    id: "",
    name: "",
    capacity: "",
    hexCode: "",
    price: 0,
    imageUrl: "",
    colorName: "",
  });

  const handleSelected = (newValues: Partial<selectedType>) => {
    if (data) {
      setSelected((prev) => ({
        id: prev.id || data.id,
        name: prev.name || data.name,
        capacity: prev.capacity || data.storageOptions[0].capacity,
        price: prev.price || data.storageOptions[0].price,
        hexCode: prev.hexCode || data.colorOptions[0].hexCode,
        imageUrl: prev.imageUrl || data.colorOptions[0].imageUrl,
        colorName: prev.colorName || data.colorOptions[0].name,
        ...newValues,
      }));
    }
  };

  const handleAddToCart = () => {
    const product = {
      id: selected.id,
      name: selected.name,
      imageUrl: selected.imageUrl,
      color: selected.colorName,
      capacity: selected.capacity,
      price: selected.price,
      quantity: 1,
    };
    addToCart(product);
    navigate("/cart");
  };

  return { data, isLoading, error, selected, handleSelected, handleAddToCart };
};
