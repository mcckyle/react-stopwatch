//File name: TimerDisplay.jsx
//Author: Kyle McColgan
//Date: 17 September 2025
//Description: This file contains the timer display component for the React timer project.

import React from "react";
import AnimatedDigit from "../AnimatedDigit/AnimatedDigit.jsx";
import styles from "./TimerDisplay.module.css";
import { formatTime } from "../../utils/formatTime";
import { useTheme } from "../../hooks/useTheme";

const TimerDisplay = ({ time }) => {
  const { hours, minutes, seconds} = formatTime(time);
  const { theme } = useTheme();

  return (
    <div className = {styles.wrapper}>
        <time
          className={styles.text}
          role="timer"
          aria-live="polite"
        >
            {[...hours].map((digit, i) => (
                <AnimatedDigit key={`hr-${i}`} value={parseInt(digit)} />
            ))}
            <span className={styles.colon} aria-hidden="true">:</span>
            {[...minutes].map((digit, i) => (
                <AnimatedDigit key={`min-${i}`} value={parseInt(digit)} />
            ))}
            <span className={styles.colon} aria-hidden="true">:</span>
            {[...seconds].map((digit, i) => (
                <AnimatedDigit key={`sec-${i}`} value={parseInt(digit)} />
            ))}
        </time>
      </div>
  );
};

export default TimerDisplay;
