import { GlobalStyles, darkTheme, lightTheme } from "@repo/theme";
import { Text } from "@repo/ui";
import { useState } from "react";
import { ThemeProvider } from "styled-components";

function App() {
  const [ theme, setTheme ] = useState("light")

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <button onClick={toggleTheme}>{theme === "light" ? "Dark Mode" : "Light Mode"}</button>
      <Text>Hello world</Text>
    </ThemeProvider>
  );
}

export default App;
