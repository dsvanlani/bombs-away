import { render, screen } from "@testing-library/react";
import { BombCard } from "./BombCard";
import { Bomb, Context, ContextValue } from "Context";

const sharedValue: Pick<
  ContextValue,
  "startTime" | "onActionClick" | "onRefreshClick"
> = {
  startTime: null,
  onActionClick: () => {},
  onRefreshClick: () => {},
};

describe("BombCard", () => {
  it("renders", () => {
    render(
      <Context.Provider
        value={{
          fuses: {
            [Bomb.A]: 20000,
            [Bomb.B]: 0,
            [Bomb.C]: 0,
            [Bomb.D]: 0,
          },
          ...sharedValue,
        }}
      >
        <BombCard label={Bomb.A} />
      </Context.Provider>
    );

    screen.getByText("Bomb A");
    screen.getByText("20");
    screen.getByText("seconds");
  });

  it("shows 'Exploded' when the fuse is 0", () => {
    render(
      <Context.Provider
        value={{
          fuses: {
            [Bomb.A]: 0,
            [Bomb.B]: 0,
            [Bomb.C]: 0,
            [Bomb.D]: 0,
          },
          ...sharedValue,
        }}
      >
        <BombCard label={Bomb.B} />
      </Context.Provider>
    );

    screen.getByText("Exploded");
  });
});
