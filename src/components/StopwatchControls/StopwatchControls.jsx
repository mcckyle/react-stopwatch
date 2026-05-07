//File name: StopwatchControls.jsx
//Author: Kyle McColgan
//Date: 6 May 2026
//Description: This file contains the stopwatch controls component for the stopwatch React project.

import React from "react";
import styles from "./StopwatchControls.module.css";

const StopwatchControls = ({ isRunning, toggle, reset, recordLap }) =>
{
  const primaryLabel = isRunning ? "Pause" : "Start";

  return (
    <section
      className={styles.controls}
      role="group"
      aria-label="Stopwatch controls"
    >
      <button
        type="button"
        onClick={toggle}
        className={`${styles.button} ${styles.primary}`}
        aria-pressed={isRunning}
      >
        {primaryLabel}
      </button>

      <button
        type="button"
        onClick={recordLap}
        disabled={!isRunning}
        className={`${styles.button} ${styles.secondary}`}
      >
        Lap
      </button>

      <button
        type="button"
        onClick={reset}
        className={`${styles.button} ${styles.tertiary}`}
      >
        Reset
      </button>
    </section>
  );
};

export default StopwatchControls;
