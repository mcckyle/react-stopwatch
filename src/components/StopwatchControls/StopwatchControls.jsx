//File name: StopwatchControls.jsx
//Author: Kyle McColgan
//Date: 27 February 2026
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
        whileHover: { scale: 1.015 },
        whileTap: { scale: 0.97 },
        transition: { duration: 0.14, ease: [0.4, 0, 0.2, 1] },
      };

  return (
    <div
      className={styles.controls}
      role="group"
      aria-label="Stopwatch controls"
    >
      <MotionButton
        variant="unstyled"
        type="button"
        {...motionProps}
        onClick={toggle}
        className={`${styles.button} ${styles.primary}`}
        aria-pressed={isRunning}
      >
        {isRunning ? "Pause" : "Start"}
      </MotionButton>

      <MotionButton
        variant="unstyled"
        type="button"
        {...motionProps}
        onClick={recordLap}
        disabled={!isRunning}
        className={`${styles.button} ${styles.secondary}`}
      >
        Lap
      </MotionButton>

      <MotionButton
        variant="unstyled"
        type="button"
        {...motionProps}
        onClick={reset}
        className={`${styles.button} ${styles.tertiary}`}
      >
        Reset
      </MotionButton>
    </div>
  );
};

export default StopwatchControls;
