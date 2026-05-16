//File name: StopwatchDisplay.jsx
//Author: Kyle McColgan
//Date: 15 May 2026
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

  const renderDigits = (value, keyPrefix, variant = "default") =>
  {
    return value.split("").map((digit, index) =>
    {
      const className =
        variant === "centi"
          ? `${styles.digit} ${styles.centiDigit}`
          : styles.digit;

      return (
        <span
          key={`${keyPrefix}-${index}`}
          data-testid="digit" //For testing purposes...
          className={className}
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
        aria-live="polite"
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
          <span className={styles.centi}>{renderDigits(centiSeconds, "centiseconds", "centi")}</span>
        </span>
      </time>
    </section>
  );
};

export default StopwatchDisplay;
