//File name: StopwatchHeader.jsx
//Author: Kyle McColgan
//Date: 11 March 2026
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
        <span className={styles.iconWrap}>
          {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
        </span>
      </button>
    </header>
  );
};

export default StopwatchHeader;
