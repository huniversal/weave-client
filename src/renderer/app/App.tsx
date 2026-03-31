import { useEffect, useState } from "react";

import * as styles from "./App.css";

export const App = () => {
  const [health, setHealth] = useState<ElectronHealth | null>(null);

  useEffect(() => {
    window.electronAPI
      .getHealth()
      .then(setHealth)
      .catch((error: unknown) => {
        console.error("Failed to read Electron health.", error);
      });
  }, []);

  return (
    <main className={styles.shell}>
      <section className={styles.panel}>
        <div className={styles.eyebrow}>Weave Client</div>
        <h1 className={styles.heading}>Electron MVP scaffold is ready.</h1>
        <p className={styles.body}>
          Next step is wiring the landing page, workspace selection, and
          dashboard shell on top of the current renderer foundation.
        </p>
        <dl className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>App</dt>
            <dd className={styles.metaValue}>{health?.appName ?? "loading"}</dd>
          </div>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>Electron</dt>
            <dd className={styles.metaValue}>
              {health?.electronVersion ?? "loading"}
            </dd>
          </div>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>Node</dt>
            <dd className={styles.metaValue}>
              {health?.nodeVersion ?? "loading"}
            </dd>
          </div>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>Platform</dt>
            <dd className={styles.metaValue}>
              {health?.platform ?? "loading"}
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
};
