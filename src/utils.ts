export function allBombsExploded(fuses: Record<string, number>) {
  for (const v of Object.values(fuses)) {
    if (v > 0) {
      return false;
    }
  }
  return true;
}
