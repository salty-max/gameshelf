import type { Meta, StoryObj } from "@storybook/react";
import { Text, TextProps } from "../components/Text";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Atoms/Text",
  component: Text,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: { control: "Lorem ipsum" },
    variant: { control: "body" },
    color: { control: "default" },
  },
} satisfies Meta<TextProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Title: Story = {
  args: {
    variant: "title",
    children: "I am a title",
  },
};

export const Subtitle: Story = {
  args: {
    variant: "subtitle",
    children: "I am a subtitle",
  },
};

export const Body: Story = {
  args: {
    variant: "body",
    children: "I am a body",
  },
};

export const Label: Story = {
  args: {
    variant: "label",
    children: "I am a label",
  },
};

export const Caption: Story = {
  args: {
    variant: "caption",
    children: "I am a caption",
  },
};

export const BodyError: Story = {
  args: {
    variant: "body",
    color: "error",
    children: "I am an error",
  },
};
