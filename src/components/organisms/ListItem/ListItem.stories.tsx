import type { Meta, StoryObj } from "@storybook/react";
import ListItem from "./ListItem";
import { MemoryRouter } from "react-router-dom";
import { Product } from "@/types/product";

const meta: Meta<typeof ListItem> = {
  title: "Components/Organisms/ListItem",
  component: ListItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    list: {
      description: "Array of product items",
      control: "object",
    },
    row: {
      description: "Display items in a row layout",
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ListItem>;

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

export const Grid: Story = {
  args: {
    list: mockList,
    row: false,
  },
};

export const Row: Story = {
  args: {
    list: mockList,
    row: true,
  },
};
