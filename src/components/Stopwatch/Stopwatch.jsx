//File name: Stopwatch.jsx
//Author: Kyle McColgan
//Date: 15 February 2026
//Description: This file contains the parent Stopwatch component for the React stopwatch project.

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

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
  const hasLoadedLaps = useRef(false);

  const recordLap = useCallback(() => {
    const current = getCurrentTime();
    setLaps((prev) => [current, ...prev]);
  }, [getCurrentTime]);

  const clearLaps = useCallback(() => {
    setLaps([]);
    localStorage.removeItem(LAP_STORAGE_KEY);
  }, []);

  //Load laps from browser localStorage.
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
        setLaps(JSON.parse(savedLaps));
      }
    }
    catch
    {
      console.warn("Unable to restore laps!");
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
    onOpenHelp: () => setShowHelp(true),
  });

  return (
    <>
      <motion.section
        className={styles.container}
        aria-label="Stopwatch"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
      >
        <div className={styles.frame}>
          <StopwatchHeader
            theme={theme}
            onToggleTheme={onToggleTheme}
          />

          <div className={styles.core}>
            <StopwatchDisplay time={time} />
            <StopwatchControls
              isRunning={isRunning}
              toggle={toggle}
              reset={reset}
              recordLap={recordLap}
            />

            {laps.length > 0 && (
              <LapList laps={laps} onClear={clearLaps} />
            )}
          </div>
        </div>
      </motion.section>

      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </>
  );
};

export default Stopwatch;
