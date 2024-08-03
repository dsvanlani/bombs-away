import { Bomb, useAppContext } from "Context";
import styles from "./bomb-card.module.scss";

interface BomCardProps {
  label: Bomb;
}

export const BombCard: React.FC<BomCardProps> = ({ label }) => {
  const { fuses } = useAppContext();

  const exploded = fuses[label] === 0;
  const classes = [styles.card];
  if (exploded) {
    classes.push(styles.exploded);
  }

  return (
    <div className={classes.join(" ")}>
      <div>
        <strong>{exploded ? "Exploded" : label}</strong>
      </div>
      <div>
        <strong data-testid={`${label}-fuse-value`}>
          {fuses[label] / 1000}
        </strong>{" "}
        seconds
      </div>
    </div>
  );
};
