//File name: StopwatchHeader.jsx
//Author: Kyle McColgan
//Date: 27 February 2026
//Description: This file contains the header component for the React stopwatch project.

import React from "react";
import { Clock, Sun, Moon } from "lucide-react";
import styles from "./StopwatchHeader.module.css";

const StopwatchHeader = ({ theme, onToggleTheme }) => {
  const isDark = theme === "dark";

  return (
    <div className={styles.header}>
      <div className={styles.brand}>
        <Clock className={styles.icon} aria-hidden="true" />
        <span className={styles.title}>Stopwatch</span>
      </div>

      <button
        type="button"
        className={styles.toggle}
        onClick={onToggleTheme}
        aria-label={`Activate ${isDark ? "light" : "dark"} mode`}
        aria-pressed={isDark}
      >
        {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
      </button>
    </div>
  );
};

export default StopwatchHeader;
