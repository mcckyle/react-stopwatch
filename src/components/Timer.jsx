//src/components/Timer.jsx

import React from "react";
import { Clock } from "lucide-react";
import { useStopwatch } from "../hooks/useStopwatch";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import styles from './Timer.module.css';

const Timer = () => {
  const { seconds, isRunning, toggle, reset } = useStopwatch();

  return (
    <div className={styles.container}>
        <div className = {styles.box}>
            <TimerDisplay time={seconds} />
                <TimerControls isRunning={isRunning} toggle={toggle} reset={reset} />
                <Clock size={48} color="#10b981" strokeWidth={1.5} />
        </div>
    </div>
  );
};

export default Timer;
