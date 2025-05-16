//src/components/Timer.jsx

import React, { useState } from "react";
import { Clock } from "lucide-react";
import { useStopwatch } from "../hooks/useStopwatch";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import LapList from "./LapList";
import styles from './Timer.module.css';

const Timer = () => {
  const { time, isRunning, toggle, reset, getCurrentTime } = useStopwatch();

  const [laps, setLaps] = useState([]);

  const recordLap = () => {
    const current = getCurrentTime();
    setLaps((prev) => [current, ...prev]);
  };

  return (
    <div className={styles.container}>
        <div className = {styles.box}>
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
    </div>
  );
};

export default Timer;
