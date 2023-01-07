import {
  FormContainer,
  MinusButton,
  MinutesAmoutContainer,
  MinutesAmoutInput,
  PlusButton,
  TaskInput,
} from "./styles";
import { useContext, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { Minus, Plus } from "phosphor-react";

export function NewCycleForm() {
  const { activeCycle, cycles } = useContext(CyclesContext);

  const [minutesAmout, setMinutesAmout] = useState(0);

  const { register } = useFormContext();

  useEffect(() => {
    if (activeCycle) {
      setMinutesAmout(0);
    }
  }, [activeCycle]);

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        type="text"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        list="task-suggestions"
        {...register("task")}
      />
      <datalist id="task-suggestions">
        {cycles.map((cycle) => {
          return (
            <option key={cycle.id} value={cycle.task}>
              {cycle.task}
            </option>
          );
        })}
      </datalist>
      <label htmlFor="minutesAmout">durante</label>
      <MinutesAmoutContainer>
        <MinusButton
          disabled={!!activeCycle}
          type="button"
          onClick={() =>
            minutesAmout > 5 && setMinutesAmout((state) => state - 5)
          }
        >
          <Minus size={16} />
        </MinusButton>
        <MinutesAmoutInput
          type="number"
          id="minutesAmout"
          step={5}
          min={5}
          max={60}
          value={minutesAmout}
          disabled={!!activeCycle}
          placeholder="00"
          {...register("minutesAmout", {
            valueAsNumber: true,
          })}
        />
        <PlusButton
          disabled={!!activeCycle}
          type="button"
          onClick={() => {
            minutesAmout < 60 && setMinutesAmout((state) => state + 5);
          }}
        >
          <Plus size={16} />
        </PlusButton>
      </MinutesAmoutContainer>
      <span>minutos.</span>
    </FormContainer>
  );
}
