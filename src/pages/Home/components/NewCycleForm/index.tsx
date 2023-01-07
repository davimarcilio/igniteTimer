import { FormContainer, MinutesAmoutInput, TaskInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../..";
import { useFormContext } from "react-hook-form";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);

  const { register } = useFormContext();

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
        // onChange={(e) => setTask(e.target.value)}
        // value={task}
      />
      <datalist id="task-suggestions">
        <option value="Projeto 1"></option>
        <option value="Projeto 2"></option>
        <option value="Projeto 3"></option>
        <option value="Banana"></option>
      </datalist>

      <label htmlFor="minutesAmout">durante</label>
      <MinutesAmoutInput
        type="number"
        id="minutesAmout"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        placeholder="00"
        {...register("minutesAmout", {
          valueAsNumber: true,
        })}
      />

      <span>minutos.</span>
    </FormContainer>
  );
}
