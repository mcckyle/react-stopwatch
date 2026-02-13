//File name: StopwatchDisplay.jsx
//Author: Kyle McColgan
//Date: 11 February 2026
//Description: This file contains the stopwatch display component for the React stopwatch project.

import React from "react";
import AnimatedDigit from "../AnimatedDigit/AnimatedDigit.jsx";
import { formatTime } from "../../utils/formatTime";

import styles from "./StopwatchDisplay.module.css";

const StopwatchDisplay = ({ time }) => {
  const { hours, minutes, seconds } = formatTime(time);
  const readableTime = `${hours}:${minutes}:${seconds}`;

  const renderDigits = (value, label) =>
    [...value].map((digit, index) => (
      <AnimatedDigit key={`${label}-${index}`} value={Number(digit)} />
    ));

  return (
    <section className={styles.display} aria-label="Elapsed time">
      <time
        className={styles.time}
        role="timer"
        aria-live="polite"
        aria-atomic="true"
        dateTime={`PT${hours}H${minutes}M${seconds}S`}
      >
        <span className={styles.visuallyHidden}>{readableTime}</span>
        <span className={styles.line} aria-hidden="true">
          <span className={styles.unit}>{renderDigits(hours, "h")}</span>
          <span className={styles.separator}>:</span>
          <span className={styles.unit}>{renderDigits(minutes, "m")}</span>
          <span className={styles.separator}>:</span>
          <span className={styles.unit}>{renderDigits(seconds, "s")}</span>
        </span>
      </time>
    </section>
  );
};

export default StopwatchDisplay;
