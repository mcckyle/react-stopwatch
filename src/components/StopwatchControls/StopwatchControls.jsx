//File name: StopwatchControls.jsx
//Author: Kyle McColgan
//Date: 16 January 2026
//Description: This file contains the stopwatch controls component for the React stopwatch project.

import React from "react";
import { Button } from "@mantine/core";
import { motion } from "motion/react";

import styles from "./StopwatchControls.module.css";

const MotionButton = motion.create(Button);

const buttonMotion = {
  whileHover: { scale: 1.006 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 140, damping: 34, mass: 0.85, },
};

const StopwatchControls = ({ isRunning, toggle, reset, recordLap }) => {
  return (
    <div
      className={styles.controls}
      role="group"
      aria-label="Stopwatch controls"
    >
      <MotionButton
        type="button"
        {...buttonMotion}
        onClick={toggle}
        className={`${styles.button} ${styles.primary}`}
        aria-pressed={isRunning}
        aria-label={isRunning ? "Pause stopwatch" : "Start stopwatch"}
      >
        {isRunning ? "Pause" : "Start"}
      </MotionButton>

      <MotionButton
        type="button"
        {...buttonMotion}
        onClick={recordLap}
        disabled={ ! isRunning}
        className={`${styles.button} ${styles.secondary}`}
        aria-label="Record lap"
      >
        Lap
      </MotionButton>

      <MotionButton
        type="button"
        {...buttonMotion}
        onClick={reset}
        className={`${styles.button} ${styles.tertiary}`}
        aria-label="Reset stopwatch"
      >
        Reset
      </MotionButton>
    </div>
  );
};

export default StopwatchControls;
