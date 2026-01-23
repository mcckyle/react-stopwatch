//File name: LapList.jsx
//Author: Kyle McColgan
//Date: 23 January 2026
//Description: This file contains the laps component for the React stopwatch project.

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatTime } from "../../utils/formatTime";

import styles from "./LapList.module.css";

const LapList = ({ laps }) => {
  if ( ! laps.length)
  {
      return null;
  }

  //Calculate lap durations...
  const lapDurations = laps.map((lap, index) => lap - (laps[index + 1] ?? 0));
  const fastest = Math.min(...lapDurations);
  const slowest = Math.max(...lapDurations);

  return (
    <div className={styles.lapList} role="log" aria-label="Lap history" aria-live="polite">
      <AnimatePresence initial={false}>
        {laps.map((lap, index) => {
          const lapNumber = laps.length - index;
          const prevLap = laps[index + 1] ?? 0;
          const delta = lap - prevLap;

          const time = formatTime(lap, true);
          const deltaTime = formatTime(delta, true);

          const highlight =
            delta === fastest ? styles.fastest :
            delta === slowest ? styles.slowest : "";

          return (
            <motion.div
              key={`lap-${lapNumber}`}
              className={`${styles.lap} ${highlight}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.14, ease: "easeOut" }}
              aria-label={`Lap ${lapNumber}, duration ${deltaTime.minutes} minutes ${deltaTime.seconds} seconds`}
            >
              <span className={styles.lapLabel}>Lap {lapNumber}</span>

              <span className={styles.lapTime}>
                {time.hours !== "00"
                    ? `${time.hours}:${time.minutes}:${time.seconds}.${time.centiSeconds}`
                    : `${time.minutes}:${time.seconds}.${time.centiSeconds}`}
              </span>

              <span className={styles.lapDelta}>
                +{deltaTime.minutes}:{deltaTime.seconds}.{deltaTime.centiSeconds}
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default LapList;
