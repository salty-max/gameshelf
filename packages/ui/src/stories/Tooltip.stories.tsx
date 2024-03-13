import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, TooltipProps } from "../components/Tooltip";
import { MessageCircleWarning } from "lucide-react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Atoms/Tooltip",
  component: Tooltip,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  args: {
    content: "Lorem ipsum solor sit amet",
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<TooltipProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    isHint: true,
  },
  render: (args) => (
    <Tooltip {...args}>
      <MessageCircleWarning />
    </Tooltip>
  ),
};
