import { ProductDetailsData } from "@/types/product";

export const formatText = (text: string) => {
  return text.toUpperCase();
};

export const humanizeKey = (key: string) =>
  formatText(key.replace(/([A-Z])/g, " $1"));

export const formatSpecList = (productData: ProductDetailsData) => {
  return {
    brand: productData.brand,
    name: productData.name,
    description: productData.description,
    ...productData.specs,
  };
};
