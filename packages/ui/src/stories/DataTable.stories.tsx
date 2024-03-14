import type { Meta, StoryObj } from "@storybook/react";
import { DataTable, DataTableProps } from "../components/DataTable";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

type Pokemon = {
  id: string;
  name: string;
  type: string;
  height: number;
  weight: number;
};

const columnHelper = createColumnHelper<Pokemon>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "ID",
  }),
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Name",
  }),
  columnHelper.accessor("type", {
    cell: (info) => info.getValue(),
    header: "Type",
  }),
  columnHelper.accessor("height", {
    cell: (info) => info.getValue(),
    header: "Height",
  }),
  columnHelper.accessor("weight", {
    cell: (info) => info.getValue(),
    header: "Weight",
  }),
] as Array<ColumnDef<Pokemon>>;

const data: Pokemon[] = [
  {
    id: "1",
    name: "Bulbasaur",
    type: "Grass",
    height: 7,
    weight: 69,
  },
  {
    id: "2",
    name: "Charmander",
    type: "Fire",
    height: 6,
    weight: 85,
  },
  {
    id: "3",
    name: "Squirtle",
    type: "Water",
    height: 5,
    weight: 90,
  },
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Atoms/DataTable",
  component: DataTable,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  args: {},
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<DataTableProps<Pokemon>>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    // @ts-expect-error Type mismatch between columns property and columns array
    columns,
    data,
  },
};
