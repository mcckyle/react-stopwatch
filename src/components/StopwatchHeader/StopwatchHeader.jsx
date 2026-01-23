//File name: StopwatchHeader.jsx
//Author: Kyle McColgan
//Date: 23 January 2026
//Description: This file contains the header component for the React stopwatch project.

import React from "react";
import { Clock, Sun, Moon } from "lucide-react";
import styles from "./StopwatchHeader.module.css";

const StopwatchHeader = ({ theme, onToggleTheme }) => {
  const isDark = theme === "dark";

  return (
      <header className={styles.header}>
        <div className={styles.brand} aria-hidden="true">
          <Clock className={styles.icon} />
          <span className={styles.title}>Stopwatch</span>
        </div>

        <button
          type="button"
          className={styles.themeToggle}
          onClick={onToggleTheme}
          aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
          aria-pressed={isDark}
        >
          {isDark ? <Sun /> : <Moon />}
        </button>
      </header>
  );
};

export default StopwatchHeader;
