import type { Meta, StoryObj } from "@storybook/react";
import ButtonColor from "./ButtonColor";
import { ColorOption } from "../../../types/productDetail";

const meta: Meta<typeof ButtonColor> = {
  title: "Components/Atoms/ButtonColor",
  component: ButtonColor,
  tags: ["autodocs"],
  argTypes: {
    color: {
      description: "Color option for this button",
      control: "object",
    },
    selected: {
      description: "Currently selected color",
      control: "object",
    },
    onSelected: {
      description: "Function triggered when this color is selected",
      action: "selected",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonColor>;

const colorOption: ColorOption = {
  name: "Blue",
  hexCode: "#007BFF",
  imageUrl: "https://via.placeholder.com/150/007BFF/FFFFFF?text=Blue",
};

const anotherColor: ColorOption = {
  name: "Red",
  hexCode: "#FF0000",
  imageUrl: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Red",
};

export const Default: Story = {
  args: {
    color: colorOption,
    selected: anotherColor,
  },
};

export const Selected: Story = {
  args: {
    color: colorOption,
    selected: colorOption,
  },
};
