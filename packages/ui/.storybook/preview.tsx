import type { Decorator, Preview } from "@storybook/react";
import {
  withThemeByClassName,
  withThemeFromJSXProvider,
} from "@storybook/addon-themes";
import React from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, GlobalStyles, darkTheme } from "@repo/theme";

import "../src/index.css";

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
    defaultTheme: "light",
    Provider: ThemeProvider,
    GlobalStyles: GlobalStyles,
  }),
];

const preview: Preview = {
  decorators: decorators,
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
