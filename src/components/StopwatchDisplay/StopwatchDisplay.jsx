//File name: StopwatchDisplay.jsx
//Author: Kyle McColgan
//Date: 15 January 2026
//Description: This file contains the stopwatch display component for the React stopwatch project.

import React from "react";
import AnimatedDigit from "../AnimatedDigit/AnimatedDigit.jsx";
import { formatTime } from "../../utils/formatTime";

import styles from "./StopwatchDisplay.module.css";

const StopwatchDisplay = ({ time }) => {
  const { hours, minutes, seconds} = formatTime(time);

  const renderDigits = (value, label) =>
    [...value].map((digit, index) => (
      <AnimatedDigit key={`${label}-${index}`} value={Number(digit)} />
    ));

  return (
    <section className={styles.display} aria-label="Stopwatch time display">
      <time
        className={styles.time}
        role="timer"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className={styles.line}>
          <span className={styles.unit} aria-label="Hours">{renderDigits(hours, "h")}</span>
          <span className={styles.separator} aria-hidden="true">:</span>
          <span className={styles.unit} aria-label="Minutes">{renderDigits(minutes, "m")}</span>
          <span className={styles.separator} aria-hidden="true">:</span>
          <span className={styles.unit} aria-label="Seconds">{renderDigits(seconds, "s")}</span>
        </span>
      </time>
    </section>
  );
};

export default StopwatchDisplay;
