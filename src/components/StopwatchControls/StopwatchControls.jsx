//File name: StopwatchControls.jsx
//Author: Kyle McColgan
//Date: 28 December 2025
//Description: This file contains the stopwatch controls component for the React stopwatch project.

import React from "react";
import { Button } from "@mantine/core";
import { motion } from "motion/react";

import styles from "./StopwatchControls.module.css";

const MotionButton = motion.create(Button);

const buttonMotion = {
  whileHover: { scale: 1.015 },
  whileTap: { scale: 0.96 },
  transition: { type: "spring", stiffness: 190, damping: 26, mass: 0.6, },
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
        className={styles.button}
        data-variant="primary"
        aria-pressed={isRunning}
      >
        {isRunning ? "Pause" : "Start"}
      </MotionButton>

      <MotionButton
        {...buttonMotion}
        onClick={recordLap}
        disabled={!isRunning}
        className={styles.button}
        data-variant="secondary"
      >
        Lap
      </MotionButton>

      <MotionButton
        {...buttonMotion}
        onClick={reset}
        className={styles.button}
        data-variant="tertiary"
      >
        Reset
      </MotionButton>
    </div>
  );
};

export default StopwatchControls;
