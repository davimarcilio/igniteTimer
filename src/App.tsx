import { CyclesContext, CyclesContextProvider } from "./contexts/CyclesContext";
import { Router } from "./Router";
// import { defaultTheme } from "./styles/themes/default";
import { lightTheme } from "./styles/themes/light";
import { defaultTheme } from "./styles/themes/default";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";
import { useContext, useEffect } from "react";

export function App() {
  const { theme } = useContext(CyclesContext);

  return (
    <ThemeProvider theme={theme ? defaultTheme : lightTheme}>
      <Router />
      <GlobalStyle />
    </ThemeProvider>
  );
}
