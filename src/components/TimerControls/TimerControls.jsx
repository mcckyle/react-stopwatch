//File name: TimerControls.jsx
//Author: Kyle McColgan
//Date: 15 October 2025
//Description: This file contains the timer controls component for the React timer project.

import React from "react";
import { Button } from "@mantine/core";
import { motion } from "motion/react";
import { useTheme } from "../../context/ThemeContext.jsx";

import styles from "./TimerControls.module.css";

const MotionButton = motion.create(Button);

const TimerControls = ({ isRunning, toggle, reset, recordLap, children }) => {
  const { theme } = useTheme();

  const motionProps = {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 200, damping: 16 },
  };

  return (
    <div className={`${styles.controls} ${theme}`}>
      {children}

      <MotionButton
        {...motionProps}
        onClick={toggle}
        className={`${styles.button} ${isRunning ? styles.pause : styles.start}`}
      >
        {isRunning ? "Pause" : "Start"}
      </MotionButton>

      <MotionButton
        {...motionProps}
        onClick={recordLap}
        disabled={!isRunning}
        className={`${styles.button} ${styles.lap}`}
      >
        Lap
      </MotionButton>

      <MotionButton
        {...motionProps}
        onClick={reset}
        className={`${styles.button} ${styles.reset}`}
      >
        Reset
      </MotionButton>
    </div>
  );
};

export default TimerControls;
