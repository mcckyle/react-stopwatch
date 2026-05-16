//File name: StopwatchHeader.jsx
//Author: Kyle McColgan
//Date: 15 May 2026
//Description: This file contains the header component for the stopwatch React project.

import React, { useState, useCallback } from "react";
import { Clock, Sun, Moon } from "lucide-react";
import LapList from "../LapList/LapList.jsx";
import styles from "./StopwatchHeader.module.css";

const StopwatchHeader = ({
  theme,
  onToggleTheme,
  laps,
  hasLaps,
  onClearLaps,
  onDeleteLap
}) => {
  const isDark = theme === "dark";
  const nextThemeLabel = isDark ? "light" : "dark";

  const [isLapPanelOpen, setIsLapPanelOpen] = useState(false);
  const togglePanel = useCallback(() =>
  {
    setIsLapPanelOpen((previous) => !previous);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.brandMark} aria-hidden="true">
          <Clock className={styles.icon} />
        </div>
        <span className={styles.title}>Precision Stopwatch</span>
      </div>

      <div className={styles.actions}>
        {hasLaps && (
          <button
            type="button"
            className={styles.lapButton}
            onClick={togglePanel}
            aria-expanded={isLapPanelOpen}
            aria-controls="lap-panel"
            aria-haspopup="true"
          >
            {isLapPanelOpen ? "Hide Laps" : "Show Laps"}
          </button>
        )}

        <button
          type="button"
          className={styles.toggle}
          onClick={onToggleTheme}
          aria-pressed={isDark}
          aria-label={`Switch to ${nextThemeLabel} theme`}
          title={`Switch to ${nextThemeLabel} theme`}
        >
          {isDark ? (
            <Sun className={styles.toggleIcon} aria-hidden="true" />
          ) : (
            <Moon className={styles.toggleIcon} aria-hidden="true" />
          )}
        </button>
      </div>

      {hasLaps && (
        <div
          id="lap-panel"
          className={`${styles.panel} ${isLapPanelOpen ? styles.open : ""}`}
          aria-hidden={!isLapPanelOpen}
        >
          <LapList
            laps={laps}
            onClear={onClearLaps}
            onDelete={onDeleteLap}
          />
        </div>
      )}
    </header>
  );
};

export default StopwatchHeader;
