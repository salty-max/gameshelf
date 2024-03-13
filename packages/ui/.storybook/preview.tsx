import type { Decorator, Preview, ReactRenderer } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import React from "react";

import "../../../styles/globals.css";
import { cn } from "../src/utils";

const globalDecorator: Decorator = (Story, context) => {
  const theme = context.parameters.theme || context.globals.theme;
  return (
    <div
      className={cn(
        "absolute top-0 left-0 w-screen h-screen overflow-auto flex items-center justify-center bg-background",
        theme,
      )}
    >
      <Story />
    </div>
  );
};

export const decorators = [
  globalDecorator,
  withThemeByClassName<ReactRenderer>({
    themes: {
      light: "",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
