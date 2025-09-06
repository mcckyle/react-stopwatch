//File name: Timer.jsx
//Author: Kyle McColgan
//Date: 05 September 2025
//Description: This file contains the parent Timer component for the React timer site.

import React, { useState, useEffect, useRef } from "react";
import { Clock, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useStopwatch } from "../../hooks/useStopwatch";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { useTheme } from "../../hooks/useTheme";
import TimerDisplay from "../TimerDisplay/TimerDisplay.jsx";
import TimerControls from "../TimerControls/TimerControls";
import LapList from "../LapList/LapList.jsx";
import HelpModal from "../HelpModal/HelpModal.jsx";
import styles from './Timer.module.css';

const LAP_STORAGE_KEY = "timer-app-laps"; //Key for browser localStorage.

const Timer = ({ dark, toggleTheme }) => {
  const { time, isRunning, toggle, reset, getCurrentTime } = useStopwatch();
  const [laps, setLaps] = useState([]);
  const [showHelp, setShowHelp] = useState(false);

  const theme = useTheme();
  const hasLoadedLaps = useRef(false);

  const recordLap = () => {
    const current = getCurrentTime();
    setLaps((prev) => [current, ...prev]);
  };

  useEffect(() => {
    console.log("Current laps state: ", laps);
  }, [laps]);

  //Load laps from browser localStorage.
  useEffect(() => {

    if (!hasLoadedLaps.current)
    {
        const savedLaps = localStorage.getItem(LAP_STORAGE_KEY);
        console.log("useEffect running on mount, raw saved laps: ", savedLaps);

        if (savedLaps)
        {
            try
            {
                const parsed = JSON.parse(savedLaps);
                console.log("Parsed laps from localStorage: ", parsed);
                setLaps(parsed);
            }
            catch (e)
            {
                console.error("Error occured while parsing saved laps: ", e);
            }
        }
        else
        {
            console.log("INFO: No laps found in the browser's localStorage.")
        }
        hasLoadedLaps.current = true;
    }
  }, []);

  //Save laps array to browser localStorage only after initial load.
  useEffect(() => {
    if (hasLoadedLaps.current)
    {
        console.log("INFO: Saving the laps to the browser's localStorage: ", laps);
        localStorage.setItem(LAP_STORAGE_KEY, JSON.stringify(laps));
    }
    else
    {
        console.log("Skipped saving laps...");
    }
  }, [laps]);

  useKeyboardShortcuts({
    onToggle: toggle,
    onReset: reset,
    onLap: recordLap,
    onOpenHelp: () => setShowHelp(true),
  });

  return (
    <div className={theme}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className={styles.bannerWrapper}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
            <h1 className={styles.banner}>
                <Clock size={32} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                <span className={styles.bannerText}>Timer</span>
            </h1>
            <button
                className={styles.themeToggle}
                onClick={toggleTheme}
                title="Toggle theme"
                aria-label="Toggle theme"
            >
                {dark ? <Sun size={20} color="#facc15" /> : <Moon size={20} color="#38bdf8" />}
            </button>
          </motion.div>

            <motion.div
              className = {styles.frame}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
                <div className = {styles.box}>
                    <TimerDisplay time={time} />
                    <TimerControls
                        isRunning={isRunning}
                        toggle={toggle}
                        reset={reset}
                        time={time}
                        recordLap={recordLap}
                    />
                    <motion.div
                      className={styles.clockEmblem}
                      whileHover={{ rotate: 3, scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                        <Clock size={56} color="#d4af37" strokeWidth={1.5} />
                    </motion.div>
                    <div className={styles.lapListWrapper}>
                        <LapList laps={laps} />
                    </div>
                </div>
            </motion.div>
                {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
          </motion.div>
        </div>
  );
};

export default Timer;
