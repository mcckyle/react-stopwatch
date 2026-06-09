//File name: StopwatchDisplay.jsx
//Author: Kyle McColgan
//Date: 9 June 2026
//Description: This file contains the stopwatch display component for the stopwatch React project.

import React from "react";
import { formatTime } from "../../utils/formatTime";
import styles from "./StopwatchDisplay.module.css";

const StopwatchDisplay = ({ time }) => {
  const { hours, minutes, seconds, centiSeconds } = formatTime(time, true);
  const showHours = Number(hours) > 0;

  const accessibleTime = showHours
    ? `${hours} hours ${minutes} minutes ${seconds} seconds`
    : `${minutes} minutes ${seconds} seconds`;

  const renderDigits = (value, keyPrefix, className = "") =>
  {
    return value.split("").map((digit, index) =>
    {
      return (
        <span
          key={`${keyPrefix}-${index}`}
          data-testid="digit" //For testing purposes...
          className={`${styles.digit} ${className}`}
          aria-hidden="true"
        >
          {digit}
        </span>
      );
    });
  };

  return (
    <section className={styles.display} aria-label="Current stopwatch time">
      <time
        className={styles.time}
        role="timer"
        aria-live="off" //OFF - Constant updates can become noisy...
        aria-atomic="true"
        dateTime={`PT${hours}H${minutes}M${seconds}.${centiSeconds}S`}
      >
        <span className={styles.srOnly}>{accessibleTime}</span>
        <span className={styles.row} aria-hidden="true">
          {showHours && (
            <>
              <span className={styles.group}>{renderDigits(hours, "hours")}</span>
              <span className={styles.separator}>:</span>
            </>
          )}
          <span className={styles.group}>{renderDigits(minutes, "minutes")}</span>
          <span className={styles.separator}>:</span>
          <span className={styles.group}>{renderDigits(seconds, "seconds")}</span>
          <span className={styles.separator}>.</span>
          <span className={styles.centi}>{renderDigits(centiSeconds, "centiseconds", styles.centiDigit)}</span>
        </span>
      </time>
    </section>
  );
};

export default StopwatchDisplay;
