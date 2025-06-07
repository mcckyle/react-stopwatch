//File name: Timer.jsx
//Author: Kyle McColgan
//Date: 06 June 2025
//Description: This file contains the main parent Timer component for the React timer site.

import React, { useState, useEffect, useRef } from "react";
import { Moon, Sun, Clock } from "lucide-react";
import { useStopwatch } from "../../hooks/useStopwatch";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import TimerDisplay from "../TimerDisplay/TimerDisplay.jsx";
import TimerControls from "../TimerControls/TimerControls";
import LapList from "../LapList/LapList.jsx";
import HelpModal from "../HelpModal/HelpModal.jsx";
import styles from './Timer.module.css';

const LAP_STORAGE_KEY = "timer-app-laps"; //Key for browser localStorage.

const Timer = () => {
  const { time, isRunning, toggle, reset, getCurrentTime } = useStopwatch();
  const [laps, setLaps] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [dark, setDark] = useState(true);

  const hasLoadedLaps = useRef(false);

  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);
  }

  useEffect(() => {
    document.body.classList.toggle('light-theme', !dark);
  }, [dark]);

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
    <div className={styles.container}>
        <div className = {styles.box}>
            <button className={styles.themeToggle} onClick={toggleTheme} title="Toggle theme">
              {dark ? <Sun size={20} color="#facc15" /> : <Moon size={20} color="#38bdf8" />}
            </button>
            <h1 className={styles.title}>Timer</h1>
            <TimerDisplay time={time} />
            <TimerControls
                isRunning={isRunning}
                toggle={toggle}
                reset={reset}
                time={time}
                recordLap={recordLap}
            />
            <Clock size={48} color="#10b981" strokeWidth={1.5} />
            <LapList laps={laps} />
        </div>
        {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </div>
  );
};

export default Timer;
