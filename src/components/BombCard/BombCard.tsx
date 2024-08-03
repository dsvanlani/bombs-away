import { Bomb, useAppContext } from "Context";
import styles from "./bomb-card.module.scss";

interface BomCardProps {
  label: Bomb;
}

export const BombCard: React.FC<BomCardProps> = ({ label }) => {
  const { fuses } = useAppContext();

  return (
    <div className={styles.card}>
      <div>
        <strong>{label}</strong>
      </div>
      <div>
        <strong>{fuses[label] / 1000}</strong> seconds
      </div>
    </div>
  );
};
