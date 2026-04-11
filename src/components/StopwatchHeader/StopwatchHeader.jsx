//File name: StopwatchHeader.jsx
//Author: Kyle McColgan
//Date: 8 April 2026
//Description: This file contains the header component for the stopwatch React project.

import React from "react";
import { Clock, Sun, Moon } from "lucide-react";
import styles from "./StopwatchHeader.module.css";

const StopwatchHeader = ({ theme, onToggleTheme }) => {
  const isDark = theme === "dark";
  const nextThemeLabel = isDark ? "light" : "dark";

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.brandMark} aria-hidden="true">
          <Clock className={styles.icon} />
        </div>
        <span className={styles.title}>Precision Stopwatch</span>
      </div>

      <button
        type="button"
        className={styles.toggle}
        onClick={onToggleTheme}
        aria-label={`Switch to ${nextThemeLabel} theme`}
        aria-pressed={isDark}
        title={`Switch to ${nextThemeLabel} theme`}
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
