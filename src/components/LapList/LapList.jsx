//File name: LapList.jsx
//Author: Kyle McColgan
//Date: 19 October 2025
//Description: This file contains the laps component for the React timer project.

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatTime } from "../../utils/formatTime";
import { useTheme } from "../../context/ThemeContext.jsx";

import styles from "./LapList.module.css";

const LapList = ({ laps }) => {
  const { theme } = useTheme();

  if (!laps.length)
  {
      return null;
  }

  //Calculate lap durations...
  const lapDurations = laps.map((lap, index) => lap - (laps[index + 1] ?? 0));
  const fastest = Math.min(...lapDurations);
  const slowest = Math.max(...lapDurations);

  return (
    <div className = {`${styles.lapList} ${theme}`}>
      <AnimatePresence>
        {laps.map((lap, index) => {
          const lapNumber = laps.length - index;
          const prevLap = laps[index + 1] ?? 0;
          const delta = lap - prevLap;

          const { hours, minutes, seconds, centiSeconds } = formatTime(lap, true);
          const deltaTime = formatTime(delta, true);

          const highlight =
            delta === fastest ? styles.fastest :
            delta === slowest ? styles.slowest : "";

          return (
            <motion.div
              key={index}
              className={`${styles.lap} ${highlight}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className = {styles.lapLabel}>Lap {lapNumber}</div>
              <div className = {styles.lapTime}>
                {hours !== "00"
                    ? `${hours}:${minutes}:${seconds}.${centiSeconds}`
                    : `${minutes}:${seconds}.${centiSeconds}`}
              </div>
              <div className={styles.lapDelta}>
                +{deltaTime.minutes}:{deltaTime.seconds}.{deltaTime.centiSeconds}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default LapList;
