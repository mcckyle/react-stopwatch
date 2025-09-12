//File name: TimerControls.jsx
//Author: Kyle McColgan
//Date: 12 September 2025
//Description: This file contains the timer controls component for the React timer project.

import React from "react";
import { Button } from "@mantine/core";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import styles from "./TimerControls.module.css";

const MotionButton = motion(Button);

const TimerControls = ({ isRunning, toggle, reset, recordLap, children }) => {

  const { theme } = useTheme();

  const commonProps = {
    size: "lg",
    radius: "xl",
    className: styles.button,
    whileHover: { scale: 1.06 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 220, damping: 18 }
  };

  return (
      <div className = {`${styles.controls} ${theme}`}>
        {children}

        <MotionButton
            {...commonProps}
            onClick={toggle}
            className={`${styles.button} ${isRunning ? styles.pause : styles.start}`}
            aria-label={isRunning ? "Pause timer" : "Start timer"}
        >
                {isRunning ? "Pause" : "Start"}
        </MotionButton>

        <MotionButton
            {...commonProps}
            onClick={recordLap}
            disabled={!isRunning}
            className={`${styles.button} ${styles.lap}`}
            aria-label="Record lap time"
        >
                Lap
        </MotionButton>

        <MotionButton
            {...commonProps}
            onClick={reset}
            className={`${styles.button} ${styles.reset}`}
            aria-label="Reset timer"
        >
            Reset
        </MotionButton>
      </div>
    );
};

export default TimerControls;
