//File name: StopwatchHeader.jsx
//Author: Kyle McColgan
//Date: 17 March 2026
//Description: This file contains the header component for the stopwatch React project.

import React from "react";
import { Clock, Sun, Moon } from "lucide-react";
import styles from "./StopwatchHeader.module.css";

const StopwatchHeader = ({ theme, onToggleTheme }) => {
  const isDark = theme === "dark";

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Clock className={styles.icon} aria-hidden="true" />
        <span className={styles.title}>Precision Stopwatch</span>
      </div>

      <button
        type="button"
        className={styles.toggle}
        onClick={onToggleTheme}
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        aria-pressed={isDark}
      >
        {isDark ? (
          <Sun className={styles.toggleIcon} aria-hidden="true" />
        ) :(
          <Moon className={styles.toggleIcon} aria-hidden="true" />
        )}
      </button>
    </header>
  );
};

export default StopwatchHeader;
