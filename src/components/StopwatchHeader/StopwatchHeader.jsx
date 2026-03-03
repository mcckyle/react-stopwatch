//File name: StopwatchHeader.jsx
//Author: Kyle McColgan
//Date: 2 March 2026
//Description: This file contains the header component for the React stopwatch project.

import React from "react";
import { Clock, Sun, Moon } from "lucide-react";
import styles from "./StopwatchHeader.module.css";

const StopwatchHeader = ({ theme, onToggleTheme }) => {
  const isDark = theme === "dark";

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Clock className={styles.icon} aria-hidden="true" />
        <h1 className={styles.title}>Stopwatch</h1>
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
    </header>
  );
};

export default StopwatchHeader;
