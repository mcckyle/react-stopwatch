//File name: StopwatchHeader.jsx
//Author: Kyle McColgan
//Date: 8 January 2026
//Description: This file contains the header component for the React stopwatch project.

import React from "react";
import { Clock, Sun, Moon } from "lucide-react";

import styles from "./StopwatchHeader.module.css";

const StopwatchHeader = ({ theme, onToggleTheme }) => {
    return (
        <header className={styles.header} role="banner">
          <div className={styles.brand} aria-label="Stopwatch">
            <Clock className={styles.icon} aria-hidden="true" />
            <span className={styles.title}>Stopwatch</span>
          </div>

          <button
            type="button"
            className={styles.themeToggle}
            onClick={onToggleTheme}
            aria-label="Toggle color theme"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </header>
    );
};

export default StopwatchHeader;
