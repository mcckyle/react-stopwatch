//File name: Stopwatch.jsx
//Author: Kyle McColgan
//Date: 16 June 2026
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
  const hasLaps = laps.length > 0;

  const [showHelp, setShowHelp] = useState(false);
  const recordLap = useCallback(() =>
  {
    setLaps((previous) => [getCurrentTime(), ...previous]);
  }, [getCurrentTime]);

  const clearLaps = useCallback(() =>
  {
    setLaps([]);
    try
    {
      localStorage.removeItem(LAP_STORAGE_KEY);
    }
    catch {}
  }, []);

  const deleteLap = useCallback((index) =>
  {
    setLaps(previous =>
    {
      return previous.filter(
        (_, lapIndex) => lapIndex !== index
      );
    });
  }, []);

  //Save laps array to browser localStorage only after initial load.
  useEffect(() =>
  {
    persistLaps(laps);
  }, [laps]);

  useKeyboardShortcuts({
    onToggle: toggle,
    onReset: reset,
    onLap: recordLap,
    onOpenHelp: () => setShowHelp(true)
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

        <div className={styles.stage}>
          <StopwatchDisplay time={time} />
        </div>
          <StopwatchControls
            isRunning={isRunning}
            toggle={toggle}
            reset={reset}
            recordLap={recordLap}
          />
      </main>

      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </>
  );
};

export default Stopwatch;
