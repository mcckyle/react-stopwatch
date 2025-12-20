//File name: StopwatchControls.jsx
//Author: Kyle McColgan
//Date: 19 December 2025
//Description: This file contains the stopwatch controls component for the React stopwatch project.

import React from "react";
import { Button } from "@mantine/core";
import { motion } from "motion/react";

import styles from "./StopwatchControls.module.css";

const MotionButton = motion.create(Button);

const StopwatchControls = ({ isRunning, toggle, reset, recordLap }) => {

  const motionProps = {
    whileHover: { scale: 1.015 },
    whileTap: { scale: 0.96 },
    transition: { type: "spring", stiffness: 240, damping: 28, mass: 0.55, },
  };

  return (
    <div
      className={styles.controls}
      role="group"
      aria-label="Stopwatch controls"
    >
      <MotionButton
        {...motionProps}
        onClick={toggle}
        data-variant="primary"
        className={styles.button}
        aria-pressed={isRunning}
      >
        {isRunning ? "Pause" : "Start"}
      </MotionButton>

      <MotionButton
        {...motionProps}
        onClick={recordLap}
        disabled={!isRunning}
        data-variant="secondary"
        className={styles.button}
      >
        Lap
      </MotionButton>

      <MotionButton
        {...motionProps}
        onClick={reset}
        data-variant="tertiary"
        className={styles.button}
      >
        Reset
      </MotionButton>
    </div>
  );
};

export default StopwatchControls;
