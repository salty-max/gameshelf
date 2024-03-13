import { Button } from "@repo/ui";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <main className={theme === "light" ? "" : "dark"}>
      <Button onClick={toggleTheme}>Toggle Theme</Button>
    </main>
  );
}

export default App;
