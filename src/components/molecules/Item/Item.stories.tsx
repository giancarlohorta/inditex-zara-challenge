import type { Meta, StoryObj } from "@storybook/react";
import Item from "./Item";
import { MemoryRouter } from "react-router-dom";
import { Product } from "@/types/product";

const meta: Meta<typeof Item> = {
  title: "Components/Molecules/Item",
  component: Item,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    item: {
      description: "Product to display",
      control: "object",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Item>;

const mockItem: Product = {
  id: "product-123",
  name: "Classic White Shirt",
  brand: "Basic Threads",
  basePrice: 29.99,
  imageUrl:
    "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.webp",
};

export const Default: Story = {
  args: {
    item: mockItem,
  },
};
