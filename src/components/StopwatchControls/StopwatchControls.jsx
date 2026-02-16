//File name: StopwatchControls.jsx
//Author: Kyle McColgan
//Date: 15 February 2026
//Description: This file contains the stopwatch controls component for the React stopwatch project.

import React from "react";
import { Button } from "@mantine/core";
import { motion, useReducedMotion } from "motion/react";

import styles from "./StopwatchControls.module.css";

const MotionButton = motion.create(Button);

const StopwatchControls = ({ isRunning, toggle, reset, recordLap }) => {
  const prefersReducedMotion = useReducedMotion();

  const motionProps = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: { type: "spring", stiffness: 320, damping: 28, },
      };

  return (
    <div
      className={styles.controls}
      role="group"
      aria-label="Stopwatch controls"
    >
      <MotionButton
        type="button"
        radius="xl"
        {...motionProps}
        onClick={toggle}
        className={`${styles.button} ${styles.primary}`}
        aria-pressed={isRunning}
        aria-label={isRunning ? "Pause stopwatch" : "Start stopwatch"}
      >
        {isRunning ? "Pause" : "Start"}
      </MotionButton>

      <MotionButton
        type="button"
        radius="xl"
        {...motionProps}
        onClick={recordLap}
        disabled={ ! isRunning}
        className={`${styles.button} ${styles.secondary}`}
        aria-label="Record lap"
      >
        Lap
      </MotionButton>

      <MotionButton
        type="button"
        radius="xl"
        {...motionProps}
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
