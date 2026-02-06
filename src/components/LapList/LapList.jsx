//File name: LapList.jsx
//Author: Kyle McColgan
//Date: 4 February 2026
//Description: This file contains the laps component for the React stopwatch project.

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatTime } from "../../utils/formatTime";

import styles from "./LapList.module.css";

const LapList = ({ laps, onClear }) => {
  const [confirmClear, setConfirmClear] = useState(false);

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
      aria-label="Lap history"
      aria-live="polite"
    >
      {/* Header. */}
      <header className={styles.header}>
        <span className={styles.title}>Laps</span>

        <button
          type="button"
          className={`${styles.clearButton} ${confirmClear ? styles.confirm : ""}`}
          onClick={handleClearClick}
          onBlur={() => setConfirmClear(false)}
          aria-label="Clear all laps"
        >
          {confirmClear ? "Confirm" : "Clear"}
        </button>
      </header>

      <AnimatePresence initial={false}>
        {laps.map((lap, index) => {
          const lapNumber = laps.length - index;
          const delta = lap - (laps[index + 1] ?? 0);

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

          return (
            <motion.div
              key={`lap-${lapNumber}`}
              className={`${styles.lap} ${highlight} ${isLatest ? styles.latest : ""}`}
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.14, ease: "easeOut" }}
            >
              <span className={styles.lapLabel}>Lap {lapNumber}</span>
              <span className={styles.lapTime}>{fullTime}</span>
              <span className={styles.lapDelta}>
                +{deltaTime.minutes}:{deltaTime.seconds}.{deltaTime.centiSeconds}
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </section>
  );
};

export default LapList;
