import { Product } from "./product";

export interface ColorOption {
  hexCode: string;
  imageUrl?: string;
  name: string;
}

interface Specs {
  battery: string;
  mainCamera: string;
  os: string;
  processor: string;
  resolution: string;
  screen: string;
  screenRefreshRate: string;
  selfieCamera: string;
}

interface StorageOptions {
  price: number;
  capacity: string;
}

export interface ProductDetailsData extends Product {
  description: string;
  colorOptions: ColorOption[];
  specs: Specs;
  similarProducts: Product[];
  storageOptions: StorageOptions[];
}

export interface SelectedType {
  id: string;
  name: string;
  capacity: string;
  hexCode: string;
  price: number;
  imageUrl?: string;
  colorName: string;
}
