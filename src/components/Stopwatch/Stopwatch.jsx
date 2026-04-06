//File name: Stopwatch.jsx
//Author: Kyle McColgan
//Date: 5 April 2026
//Description: This file contains the parent Stopwatch component for the stopwatch React project.

import React, { useState, useEffect, useCallback } from "react";
import { useStopwatch } from "../../hooks/useStopwatch";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { useTheme } from "../../context/ThemeContext.jsx";

import StopwatchHeader from "../StopwatchHeader/StopwatchHeader.jsx";
import StopwatchDisplay from "../StopwatchDisplay/StopwatchDisplay.jsx";
import StopwatchControls from "../StopwatchControls/StopwatchControls.jsx";
import LapList from "../LapList/LapList.jsx";
import HelpModal from "../HelpModal/HelpModal.jsx";

import styles from "./Stopwatch.module.css";

const LAP_STORAGE_KEY = "stopwatch-app-laps"; //Key for browser localStorage.

const Stopwatch = ({ onToggleTheme }) => {
  const { time, isRunning, toggle, reset, getCurrentTime } = useStopwatch();
  const { theme } = useTheme();

  const [laps, setLaps] = useState(() => {
    try
    {
      const savedLaps = localStorage.getItem(LAP_STORAGE_KEY);
      const parsedLaps = savedLaps ? JSON.parse(savedLaps) : [];

      return Array.isArray(parsedLaps) ? parsedLaps : [];
    }
    catch
    {
      console.warn("Unable to restore saved laps!");
      return [];
    }
  });

  const [showHelp, setShowHelp] = useState(false);
  const [showLaps, setShowLaps] = useState(true);
  const openHelp = useCallback(() => setShowHelp(true), []);
  const closeHelp = useCallback(() => setShowHelp(false), []);
  const toggleLaps = useCallback(() => setShowLaps((prev) => !prev), []);

  const recordLap = useCallback(() =>
  {
    const currentTime = getCurrentTime();
    setLaps((prev) => [currentTime, ...prev]);
  }, [getCurrentTime]);

  const clearLaps = useCallback(() =>
  {
    setLaps([]);
    localStorage.removeItem(LAP_STORAGE_KEY);
  }, []);

  const deleteLap = useCallback((index) =>
  {
    setLaps((prev) => prev.filter((_, lapIndex) => lapIndex !== index));
  }, []);

  //Save laps array to browser localStorage only after initial load.
  useEffect(() =>
  {
    try
    {
      localStorage.setItem(LAP_STORAGE_KEY, JSON.stringify(laps));
    }
    catch
    {
      console.warn("Unable to persist laps!");
    }
  }, [laps]);

  useKeyboardShortcuts({
    onToggle: toggle,
    onReset: reset,
    onLap: recordLap,
    onOpenHelp: openHelp
  });

  const hasLaps = laps.length > 0;
  const lapsRegionId = "stopwatch-laps-panel";

  return (
    <>
      <section className={styles.shell} aria-label="Stopwatch application">
        <StopwatchHeader theme={theme} onToggleTheme={onToggleTheme} />

        <main className={styles.container} aria-label="Stopwatch timer">
          <section className={styles.core} aria-label="Current time and controls">
            <StopwatchDisplay time={time} />
            <StopwatchControls
              isRunning={isRunning}
              toggle={toggle}
              reset={reset}
              recordLap={recordLap}
            />
          </section>

          {hasLaps && (
            <aside className={styles.laps} aria-label="Lap times">
              <header className={styles.lapHeader}>
                <span className={styles.lapTitle}>Laps</span>
                <button
                  type="button"
                  className={styles.lapToggle}
                  onClick={toggleLaps}
                  aria-expanded={showLaps}
                  aria-controls={lapsRegionId}
                >
                  {showLaps ? "Hide" : "Show"}
                </button>
              </header>
              {showLaps && (
                <div id={lapsRegionId} className={styles.lapListWrap}>
                  <LapList
                    laps={laps}
                    onClear={clearLaps}
                    onDelete={deleteLap}
                  />
                </div>
              )}
            </aside>
          )}
        </main>
      </section>

      {showHelp && <HelpModal onClose={closeHelp} />}
    </>
  );
};

export default Stopwatch;
