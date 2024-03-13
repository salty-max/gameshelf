import type { Decorator, Preview, ReactRenderer } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import React from "react";

import "../../../styles/globals.css";
import { cn } from "../src/utils";

const globalDecorator: Decorator = (Story, context) => {
  const theme = context.parameters.theme || context.globals.theme;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className={cn("bg-background", theme)}
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
