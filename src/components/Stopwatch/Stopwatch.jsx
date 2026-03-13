//File name: Stopwatch.jsx
//Author: Kyle McColgan
//Date: 11 March 2026
//Description: This file contains the parent Stopwatch component for the stopwatch React project.

import React, { useState, useEffect, useRef, useCallback } from "react";

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

  const [laps, setLaps] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [showLaps, setShowLaps] = useState(true);
  const hasLoadedLaps = useRef(false);

  const openHelp = useCallback(() => setShowHelp(true), []);
  const closeHelp = useCallback(() => setShowHelp(false), []);

  const toggleLaps = useCallback(() => {
    setShowLaps(prev => !prev);
  }, []);

  const recordLap = useCallback(() => {
    const current = getCurrentTime();
    setLaps(prev => [current, ...prev]);
  }, [getCurrentTime]);

  const clearLaps = useCallback(() => {
    setLaps([]);
    localStorage.removeItem(LAP_STORAGE_KEY);
  }, []);

  const deleteLap = useCallback((index) => {
    setLaps(prev => prev.filter((_, i) => i !== index));
  }, []);

  //Load laps from localStorage once.
  useEffect(() => {
    if (hasLoadedLaps.current)
    {
      return;
    }

    try
    {
      const savedLaps = localStorage.getItem(LAP_STORAGE_KEY);
      if (savedLaps)
      {
        const parsed = JSON.parse(savedLaps);
        if (Array.isArray(parsed))
        {
          setLaps(parsed);
        }
      }
    }
    catch
    {
      console.warn("Unable to restore saved laps!");
    }

    hasLoadedLaps.current = true;
  }, []);

  //Save laps array to browser localStorage only after initial load.
  useEffect(() => {
    if ( ! hasLoadedLaps.current)
    {
      return;
    }

    localStorage.setItem(LAP_STORAGE_KEY, JSON.stringify(laps));
  }, [laps]);

  useKeyboardShortcuts({
    onToggle: toggle,
    onReset: reset,
    onLap: recordLap,
    onOpenHelp: openHelp
  });

  return (
    <>
      <section className={styles.shell} aria-label="Stopwatch application">
        <StopwatchHeader
          theme={theme}
          onToggleTheme={onToggleTheme}
        />

        <section className={styles.container} aria-label="Stopwatch">
          <div className={styles.core}>
            <StopwatchDisplay time={time} />
            <StopwatchControls
              isRunning={isRunning}
              toggle={toggle}
              reset={reset}
              recordLap={recordLap}
            />
          </div>

          {laps.length > 0 && (
            <section className={styles.laps} aria-label="Lap times">
              <header className={styles.lapHeader}>
                <span>Laps</span>
                <button
                  type="button"
                  className={styles.lapToggle}
                  onClick={toggleLaps}
                >
                  {showLaps ? "Hide" : "Show"}
                </button>
              </header>
              {showLaps && (
                <LapList laps={laps} onClear={clearLaps} onDelete={deleteLap} />
              )}
            </section>
          )}
        </section>
      </section>

      {showHelp && <HelpModal onClose={closeHelp} />}
    </>
  );
};

export default Stopwatch;
