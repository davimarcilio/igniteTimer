import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

// import { BrowserRouter } from "react-router-dom";
import { CyclesContextProvider } from "./contexts/CyclesContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CyclesContextProvider>
      <BrowserRouter basename="/igniteTimer">
        <App />
      </BrowserRouter>
    </CyclesContextProvider>
  </React.StrictMode>
);
