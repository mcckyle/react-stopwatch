//File name: StopwatchControls.jsx
//Author: Kyle McColgan
//Date: 12 January 2026
//Description: This file contains the stopwatch controls component for the React stopwatch project.

import React from "react";
import { Button } from "@mantine/core";
import { motion } from "motion/react";

import styles from "./StopwatchControls.module.css";

const MotionButton = motion.create(Button);

const buttonMotion = {
  whileHover: { scale: 1.008 },
  whileTap: { scale: 0.94 },
  transition: { type: "spring", stiffness: 150, damping: 32, mass: 0.8, },
};

const StopwatchControls = ({ isRunning, toggle, reset, recordLap }) => {
  return (
    <div
      className={styles.controls}
      role="group"
      aria-label="Stopwatch controls"
    >
      <MotionButton
        {...buttonMotion}
        onClick={toggle}
        className={`${styles.button} ${styles.primary}`}
        aria-pressed={isRunning}
      >
        {isRunning ? "Pause" : "Start"}
      </MotionButton>

      <MotionButton
        {...buttonMotion}
        onClick={recordLap}
        disabled={!isRunning}
        className={`${styles.button} ${styles.secondary}`}
      >
        Lap
      </MotionButton>

      <MotionButton
        {...buttonMotion}
        onClick={reset}
        className={`${styles.button} ${styles.tertiary}`}
      >
        Reset
      </MotionButton>
    </div>
  );
};

export default StopwatchControls;
