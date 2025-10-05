import type { Meta, StoryObj } from "@storybook/react";
import ButtonColor from "./ButtonColor";

const meta: Meta<typeof ButtonColor> = {
  title: "Components/Atoms/ButtonColor",
  component: ButtonColor,
  tags: ["autodocs"],
  argTypes: {
    color: {
      description: "Color option for this button",
      control: "object",
    },
    selectedHexCode: {
      description: "Hex code of currently selected color",
      control: "text",
    },
    onSelected: {
      description: "Callback when color is selected",
      action: "selected",
    },
    size: {
      description: "Button size",
      control: "radio",
      options: ["sm", "default", "lg"],
    },
    disabled: {
      description: "Disable button",
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonColor>;

const redColor = {
  name: "Red",
  hexCode: "#FF0000",
  imageUrl: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Red",
};

const blueColor = {
  name: "Blue",
  hexCode: "#0000FF",
  imageUrl: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Blue",
};

export const Default: Story = {
  args: {
    color: redColor,
    selectedHexCode: blueColor.hexCode, // Não selecionado
  },
};

export const Selected: Story = {
  args: {
    color: redColor,
    selectedHexCode: redColor.hexCode, // Selecionado
  },
};

export const Small: Story = {
  args: {
    color: redColor,
    selectedHexCode: undefined,
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    color: redColor,
    selectedHexCode: redColor.hexCode,
    size: "lg",
  },
};

export const Disabled: Story = {
  args: {
    color: redColor,
    selectedHexCode: undefined,
    disabled: true,
  },
};

export const MultipleColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px" }}>
      <ButtonColor
        color={{ name: "Red", hexCode: "#FF0000" }}
        selectedHexCode="#FF0000"
        onSelected={(data) => console.log(data)}
      />
      <ButtonColor
        color={{ name: "Blue", hexCode: "#0000FF" }}
        selectedHexCode="#FF0000"
        onSelected={(data) => console.log(data)}
      />
      <ButtonColor
        color={{ name: "Green", hexCode: "#00FF00" }}
        selectedHexCode="#FF0000"
        onSelected={(data) => console.log(data)}
      />
    </div>
  ),
};
