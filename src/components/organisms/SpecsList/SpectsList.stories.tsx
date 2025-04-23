// SpecsList.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import SpecsList from "./SpecsList";
import { ProductDetailsData } from "../../../types/productDetail";

const meta: Meta<typeof SpecsList> = {
  title: "Components/Organisms/SpecsList",
  component: SpecsList,
  tags: ["autodocs"],
  argTypes: {
    data: {
      description: "Full product details including specs",
      control: "object",
    },
  },
};

export default meta;

type Story = StoryObj<typeof SpecsList>;

const mockData: ProductDetailsData = {
  id: "1",
  name: "Smartphone Z1",
  brand: "NovaTech",
  basePrice: 899.99,
  imageUrl:
    "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.webp",
  description: "A powerful and elegant smartphone built for speed.",
  colorOptions: [
    {
      hexCode: "#000000",
      name: "Black",
      imageUrl:
        "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.webp",
    },
    {
      hexCode: "#FFFFFF",
      name: "White",
    },
  ],
  specs: {
    battery: "4500mAh",
    mainCamera: "50MP + 12MP",
    os: "Android 13",
    processor: "Snapdragon 8 Gen 2",
    resolution: "2400x1080",
    screen: "6.7-inch OLED",
    screenRefreshRate: "120Hz",
    selfieCamera: "32MP",
  },
  similarProducts: [
    {
      id: "2",
      name: "Smartphone Y9",
      brand: "NovaTech",
      basePrice: 799.99,
      imageUrl:
        "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.webp",
    },
  ],
  storageOptions: [
    {
      capacity: "128GB",
      price: 899.99,
    },
    {
      capacity: "256GB",
      price: 999.99,
    },
  ],
};

export const Default: Story = {
  args: {
    data: mockData,
  },
};
