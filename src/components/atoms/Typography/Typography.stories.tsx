// Typography.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import Typography from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Components/Atoms/Typography",
  component: Typography,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1e1e1e" },
      ],
    },
  },
  argTypes: {
    content: {
      description: "Text content to be rendered",
      control: "text",
    },
    className: {
      description: "Additional CSS class names",
      control: false,
    },
    size: {
      description: "Font size variant",
      control: "radio",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    weight: {
      description: "Font weight variant",
      control: "radio",
      options: ["light", "regular", "bold"],
    },
    color: {
      description: "Text color variant",
      control: "radio",
      options: ["primary", "secondary", "tertiary"],
    },
    as: {
      description: "HTML element to render",
      control: "radio",
      options: ["p", "span", "h1", "h2", "h3"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    content: "This is a paragraph",
    size: "md",
    weight: "light",
    color: "primary",
    as: "p",
  },
};

export const Heading: Story = {
  args: {
    content: "This is a heading",
    size: "xl",
    weight: "bold",
    color: "primary",
    as: "h1",
  },
};

export const SecondaryColor: Story = {
  args: {
    content: "Secondary color text",
    size: "sm",
    weight: "regular",
    color: "secondary",
    as: "span",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const CustomWeightAndSize: Story = {
  args: {
    content: "Bold and large text",
    size: "lg",
    weight: "bold",
    color: "tertiary",
    as: "h2",
  },
};
