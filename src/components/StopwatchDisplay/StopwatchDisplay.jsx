//File name: StopwatchDisplay.jsx
//Author: Kyle McColgan
//Date: 5 March 2026
//Description: This file contains the stopwatch display component for the stopwatch React project.

import React, { useMemo } from "react";
import AnimatedDigit from "../AnimatedDigit/AnimatedDigit.jsx";
import { formatTime } from "../../utils/formatTime";

import styles from "./StopwatchDisplay.module.css";

const StopwatchDisplay = ({ time }) => {
  const { hours, minutes, seconds, centiSeconds } = formatTime(time, true);
  const showHours = Number(hours) > 0;

  const readableTime = useMemo(() =>
    `${hours} hours ${minutes} minutes ${seconds} seconds ${centiSeconds} hundredths`,
    [hours, minutes, seconds, centiSeconds]
  );

  const renderDigits = (value, keyPrefix, isCenti = false) =>
    Array.from(value).map((digit, index) => (
      <AnimatedDigit
        key={`${keyPrefix}-${index}`}
        value={Number(digit)}
        isCenti={isCenti}
      />
    ));

  return (
    <section className={styles.display}>
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
