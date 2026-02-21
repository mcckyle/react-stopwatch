//File name: LapList.jsx
//Author: Kyle McColgan
//Date: 20 February 2026
//Description: This file contains the laps component for the React stopwatch project.

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { formatTime } from "../../utils/formatTime";

import styles from "./LapList.module.css";

const LapList = ({ laps, onClear }) => {
  const [confirmClear, setConfirmClear] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  if ( ! laps.length)
  {
      return null;
  }

  //Calculate lap durations...
  const lapDurations = laps.map((lap, index) => lap - (laps[index + 1] ?? 0));
  const fastest = Math.min(...lapDurations);
  const slowest = Math.max(...lapDurations);

  const handleClearClick = () => {
    if (confirmClear)
    {
      onClear();
      setConfirmClear(false);
    }
    else
    {
      setConfirmClear(true);
    }
  };

  return (
    <section
      className={styles.lapList}
      role="log"
      aria-live="polite"
      aria-label="Lap history"
    >
      {/* Header. */}
      <header className={styles.header}>
        <span className={styles.title}>Laps</span>

        <button
          type="button"
          className={`${styles.clearButton} ${confirmClear ? styles.confirm : ""}`}
          onClick={handleClearClick}
          onBlur={() => setConfirmClear(false)}
          aria-label={confirmClear ? "Confirm clearing all laps" : "Clear all laps"}
        >
          {confirmClear ? "Confirm" : "Clear"}
        </button>
      </header>

      <AnimatePresence initial={false}>
        {laps.map((lap, index) => {
          const lapNumber = laps.length - index;
          const delta = lapDurations[index];

          const time = formatTime(lap, true);
          const deltaTime = formatTime(delta, true);

          const highlight =
            delta === fastest ? styles.fastest :
            delta === slowest ? styles.slowest : "";

          const isLatest = index === 0;

          const fullTime =
            time.hours !== "00"
              ? `${time.hours}:${time.minutes}:${time.seconds}.${time.centiSeconds}`
              : `${time.minutes}:${time.seconds}.${time.centiSeconds}`;

          const formattedDelta = `+${deltaTime.minutes}:${deltaTime.seconds}.${deltaTime.centiSeconds}`;

          return (
            <motion.div
              key={`lap-${lapNumber}`}
              className={`${styles.lap} ${highlight} ${isLatest ? styles.latest : ""}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.lapLabel}>Lap {lapNumber}</span>
              <span className={styles.lapTime}>{fullTime}</span>
              <span className={styles.lapDelta}>{formattedDelta}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </section>
  );
};

export default LapList;
