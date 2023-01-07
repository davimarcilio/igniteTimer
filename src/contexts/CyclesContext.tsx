import { createContext, ReactNode, useState, useReducer } from "react";

interface Cycle {
  id: string;
  task: string;
  minutesAmout: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CreateCycleData {
  task: string;
  minutesAmout: number;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amoutSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  createNewCycle: (data: CreateCycleData) => void;
  setSecondsPassed: (seconds: number) => void;
  interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [amoutSecondsPassed, setAmoutSecondsPassed] = useState(0);

  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    switch (action.type) {
      case "INTERRUPT_CURRENT_CYCLE":
        return state.map((cycle) => {
          if (cycle.id === action.payload) {
            return { ...cycle, interruptedDate: new Date() };
          } else {
            return cycle;
          }
        });
      case "CREATE_NEW_CYCLE":
        return [...state, action.payload];
      case "MARK_CURRENT_CYCLE_AS_FINISHED":
        return state.map((cycle) => {
          if (cycle.id === action.payload) {
            return { ...cycle, finishedDate: new Date() };
          } else {
            return cycle;
          }
        });
      default:
        break;
    }
    return state;
  }, []);

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  function setSecondsPassed(seconds: number) {
    setAmoutSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() };
    //     } else {
    //       return cycle;
    //     }
    //   })
    // );
    dispatch({
      type: "MARK_CURRENT_CYCLE_AS_FINISHED",
      payload: activeCycleId,
    });
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmout: data.minutesAmout,
      startDate: new Date(),
    };
    dispatch({ type: "CREATE_NEW_CYCLE", payload: newCycle });
    // setCycles((cycles) => [...cycles, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmoutSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interruptedDate: new Date() };
    //     } else {
    //       return cycle;
    //     }
    //   })
    // );
    dispatch({ type: "INTERRUPT_CURRENT_CYCLE", payload: activeCycleId });
    setActiveCycleId(null);
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amoutSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
