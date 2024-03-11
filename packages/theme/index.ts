import { createGlobalStyle } from "styled-components";

export interface Theme {
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  fontSizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  colors: {
    body: string;
    text: string;
    primary: string;
    secondary: string;
    info: string;
    success: string;
    warning: string;
    error: string;
    light: string;
    dark: string;
  };
}

const baseTheme: Omit<Theme, "colors"> = {
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "2rem",
    xl: "4rem",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.5rem",
  },
};

export const lightTheme: Theme = {
  ...baseTheme,
  colors: {
    body: "#dfe6e9",
    text: "#2d3436",
    primary: "#6c5ce7",
    secondary: "#dfe6e9",
    info: "#0984e3",
    success: "#00b894",
    warning: "#fdcb6e",
    error: "#d63031",
    light: "#dfe6e9",
    dark: "#2d3436",
  },
};

export const darkTheme: Theme = {
  ...baseTheme,
  colors: {
    body: "#2d3436",
    text: "#dfe6e9",
    primary: "#6c5ce7",
    secondary: "#2d3436",
    info: "#0984e3",
    success: "#00b894",
    warning: "#fdcb6e",
    error: "#d63031",
    light: "#2d3436",
    dark: "#dfe6e9",
  },
};

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.body};
    color: ${(props) => props.theme.colors.text};
    font-family: Poppins, sans-serif;
  }
`;
