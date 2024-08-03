import { createContext, FC, useContext, useEffect, useState } from "react";

export enum Bomb {
  A = "Bomb A",
  B = "Bomb B",
  C = "Bomb C",
  D = "Bomb D",
}

export const BOMBS = [Bomb.A, Bomb.B, Bomb.C, Bomb.D];

export interface ContextValue {
  // fuses is a map from Bomb Names to the value of their fuse in milliseconds
  fuses: Record<Bomb, number>;

  // startTime is the unix timestamp in milliseconds when the timer started
  // a null value indicates the timer has not started.
  startTime: number | null;

  onActionClick: () => void;
  onRefreshClick: () => void;
}

const defaultContextValue: ContextValue = {
  fuses: {} as Record<Bomb, number>,
  startTime: null,
  onActionClick: () => {},
  onRefreshClick: () => {},
};

export const Context = createContext<ContextValue>(defaultContextValue);

export const ContextProviderComponent: FC = ({ children }) => {
  const [fuses, setFuses] = useState<Record<Bomb, number> | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Decrements fuses by 1000 milleseconds
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    if (fuses === null) return;
    if (startTime === null) return;

    timeout = setTimeout(() => {
      const newFuses = { ...fuses };
      for (const bomb of BOMBS) {
        newFuses[bomb] -= 1000;
        if (newFuses[bomb] <= 0) {
          newFuses[bomb] = 0;
        }
      }
      setFuses(newFuses);
    }, 1000);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [fuses, startTime]);

  // Initialize app state
  useEffect(() => {
    if (fuses === null) {
      const newFuses: Record<string, number> = {};
      for (const bomb of BOMBS) {
        newFuses[bomb] = randomFuseLength();
      }

      setFuses(newFuses);
    }
  }, [fuses]);

  if (fuses === null) {
    return null;
  }

  function handleActionClick() {
    if (startTime === null) {
      setStartTime(Date.now());
    }
  }

  function handleRefreshClick() {
    setFuses(null);
    setStartTime(null);
  }

  return (
    <Context.Provider
      value={{
        fuses,
        startTime,
        onActionClick: handleActionClick,
        onRefreshClick: handleRefreshClick,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export function useAppContext(): ContextValue {
  return useContext(Context);
}

/**
 * randomFuseLength returns a number in milliseconds between 10,000 and 20,000
 * rounded to the second.
 */
function randomFuseLength() {
  let rand = Math.random() * 11;
  return Math.floor(rand) * 1000 + 10_000;
}
