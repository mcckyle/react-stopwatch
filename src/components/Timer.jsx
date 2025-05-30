//File name: Timer.jsx
//Author: Kyle McColgan
//Date: 26 May 2025
//Description: This file contains the main parent Timer component for the React timer site.

import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Clock } from "lucide-react";
import { useStopwatch } from "../hooks/useStopwatch";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import LapList from "./LapList";
import HelpModal from "./HelpModal";
import styles from './Timer.module.css';

const Timer = () => {
  const { time, isRunning, toggle, reset, getCurrentTime } = useStopwatch();
  const [laps, setLaps] = useState([]);
  const [showHelp, setShowHelp] = useState(false);

  const [dark, setDark] = useState(true);

  const toggleTheme = () => {
    setDark(!dark);
    document.body.classList.toggle("light-theme");
  }

  const recordLap = () => {
    const current = getCurrentTime();
    setLaps((prev) => [current, ...prev]);
  };

  useKeyboardShortcuts({
    onToggle: toggle,
    onReset: reset,
    onLap: recordLap,
    onOpenHelp: () => setShowHelp(true)
  });

  return (
    <div className={styles.container}>
        <div className = {styles.box}>
            <button
                className={styles.themeToggle}
                onClick={toggleTheme}
                title="Toggle theme"
            >
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
