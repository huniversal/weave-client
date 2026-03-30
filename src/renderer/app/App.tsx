import * as styles from "./App.css";

export const App = () => {
  return (
    <main className={styles.shell}>
      <section className={styles.panel}>
        <div className={styles.eyebrow}>Weave Client</div>
        <h1 className={styles.heading}>Electron MVP scaffold is ready.</h1>
        <p className={styles.body}>
          Next step is wiring the landing page, workspace selection, and dashboard
          shell on top of the current renderer foundation.
        </p>
      </section>
    </main>
  );
};
