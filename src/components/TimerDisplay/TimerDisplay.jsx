//File name: TimerDisplay.jsx
//Author: Kyle McColgan
//Date: 09 June 2025
//Description: This file contains the Timer display component for the React timer site.

import React from "react";
import AnimatedDigit from "../AnimatedDigit/AnimatedDigit.jsx";
import styles from "./TimerDisplay.module.css";
import { formatTime } from "../../utils/formatTime";
import { useTheme } from "../../hooks/useTheme";

const TimerDisplay = ({ time }) => {
  const { hours, minutes, seconds} = formatTime(time);
  const theme = useTheme();

  const isLight = theme === "light";

  return (
    <div className={`${styles.text} ${isLight ? styles.textLight : ""}`} role="timer" aria-label="Stopwatch time">
        {[...hours].map((digit, i) => (
            <AnimatedDigit key={`hr-${i}`} value={parseInt(digit)} color={isLight ? "#1e293b" : "#f1f5f9"} />
        ))}
        <span className={styles.colon}>:</span>
        {[...minutes].map((digit, i) => (
            <AnimatedDigit key={`min-${i}`} value={parseInt(digit)} color={isLight ? "#1e293b" : "#f1f5f9"} />
        ))}
        <span className={styles.colon}>:</span>
        {[...seconds].map((digit, i) => (
            <AnimatedDigit key={`sec-${i}`} value={parseInt(digit)} color={isLight ? "#1e293b" : "#f1f5f9"} />
        ))}
    </div>
  );
};

export default TimerDisplay;
