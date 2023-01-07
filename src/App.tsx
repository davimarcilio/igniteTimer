import { CyclesContextProvider } from "./contexts/CyclesContext";
import { Router } from "./Router";
export function App() {
  return (
    <CyclesContextProvider>
      <Router />
    </CyclesContextProvider>
  );
}
