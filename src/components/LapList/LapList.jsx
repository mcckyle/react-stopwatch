//File name: LapList.jsx
//Author: Kyle McColgan
//Date: 29 September 2026
//Description: This file contains the laps component for the stopwatch React project.

import React, { useState, useMemo } from "react";
import { formatTime } from "../../utils/formatTime";

import styles from "./LapList.module.css";

const LapList = ({ laps, onClear, onDelete }) =>
{
  const [confirmClear, setConfirmClear] = useState(false);

  if (!laps.length)
  {
      return null;
  }

  //Calculate lap durations.
  const lapDurations = useMemo(() =>
  {
    return laps.map((lap, index) =>
      lap - (laps[index + 1] ?? 0)
    );
  }, [laps]);
  const { fastestLap, slowestLap } = useMemo(() =>
  {
    return {
      fastestLap: Math.min(...lapDurations),
      slowestLap: Math.max(...lapDurations)
    };
  }, [lapDurations]);

  const handleClearClick = () =>
  {
    if (confirmClear)
    {
      onClear();
      setConfirmClear(false);
      return;
    }

    setConfirmClear(true);
  };

  return (
    <section
      className={styles.lapList}
      role="log"
      aria-live="polite"
      aria-label="Lap history"
    >
      <header className={styles.header}>
        <div className={styles.heading}>
          <span className={styles.title}>Lap history</span>
          <span className={styles.count}>{laps.length}</span>
        </div>

        <button
          type="button"
          className={`${styles.clearButton} ${
            confirmClear ? styles.confirm : ""
          }`}
          onClick={handleClearClick}
          onBlur={() => setConfirmClear(false)}
        >
          {confirmClear ? "Confirm" : "Clear"}
        </button>
      </header>

      <ul className={styles.rows}>
        {laps.map((lap, index) =>
        {
          const lapNumber = laps.length - index;
          const hasComparableLaps = laps.length > 1;
          const duration = lapDurations[index];

          const formattedLap = formatTime(lap, true);
          const formattedDuration = formatTime(duration, true);

          const isFastest = (hasComparableLaps) && (duration === fastestLap);
          const isSlowest = (hasComparableLaps) && (duration === slowestLap);
          const isLatest = index === 0;

          const fullTime =
            formattedLap.hours !== "00"
              ? `${formattedLap.hours}:${formattedLap.minutes}:${formattedLap.seconds}.${formattedLap.centiSeconds}`
              : `${formattedLap.minutes}:${formattedLap.seconds}.${formattedLap.centiSeconds}`;

          const deltaTime =
          formattedDuration.hours !== "00"
            ? `+${formattedDuration.hours}:${formattedDuration.minutes}:${formattedDuration.seconds}.${formattedDuration.centiSeconds}`
            : `+${formattedDuration.minutes}:${formattedDuration.seconds}.${formattedDuration.centiSeconds}`;

          const rowClassName = [
            styles.lap,
            isLatest && styles.latest,
            isFastest && styles.fastest,
            isSlowest && styles.slowest
          ].filter(Boolean).join(" ");

          return (
            <li key={lapNumber} className={rowClassName}>
              <span
                className={styles.lapLabel}
                aria-label={`Lap ${lapNumber}`}
              >
                {lapNumber}
              </span>
              <span className={styles.lapTime}>{fullTime}</span>
              <span className={styles.lapDelta}>{deltaTime}</span>
              <button
                type="button"
                className={styles.delete}
                onClick={() => onDelete(index)}
                aria-label={`Delete lap ${lapNumber}`}
              >
                <span aria-hidden="true">×</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default LapList;
