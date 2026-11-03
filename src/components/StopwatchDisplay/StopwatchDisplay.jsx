//File name: StopwatchDisplay.jsx
//Author: Kyle McColgan
//Date: 2 November 2026
//Description: This file contains the stopwatch display component for the stopwatch React project.

import React from "react";
import { formatTime } from "../../utils/formatTime";
import styles from "./StopwatchDisplay.module.css";

const StopwatchDisplay = ({ time }) => {
  const { hours, minutes, seconds, centiSeconds } = formatTime(time, true);
  const showHours = Number(hours) > 0;

  //Readable representation for assistive technology.
  const accessibleTime = [
    showHours ? `${Number(hours)} hours` : null,
    `${Number(minutes)} minutes`,
    `${Number(seconds)} seconds`,
    `${Number(centiSeconds)} hundredths of a second`
  ].filter(Boolean).join(", ");

  //Render individually addressable clock digits.
  const renderDigits = (value, prefix) =>
    value.split("").map((digit, index) => (
        <span
          key={`${prefix}-${index}`}
          className={styles.digit}
          data-testid="digit" //For testing purposes...
          aria-hidden="true"
        >
          {digit}
        </span>
    ));

  //Preserve centisecond precision and leading zeros.
  const dateTime =
    `PT${Number(hours)}H${Number(minutes)}M` +
    `${Number(seconds)}.${String(centiSeconds).padStart(2, "0")}S`;

  return (
    <div className={styles.display}>
      <time
        className={styles.time}
        role="timer"
        aria-live="off" //OFF - Constant updates can become noisy...
        dateTime={dateTime}
      >
        <span className={styles.srOnly}>{accessibleTime}</span>
        <span
          className={`${styles.row} ${showHours ? styles.rowWithHours : ""}`}
          aria-hidden="true"
        >
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
          <span className={styles.centi}>{renderDigits(centiSeconds, "centiseconds")}</span>
        </span>
      </time>
    </div>
  );
};

export default StopwatchDisplay;
