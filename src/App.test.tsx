import { render, screen, cleanup, act } from "@testing-library/react";
import { BOMBS } from "Context";
import App from "./App";

jest.useFakeTimers();

afterEach(cleanup);

describe("App", () => {
  it("displays all bombs", () => {
    render(<App />);

    for (const bomb of BOMBS) {
      screen.getByText(bomb);
    }
  });

  it("counts down the fuses", async () => {
    render(<App />);

    const fuseValues = screen.getAllByTestId(/-fuse-value/);
    const initialValues = fuseValues.map((el) => el.textContent);

    act(() => {
      screen.getByText("Explode").click();
      jest.advanceTimersByTime(1000);
    });

    const updatedValues = fuseValues.map((el) => el.textContent);

    for (let i = 0; i < initialValues.length; i++) {
      expect(Number(updatedValues[i])).toBeLessThan(Number(initialValues[i]));
    }
  });

  it("shows 'All Bombs Exploded' when all fuses are zero", async () => {
    render(<App />);

    act(() => {
      screen.getByText("Explode").click();
      jest.advanceTimersByTime(21000);
    });

    await screen.findByText("All Bombs Exploded");
  });
});
