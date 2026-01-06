//File name: StopwatchControls.jsx
//Author: Kyle McColgan
//Date: 5 January 2026
//Description: This file contains the stopwatch controls component for the React stopwatch project.

import React from "react";
import { Button } from "@mantine/core";
import { motion } from "motion/react";

import styles from "./StopwatchControls.module.css";

const MotionButton = motion.create(Button);

const buttonMotion = {
  whileHover: { scale: 1.01 },
  whileTap: { scale: 0.965 },
  transition: { type: "spring", stiffness: 170, damping: 30, mass: 0.65, },
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
        className={styles.primary}
        aria-pressed={isRunning}
      >
        {isRunning ? "Pause" : "Start"}
      </MotionButton>

      <MotionButton
        {...buttonMotion}
        onClick={recordLap}
        disabled={!isRunning}
        className={styles.secondary}
      >
        Lap
      </MotionButton>

      <MotionButton
        {...buttonMotion}
        onClick={reset}
        className={styles.tertiary}
      >
        Reset
      </MotionButton>
    </div>
  );
};

export default StopwatchControls;
