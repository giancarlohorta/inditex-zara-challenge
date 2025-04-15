import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      description: "Text to display when the input is empty",
      control: "text",
    },
    className: {
      description: "Additional CSS class names",
      control: false,
    },
    onEnter: {
      description: "Function called when the user presses Enter",
      action: "entered",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Type something...",
  },
};

export const NoPlaceholder: Story = {
  args: {
    placeholder: "",
  },
};
