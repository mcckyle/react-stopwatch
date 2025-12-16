//File name: StopwatchDisplay.jsx
//Author: Kyle McColgan
//Date: 15 December 2025
//Description: This file contains the stopwatch display component for the React stopwatch project.

import React from "react";
import AnimatedDigit from "../AnimatedDigit/AnimatedDigit.jsx";
import { formatTime } from "../../utils/formatTime";

import styles from "./StopwatchDisplay.module.css";

const StopwatchDisplay = ({ time }) => {
  const { hours, minutes, seconds} = formatTime(time);

  const renderDigits = (label, value) =>
    [...value].map((digit, index) => (
      <AnimatedDigit key={`${label}-${index}`} value={Number(digit)} />
    ));

  return (
    <section
      className = {styles.display}
      aria-label="Stopwatch time display"
    >
      <time
        className={styles.time}
        role="timer"
        aria-live="polite"
        aria-atomic="true"
      >
        {renderDigits("hours", hours)}
        <span className={styles.separator} aria-hidden="true">:</span>
        {renderDigits("minutes", minutes)}
        <span className={styles.separator} aria-hidden="true">:</span>
        {renderDigits("seconds", seconds)}
      </time>
    </section>
  );
};

export default StopwatchDisplay;
