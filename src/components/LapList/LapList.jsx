//File name: LapList.jsx
//Author: Kyle McColgan
//Date: 6 March 2026
//Description: This file contains the laps component for the stopwatch React project.

import React, { useState } from "react";
import { formatTime } from "../../utils/formatTime";

import styles from "./LapList.module.css";

const LapList = ({ laps, onClear }) => {
  const [confirmClear, setConfirmClear] = useState(false);

  if (!laps.length)
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
        >
          {confirmClear ? "Confirm" : "Clear"}
        </button>
      </header>

      {laps.map((lap, index) => {
        const lapNumber = laps.length - index;
        const delta = lapDurations[index];

        const time = formatTime(lap, true);
        const deltaTime = formatTime(delta, true);

        const isFastest = delta === fastest;
        const isSlowest = delta === slowest;
        const isLatest = index === 0;

        const fullTime =
          time.hours !== "00"
            ? `${time.hours}:${time.minutes}:${time.seconds}.${time.centiSeconds}`
            : `${time.minutes}:${time.seconds}.${time.centiSeconds}`;

        const formattedDelta = `+${deltaTime.minutes}:${deltaTime.seconds}.${deltaTime.centiSeconds}`;

        const rowClass = [
          styles.lap,
          isLatest && styles.latest,
          isFastest && styles.fastest,
          isSlowest && styles.slowest,
        ]
        .filter(Boolean)
        .join(" ");

        return (
          <div key={`lap-${lapNumber}`} className={rowClass}>
            <span className={styles.lapLabel}>Lap {lapNumber}</span>
            <span className={styles.lapTime}>{fullTime}</span>
            <span className={styles.lapDelta}>{formattedDelta}</span>
          </div>
        );
      })}
    </section>
  );
};

export default LapList;
