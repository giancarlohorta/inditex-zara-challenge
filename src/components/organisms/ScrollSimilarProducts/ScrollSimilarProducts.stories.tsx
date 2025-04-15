// ScrollSimilarProducts.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import ScrollSimilarProducts from "./ScrollSimilarProducts";
import { MemoryRouter } from "react-router-dom";
import { Product } from "@/types/product";

const meta: Meta<typeof ScrollSimilarProducts> = {
  title: "Components/Organisms/ScrollSimilarProducts",
  component: ScrollSimilarProducts,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ padding: "2rem" }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    list: {
      description: "Array of product items to be shown in horizontal scroll",
      control: "object",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ScrollSimilarProducts>;

const mockList: Product[] = [
  {
    id: "prod-1",
    name: "T-Shirt Basic",
    brand: "Brand A",
    basePrice: 19.99,
    imageUrl:
      "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.webp",
  },
  {
    id: "prod-2",
    name: "Denim Jacket",
    brand: "Brand B",
    basePrice: 49.99,
    imageUrl:
      "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.webp",
  },
  {
    id: "prod-3",
    name: "Running Shoes",
    brand: "Brand C",
    basePrice: 89.99,
    imageUrl:
      "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.webp",
  },
  {
    id: "prod-4",
    name: "Denim Jacket",
    brand: "Brand B",
    basePrice: 49.99,
    imageUrl:
      "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.webp",
  },
  {
    id: "prod-5",
    name: "Running Shoes",
    brand: "Brand C",
    basePrice: 89.99,
    imageUrl:
      "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.webp",
  },
  {
    id: "prod-6",
    name: "Denim Jacket",
    brand: "Brand B",
    basePrice: 49.99,
    imageUrl:
      "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.webp",
  },
  {
    id: "prod-7",
    name: "Running Shoes",
    brand: "Brand C",
    basePrice: 89.99,
    imageUrl:
      "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.webp",
  },
];

export const Default: Story = {
  args: {
    list: mockList,
  },
};
