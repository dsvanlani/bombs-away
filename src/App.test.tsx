import { render, screen } from "@testing-library/react";
import App from "./App";
import { BOMBS } from "Context";

describe("App", () => {
  it("displays all bombs", () => {
    render(<App />);

    for (const bomb of BOMBS) {
      screen.getByText(bomb);
    }
  });
});
