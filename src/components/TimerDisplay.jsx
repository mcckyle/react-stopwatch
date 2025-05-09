// src/components/TimerDisplay.jsx

import React from "react";
import AnimatedDigit from "./AnimatedDigit";
import styles from "./TimerDisplay.module.css";

const formatTime = (totalSeconds) => {
  const safeSeconds = Number.isFinite(totalSeconds) ? totalSeconds : 0;
  const hours = String(Math.floor(safeSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((safeSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(safeSeconds % 60).padStart(2, "0");
  return { hours, minutes, seconds };
};

const TimerDisplay = ({ time }) => {
  const { hours, minutes, seconds} = formatTime(time);

  return (
    <div className={styles.text}>
        {[...hours].map((digit, i) => (
            <AnimatedDigit key={`hr-${i}`} value={parseInt(digit)} />
        ))}
        <span className={styles.colon}>:</span>
        {[...minutes].map((digit, i) => (
            <AnimatedDigit key={`min-${i}`} value={parseInt(digit)} />
        ))}
        <span className={styles.colon}>:</span>
        {[...seconds].map((digit, i) => (
            <AnimatedDigit key={`sec-${i}`} value={parseInt(digit)} />
        ))}
    </div>
  );
};

export default TimerDisplay;
