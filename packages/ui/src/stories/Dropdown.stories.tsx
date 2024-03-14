import type { Meta, StoryFn } from "@storybook/react";
import {
  Dropdown,
  DropdownCheckboxItem,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "../components/Dropdown";
import { Button } from "..";
import React from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Atoms/Dropdown",
  component: Dropdown,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryFn<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithItems: Story = (args) => {
  return (
    <Dropdown {...args}>
      <DropdownTrigger asChild>
        <Button variant={"outline"}>Open</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>Item 1</DropdownItem>
        <DropdownItem>Item 2</DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};

export const WithCheckboxes: Story = (args) => {
  const [isOutlined, setIsOutlined] = React.useState(true);
  const [isSmall, setIsSmall] = React.useState(false);

  return (
    <Dropdown {...args}>
      <DropdownTrigger asChild>
        <Button
          variant={isOutlined ? "outline" : "default"}
          size={isSmall ? "sm" : "default"}
        >
          Open
        </Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownCheckboxItem
          checked={isOutlined}
          onCheckedChange={setIsOutlined}
          disabled
        >
          Button outlined
        </DropdownCheckboxItem>
        <DropdownCheckboxItem checked={isSmall} onCheckedChange={setIsSmall}>
          Small button
        </DropdownCheckboxItem>
      </DropdownContent>
    </Dropdown>
  );
};
