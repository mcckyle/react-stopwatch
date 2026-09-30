//File name: StopwatchHeader.jsx
//Author: Kyle McColgan
//Date: 29 September 2026
//Description: This file contains the header component for the stopwatch React project.

import React, { useState, useEffect, useCallback } from "react";
import { Clock, Sun, Moon } from "lucide-react";
import LapList from "../LapList/LapList.jsx";
import styles from "./StopwatchHeader.module.css";

const StopwatchHeader = ({
  theme,
  toggleTheme,
  laps,
  hasLaps,
  onClearLaps,
  onDeleteLap
}) => {
  const isDark = theme === "dark";
  const nextThemeLabel = isDark ? "light" : "dark";

  const [isLapPanelOpen, setLapPanelOpen] = useState(false);
  const toggleLapPanel = useCallback(() =>
  {
    setLapPanelOpen(previous => !previous);
  }, []);
  const closeLapPanel = useCallback(() =>
  {
    setLapPanelOpen(false);
  }, []);

  //A lap panel cannot remain open after its data disappears.
  useEffect(() => {
    if (!hasLaps)
    {
      closeLapPanel();
    }
  }, [hasLaps, closeLapPanel]);

  //Escape closes the lap panel.
  useEffect(() => {
    if (!isLapPanelOpen)
    {
      return;
    }

    const handleKeyDown = event =>
    {
      if (event.key !== "Escape")
      {
        return;
      }

      event.preventDefault();
      closeLapPanel();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLapPanelOpen, closeLapPanel]);

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Clock className={styles.icon} aria-hidden="true" />
        <span id="stopwatch-title" className={styles.title}>Stopwatch</span>
      </div>

      <div
        className={styles.actions}
        role="group"
        aria-label="Stopwatch actions"
      >
        {hasLaps && (
          <button
            type="button"
            className={styles.lapButton}
            onClick={toggleLapPanel}
            aria-expanded={isLapPanelOpen}
            aria-controls="lap-panel"
            aria-haspopup="dialog"
          >
            <span className={styles.lapLabel}>
              {isLapPanelOpen ? "Hide Laps" : "Laps"}
            </span>
            <span
              className={styles.lapCount}
              aria-label={`${laps.length} laps`}
            >
              {laps.length}
            </span>
          </button>
        )}

        <button
          type="button"
          className={styles.toggle}
          onClick={toggleTheme}
          aria-pressed={isDark}
          aria-label={`Switch to ${nextThemeLabel} mode`}
          title={`Switch to ${nextThemeLabel} mode`}
        >
          {isDark ? (
            <Sun className={styles.toggleIcon} aria-hidden="true" />
          ) : (
            <Moon className={styles.toggleIcon} aria-hidden="true" />
          )}
        </button>
      </div>

      {(hasLaps) && (isLapPanelOpen) && (
        <aside
          id="lap-panel"
          className={styles.panel}
          role="dialog"
          aria-label="Lap history"
          aria-modal="false"
        >
          <LapList
            laps={laps}
            onClear={onClearLaps}
            onDelete={onDeleteLap}
          />
        </aside>
      )}
    </header>
  );
};

export default StopwatchHeader;
