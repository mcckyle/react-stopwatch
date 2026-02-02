//File name: StopwatchControls.jsx
//Author: Kyle McColgan
//Date: 2 February 2026
//Description: This file contains the stopwatch controls component for the React stopwatch project.

import React from "react";
import { Button } from "@mantine/core";
import { motion } from "motion/react";

import styles from "./StopwatchControls.module.css";

const MotionButton = motion.create(Button);

const baseMotion = {
  whileHover: { scale: 1.012 },
  whileTap: { scale: 0.96 },
};

const primaryMotion = {
  ...baseMotion,
  transition: { type: "spring", stiffness: 170, damping: 26, mass: 1, },
};

const secondaryMotion = {
  ...baseMotion,
  transition: { type: "spring", stiffness: 140, damping: 30, mass: 0.9, },
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
        {...primaryMotion}
        onClick={toggle}
        className={`${styles.button} ${styles.primary}`}
        aria-pressed={isRunning}
        aria-label={isRunning ? "Pause stopwatch" : "Start stopwatch"}
      >
        {isRunning ? "Pause" : "Start"}
      </MotionButton>

      <MotionButton
        type="button"
        {...secondaryMotion}
        onClick={recordLap}
        disabled={ ! isRunning}
        className={`${styles.button} ${styles.secondary}`}
        aria-label="Record lap"
      >
        Lap
      </MotionButton>

      <MotionButton
        type="button"
        {...secondaryMotion}
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
