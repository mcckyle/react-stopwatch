//File name: StopwatchControls.jsx
//Author: Kyle McColgan
//Date: 11 March 2026
//Description: This file contains the stopwatch controls component for the stopwatch React project.

import React from "react";
import styles from "./StopwatchControls.module.css";

const StopwatchControls = ({ isRunning, toggle, reset, recordLap }) => {
  return (
    <div
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
        {isRunning ? "Pause" : "Start"}
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
    </div>
  );
};

export default StopwatchControls;
