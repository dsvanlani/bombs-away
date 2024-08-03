import { BombCard } from "components/BombCard";
import { BOMBS, ContextProviderComponent } from "./Context";
import { DetonateButton } from "components/DetonateButton";
import { RefreshButton } from "components/RefreshButton";

import styles from "./app.module.scss";
import "./style/global.scss";

export default function App() {
  return (
    <ContextProviderComponent>
      <div className={styles.container}>
        <RefreshButton />
        <div className={styles.card}>
          {BOMBS.map((bomb) => (
            <BombCard key={bomb} label={bomb} />
          ))}
          <div className={styles.actions}>
            <DetonateButton />
          </div>
        </div>
      </div>
    </ContextProviderComponent>
  );
}
