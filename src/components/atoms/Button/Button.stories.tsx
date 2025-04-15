import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof Button> = {
  title: "Components/Atoms/Button",
  component: Button,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    type: {
      description: "Visual style of the button",
      control: { type: "radio" },
      options: ["primary", "secondary", "link"],
    },
    disabled: {
      description: "Disables the button",
      control: "boolean",
    },
    link: {
      description: "If defined, the button becomes a React Router link",
      control: "text",
    },
    className: {
      description: "Additional CSS classes",
      control: false,
    },
    onClick: {
      description: "Function called when the button is clicked",
      action: "clicked",
    },
    children: {
      description: "Content inside the button",
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    type: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    type: "secondary",
  },
};

export const LinkButton: Story = {
  args: {
    children: "I am a Link",
    type: "link",
    link: "/example-route",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};
