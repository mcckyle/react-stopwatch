//File name: StopwatchDisplay.jsx
//Author: Kyle McColgan
//Date: 15 June 2026
//Description: This file contains the stopwatch display component for the stopwatch React project.

import React from "react";
import { formatTime } from "../../utils/formatTime";
import styles from "./StopwatchDisplay.module.css";

const StopwatchDisplay = ({ time }) => {
  const { hours, minutes, seconds, centiSeconds } = formatTime(time, true);
  const showHours = Number(hours) > 0;

  const readable = showHours
    ? `${hours} hours ${minutes} minutes ${seconds} seconds`
    : `${minutes} minutes ${seconds} seconds`;

  const digits = (value, prefix) =>
    value.split("").map(
      (digit, index) => (
        <span
          key={`${prefix}-${index}`}
          className={styles.digit}
          data-testid="digit" //For testing purposes...
          aria-hidden="true"
        >
          {digit}
        </span>
      )
  );

  return (
    <section className={styles.display} aria-label="Current stopwatch time">
      <time
        className={styles.time}
        role="timer"
        aria-live="off" //OFF - Constant updates can become noisy...
        aria-atomic="true"
        dateTime={`PT${hours}H${minutes}M${seconds}.${centiSeconds}S`}
      >
        <span className={styles.srOnly}>{readable}</span>
        <span className={styles.row} aria-hidden="true">
          {showHours && (
            <>
              <span className={styles.group}>{digits(hours, "hours")}</span>
              <span className={styles.separator}>:</span>
            </>
          )}
          <span className={styles.group}>{digits(minutes, "minutes")}</span>
          <span className={styles.separator}>:</span>
          <span className={styles.group}>{digits(seconds, "seconds")}</span>
          <span className={styles.separator}>.</span>
          <span className={styles.centi}>{digits(centiSeconds, "centiseconds", styles.centiDigit)}</span>
        </span>
      </time>
    </section>
  );
};

export default StopwatchDisplay;
