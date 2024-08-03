import { useAppContext } from "Context";
import { useMemo } from "react";
import { allBombsExploded } from "utils";

import styles from "./detonate-button.module.scss";

export const DetonateButton: React.FC = () => {
  const { startTime, onActionClick, fuses } = useAppContext();

  const copy = useMemo(() => {
    if (startTime === null) {
      return "Explode";
    }

    return allBombsExploded(fuses)
      ? "All Bombs Exploded"
      : "Waiting to Explode...";
  }, [startTime, fuses]);

  return (
    <button
      className={styles.button}
      onClick={onActionClick}
      disabled={startTime != null}
    >
      {copy}
    </button>
  );
};
