import { ActionTypes } from "./actions";

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}
export interface Cycle {
  id: string;
  task: string;
  minutesAmout: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptedDate: new Date() };
          } else {
            return cycle;
          }
        }),
        activeCycleId: null,
      };
    case ActionTypes.CREATE_NEW_CYCLE:
      console.log(action.payload.id);

      return {
        ...state,
        cycles: [...state.cycles, action.payload],
        activeCycleId: action.payload.id,
      };
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() };
          } else {
            return cycle;
          }
        }),
        activeCycleId: null,
      };

    default:
      return state;
  }
}
