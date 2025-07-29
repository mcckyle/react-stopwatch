//File name: TimerControls.jsx
//Author: Kyle McColgan
//Date: 19 June 2025
//Description: This file contains the Timer controls component for the react timer.

import React from "react";
import { Button } from "@mantine/core";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import styles from "./TimerControls.module.css";

const TimerControls = ({ isRunning, toggle, reset, children, recordLap }) => {

  const theme = useTheme();

  const commonProps = {
    size: "lg",
    radius: "xl",
  };

  return (
      <div className = {theme}>
            <div className={styles.controls}>
                {children}
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            {...commonProps}
                            onClick={toggle}
                            className={`${styles.button} ${isRunning ? styles.pause : styles.start}`}
                            aria-label={isRunning ? "Pause timer" : "Start timer"}
                            >
                                {isRunning ? "Pause" : "Start"}
                        </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            {...commonProps}
                            onClick={recordLap}
                            disabled={!isRunning}
                            className={`${styles.button} ${styles.lap}`}
                            aria-label="Record lap time"
                            >
                                Lap
                        </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            {...commonProps}
                            onClick={reset}
                            className={`${styles.button} ${styles.reset}`}
                            aria-label="Reset timer"
                        >
                            Reset
                        </Button>
                    </motion.div>
            </div>
        </div>
    );
};

export default TimerControls;
