// SearchArea.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import SearchArea from "./SearchArea";
import { action } from "@storybook/addon-actions";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof SearchArea> = {
  title: "Components/Organisms/SearchArea",
  component: SearchArea,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ padding: "2rem", maxWidth: 600 }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    count: {
      description: "Number of results to display",
      control: { type: "number" },
    },
    onEnter: {
      description: "Callback function when pressing Enter in the input",
      action: "search",
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchArea>;

export const Default: Story = {
  args: {
    count: 7,
    onEnter: action("onEnter"),
  },
};
