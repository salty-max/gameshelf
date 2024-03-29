import type { Meta, StoryFn } from "@storybook/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../components/Tooltip";
import { Icon } from "../components/Icon";

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
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryFn<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = (args) => (
  <Tooltip {...args}>
    <TooltipTrigger>
      <Icon name='MessageCircleMore' />
    </TooltipTrigger>
    <TooltipContent>This is a tooltip</TooltipContent>
  </Tooltip>
);
