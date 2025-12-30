//File name: StopwatchHeader.jsx
//Author: Kyle McColgan
//Date: 28 December 2025
//Description: This file contains the header component for the React stopwatch project.

import React from "react";
import { Clock, Sun, Moon } from "lucide-react";

import styles from "./StopwatchHeader.module.css";

const StopwatchHeader = ({ theme, onToggleTheme }) => {
    return (
        <header className={styles.header}>
          <h1 className={styles.banner} aria-label="Stopwatch">
            <Clock className={styles.icon} aria-hidden="true" />
            <span className={styles.title}>Stopwatch</span>
          </h1>

          <button
            type="button"
            className={styles.themeToggle}
            onClick={onToggleTheme}
            aria-label="Toggle color theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>
    );
};

export default StopwatchHeader;
