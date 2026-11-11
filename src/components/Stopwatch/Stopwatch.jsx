//File name: Stopwatch.jsx
//Author: Kyle McColgan
//Date: 10 November 2026
//Description: This file contains the parent Stopwatch component for the stopwatch React project.

import React, { useState, useEffect, useCallback } from "react";
import { useStopwatch } from "../../hooks/useStopwatch";
import { loadStoredLaps, persistLaps } from "../../utils/lapHelpers";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { useTheme } from "../../context/ThemeContext.jsx";

import StopwatchHeader from "../StopwatchHeader/StopwatchHeader.jsx";
import StopwatchDisplay from "../StopwatchDisplay/StopwatchDisplay.jsx";
import StopwatchControls from "../StopwatchControls/StopwatchControls.jsx";
import HelpModal from "../HelpModal/HelpModal.jsx";

import styles from "./Stopwatch.module.css";

const LAP_STORAGE_KEY = "stopwatch-app-laps"; //Key for browser localStorage.

const Stopwatch = ({ toggleTheme }) => {
  const { time, isRunning, toggle, reset, getCurrentTime } = useStopwatch();
  const { theme } = useTheme();
  const [laps, setLaps] = useState(loadStoredLaps);
  const [showHelp, setShowHelp] = useState(false);
  const hasLaps = laps.length > 0;

  //Record a lap only while the stopwatch is running.
  const recordLap = useCallback(() =>
  {
    if (!isRunning) { return; }
    setLaps((previous) => [getCurrentTime(), ...previous]);
  }, [getCurrentTime, isRunning ]);

  //Clear recorded lap history.
  const clearLaps = useCallback(() =>
  {
    setLaps([]);
  }, []);

  //Delete an individual lap.
  const deleteLap = useCallback((index) =>
  {
    setLaps(previous =>
      previous.filter((_, lapIndex) => lapIndex !== index));
  }, []);

  //HelpModal controls.
  const openHelp = useCallback(() => setShowHelp(true), []);
  const closeHelp = useCallback(() => setShowHelp(false), []);

  //Persist laps history whenever it changes.
  useEffect(() =>
  {
    persistLaps(laps);
  }, [laps]);

  //Register keyboard shortcuts.
  useKeyboardShortcuts({
    onToggle: toggle,
    onReset: reset,
    onLap: recordLap,
    onOpenHelp: openHelp
  });

  return (
    <>
      <main className={styles.shell} aria-labelledby="stopwatch-title">
        <StopwatchHeader
          theme={theme}
          toggleTheme={toggleTheme}
          laps={laps}
          hasLaps={hasLaps}
          onClearLaps={clearLaps}
          onDeleteLap={deleteLap}
        />

        <section className={styles.hero} aria-label="Current stopwatch time">
          <StopwatchDisplay time={time} />
        </section>
        <footer className={styles.footer}>
          <StopwatchControls
            isRunning={isRunning}
            toggle={toggle}
            reset={reset}
            recordLap={recordLap}
          />
        </footer>
      </main>

      {showHelp && <HelpModal onClose={closeHelp} />}
    </>
  );
};

export default Stopwatch;
