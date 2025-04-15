import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof Header> = {
  title: "Components/Molecules/Header",
  component: Header,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    cart: false,
  },
};

export const WithCartEmpty: Story = {
  args: {
    cart: true,
    count: 0,
  },
};

export const WithCartCount: Story = {
  args: {
    cart: true,
    count: 3,
  },
};
