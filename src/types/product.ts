export interface Product {
  id: string;
  brand: string;
  basePrice: number;
  imageUrl?: string;
  name: string;
}

interface ColorOption {
  hexCode: string;
  imageUrl: string;
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

export interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  color: string;
  capacity: string;
  quantity: number;
}
