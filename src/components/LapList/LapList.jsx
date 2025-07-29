//File name: LapList.jsx
//Author: Kyle McColgan
//Date: 28 July 2025
//Description: This file contains the Lap component for the React timer site.

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./LapList.module.css";
import { formatTime } from "../../utils/formatTime";
import { useTheme } from "../../hooks/useTheme";

const LapList = ({ laps }) => {

    const theme = useTheme();

    const lapDurations = laps.map((lap, index) => lap - (laps[index + 1] ?? 0));

    const fastest = Math.min(...lapDurations);
    const slowest = Math.max(...lapDurations);

    return (
        <div className = {theme}>
            <div className={styles.lapList}>
              <AnimatePresence mode="popLayout">
                {laps.map((lap, index) => {
                    const lapNumber = laps.length - index;
                    const prevLap = laps[index + 1] ?? 0;
                    const delta = lap - prevLap;
                    const { hours, minutes, seconds, centiSeconds } = formatTime(lap, true);
                    const { minutes: dMin, seconds: dSec, centiSeconds: dCs } = formatTime(delta, true);

                    const deltaLabel =
                      hours !== "00"
                        ? `+${hours}:${minutes}:${seconds}:${centiSeconds}`
                        : `+${dMin}:${dSec}:${dCs}`;

                    let highlight = "";
                    if (delta === fastest) highlight = styles.fastest;
                    else if (delta === slowest) highlight = styles.slowest;

                    return (
                        <motion.div
                          key={index}
                          className={`${styles.lap} ${highlight}`}
                          initial={{ opacity: 0, y: 20, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition ={{
                              duration: 0.4,
                              ease: [0.25, 1, 0.5, 1],
                              delay: index * 0.04,
                          }}
                        >
                            <div className = {styles.lapLabel} aria-label={`Lap ${lapNumber}`}>Lap {lapNumber}</div>
                            <div className = {styles.lapSeparator}> </div>
                            <div className = {styles.lapTime}>
                                {hours !== "00"
                                    ? `${hours}:${minutes}:${seconds}.${centiSeconds}`
                                    : `${minutes}:${seconds}.${centiSeconds}`
                                }
                            </div>
                            {}
                            <div className={styles.lapDelta}>{deltaLabel}</div>
                        </motion.div>
                    );
                })}
              </AnimatePresence>
            </div>
        </div>
    );
};

export default LapList;
