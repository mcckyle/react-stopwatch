//File name: Stopwatch.jsx
//Author: Kyle McColgan
//Date: 16 January 2026
//Description: This file contains the parent Stopwatch component for the React stopwatch project.

import React, { useState, useEffect, useRef } from "react";
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

  const recordLap = () => {
    const current = getCurrentTime();
    setLaps((prev) => [current, ...prev]);
  };

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
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
    >
      <StopwatchHeader theme={theme} onToggleTheme={onToggleTheme} />

      <motion.main
        className={styles.card}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.06, duration: 0.28, ease: "easeOut" }}
      >
        <section className={styles.displayArea} aria-label="Elapsed time">
          <StopwatchDisplay time={time} />
        </section>

        <section className={styles.controlsArea} aria-label="Stopwatch controls">
          <StopwatchControls
            isRunning={isRunning}
            toggle={toggle}
            reset={reset}
            recordLap={recordLap}
          />
        </section>

        <section className={styles.lapsArea} aria-label="Lap history">
          <LapList laps={laps} />
        </section>
      </motion.main>

        {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </motion.div>
  );
};

export default Stopwatch;
