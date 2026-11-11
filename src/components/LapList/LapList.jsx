//File name: LapList.jsx
//Author: Kyle McColgan
//Date: 10 November 2026
//Description: This file contains the laps component for the stopwatch React project.

import React, { useState, useEffect, useMemo } from "react";
import { formatTime } from "../../utils/formatTime";

import styles from "./LapList.module.css";

const LapList = ({ laps, onClear, onDelete }) =>
{
  const [confirmClear, setConfirmClear] = useState(false);
  const hasComparableLaps = laps.length > 1;

  //Calculate lap durations and comparison values
  const { durations, fastestLap, slowestLap } = useMemo(() =>
  {
    const durations = laps.map((lap, index) =>
      lap - (laps[index + 1] ?? 0)
    );

    const fastestLap = durations.length
      ? durations.reduce((fastest, duration) =>
          Math.min(fastest, duration), Infinity)
      : 0;

    const slowestLap = durations.length
      ? durations.reduce((slowest, duration) =>
          Math.max(slowest, duration), -Infinity)
      : 0;

    return {
      durations,
      fastestLap,
      slowestLap
    };
  }, [laps]);

  //Reset confirmation when lap history changes.
  useEffect(() => {
    setConfirmClear(false);
  }, [laps]);

  //Require confirmation before clearing history.
  const handleClearClick = () =>
  {
    if (!confirmClear)
    {
      setConfirmClear(true);
      return;
    }

    setConfirmClear(false);
    onClear();
  };

  if (!laps.length)
  {
    return null;
  }

  return (
    <section className={styles.lapList} aria-label="Lap history">
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
          aria-label={confirmClear ? "Confirm clearing all laps" : "Clear all laps"}
          aria-describedby={confirmClear ? "clear-laps-hint" : undefined}
        >
          {confirmClear ? "Confirm" : "Clear"}
        </button>

        {confirmClear && (
          <span id="clear-laps-hint" className={styles.srOnly}>
            Activate again to permanently clear all recorded laps.
          </span>
        )}
      </header>

      <ul className={styles.rows}>
        {laps.map((lap, index) =>
        {
          const lapNumber = laps.length - index;
          const duration = durations[index];

          const formattedLap = formatTime(lap, true);
          const formattedDuration = formatTime(duration, true);

          const isLatest = index === 0;
          const isFastest = (hasComparableLaps) && (duration === fastestLap);
          const isSlowest = (hasComparableLaps) && (duration === slowestLap);

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
            <li key={`${lap}-${lapNumber}`} className={rowClassName}>
              <span className={styles.lapLabel}>
                <span aria-hidden="true">{lapNumber}</span>
                <span className={styles.srOnly}>
                  {`Lap ${lapNumber}`}
                </span>
              </span>
              <span className={styles.lapTime}>{fullTime}</span>
              <span
                className={styles.lapDelta}
                aria-label={`Lap duration ${deltaTime}`}
              >
                {deltaTime}
              </span>
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
