import { ProductDetailsData } from "../types/product";

export const mockProductDetailsData: ProductDetailsData = {
  id: "1",
  name: "Phone Test",
  brand: "TestBrand",
  basePrice: 999,
  description: "Mock description",
  specs: {
    screen: "6.7 inch OLED",
    resolution: "2400x1080",
    processor: "Snapdragon 888",
    mainCamera: "50MP",
    battery: "5000mAh",
    os: "Android 12",
    screenRefreshRate: "120Hz",
    selfieCamera: "32MP",
  },
  colorOptions: [
    {
      name: "Obsidiana",
      hexCode: "#000000",
      imageUrl:
        "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp",
    },
    {
      name: "Porcelana",
      hexCode: "#F5F5F5",
      imageUrl:
        "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-porcelana.webp",
    },
    {
      name: "Celeste",
      hexCode: "#87CEEB",
      imageUrl:
        "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-celeste.webp",
    },
  ],
  storageOptions: [
    {
      capacity: "128 GB",
      price: 459,
    },
    {
      capacity: "256 GB",
      price: 509,
    },
  ],
  similarProducts: [],
};
