import { allBombsExploded } from "utils";

describe("allBombsExploded", () => {
  it("returns true when all fuses are 0", () => {
    const fuses = {
      fuse1: 0,
      fuse2: 0,
    };

    expect(allBombsExploded(fuses)).toBe(true);
  });

  it("returns false when any fuse is not 0", () => {
    const fuses = {
      fuse1: 0,
      fuse2: 1,
    };

    expect(allBombsExploded(fuses)).toBe(false);
  });
});
