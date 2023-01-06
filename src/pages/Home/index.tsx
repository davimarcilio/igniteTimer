import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { differenceInSeconds } from "date-fns";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmoutInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";

import * as zod from "zod";
import { useEffect, useState } from "react";

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmout: zod
    .number()
    .min(5, "O ciclo precisa ser de no minimo 5 minutos")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
});

interface Cycle {
  id: string;
  task: string;
  minutesAmout: number;
  startDate: Date;
  interruptedDate?: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amoutSecondsPassed, setAmoutSecondsPassed] = useState(0);
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmout: 0,
    },
  });
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  useEffect(() => {
    if (activeCycle) {
      const interval = setInterval(() => {
        setAmoutSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate)
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activeCycle]);

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmout: data.minutesAmout,
      startDate: new Date(),
    };
    setCycles((cycles) => [...cycles, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmoutSecondsPassed(0);
    reset();
  }

  function handleInterruptCycle() {
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmout * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amoutSecondsPassed : 0;

  const minutesAmout = Math.floor(currentSeconds / 60);
  const secondsAmmout = currentSeconds % 60;

  const minutes = String(minutesAmout).padStart(2, "0");
  const seconds = String(secondsAmmout).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  const task = watch("task");
  const isSubmitDisabled = !task;
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
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
        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>
        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Comecar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
