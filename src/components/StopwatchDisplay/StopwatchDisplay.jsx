//File name: StopwatchDisplay.jsx
//Author: Kyle McColgan
//Date: 21 April 2026
//Description: This file contains the stopwatch display component for the stopwatch React project.

import React from "react";
import AnimatedDigit from "../AnimatedDigit/AnimatedDigit.jsx";
import { formatTime } from "../../utils/formatTime";

import styles from "./StopwatchDisplay.module.css";

const StopwatchDisplay = ({ time }) => {
  const { hours, minutes, seconds, centiSeconds } = formatTime(time, true);
  const showHours = Number(hours) > 0;

  const readableTime = showHours
      ? `${hours} hours ${minutes} minutes ${seconds} seconds`
      : `${minutes} minutes ${seconds} seconds`;

  const renderDigits = (value, keyPrefix, isCenti = false) =>
      value.split("").map((digit, index) => (
        <AnimatedDigit
          key={`${keyPrefix}-${index}`}
          value={Number(digit)}
          isCenti={isCenti}
        />
      ));

  return (
    <section className={styles.display} aria-label="Current stopwatch time">
      <time
        className={styles.time}
        role="timer"
        aria-live="polite"
        aria-atomic="true"
        dateTime={`PT${hours}H${minutes}M${seconds}.${centiSeconds}S`}
      >
        <span className={styles.srOnly}>{readableTime}</span>
        <span className={styles.row} aria-hidden="true">
          {showHours && (
            <>
              <span className={styles.group}>{renderDigits(hours, "h")}</span>
              <span className={styles.separator}>:</span>
            </>
          )}
          <span className={styles.group}>{renderDigits(minutes, "m")}</span>
          <span className={styles.separator}>:</span>
          <span className={styles.group}>{renderDigits(seconds, "s")}</span>
          <span className={styles.separator}>.</span>
          <span className={styles.centi}>{renderDigits(centiSeconds, "cs", true)}</span>
        </span>
      </time>
    </section>
  );
};

export default StopwatchDisplay;
