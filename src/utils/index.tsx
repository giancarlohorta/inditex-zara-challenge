import { Product } from "../types/product";
import { ProductDetailsData } from "../types/productDetail";

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

export const getClientX = (e: MouseEvent | TouchEvent): number =>
  e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;

export const uniqueProducts = (products?: Product[]) => {
  if (!products) return [];
  const seen = new Set();
  return products.filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
};
