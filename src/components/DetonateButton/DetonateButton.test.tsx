import { render, screen, cleanup } from "@testing-library/react";
import { Bomb, Context, ContextValue } from "Context";
import { DetonateButton } from "./DetonateButton";

const sharedValue: Pick<ContextValue, "onActionClick" | "onRefreshClick"> = {
  onActionClick: () => {},
  onRefreshClick: () => {},
};

afterEach(cleanup);

describe("DetonateButton", () => {
  it("renders", () => {
    render(
      <Context.Provider
        value={{
          fuses: {
            [Bomb.A]: 20000,
            [Bomb.B]: 19000,
            [Bomb.C]: 18000,
            [Bomb.D]: 17000,
          },
          startTime: null,
          ...sharedValue,
        }}
      >
        <DetonateButton />
      </Context.Provider>
    );

    screen.getByText("Explode");
  });

  it("says 'Waiting to explode' when some fuses are not zero but started", () => {
    render(
      <Context.Provider
        value={{
          fuses: {
            [Bomb.A]: 0,
            [Bomb.B]: 19000,
            [Bomb.C]: 0,
            [Bomb.D]: 0,
          },
          startTime: Date.now(),
          ...sharedValue,
        }}
      >
        <DetonateButton />
      </Context.Provider>
    );

    screen.getByText("Waiting to Explode...");
  });

  it("says 'All Bombs Exploded' when all fuses are zero", () => {
    render(
      <Context.Provider
        value={{
          fuses: {
            [Bomb.A]: 0,
            [Bomb.B]: 0,
            [Bomb.C]: 0,
            [Bomb.D]: 0,
          },
          startTime: Date.now(),
          ...sharedValue,
        }}
      >
        <DetonateButton />
      </Context.Provider>
    );

    screen.getByText("All Bombs Exploded");
  });
});
