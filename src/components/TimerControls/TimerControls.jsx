//File name: TimerControls.jsx
//Author: Kyle McColgan
//Date: 09 June 2025
//Description: This file contains the Timer controls component for the react timer.

import React from "react";
import { Button } from "@mantine/core";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import styles from "./TimerControls.module.css";

const TimerControls = ({ isRunning, toggle, reset, children, recordLap }) => {

  const theme = useTheme();
  const isLight = theme === "light";

  const commonProps = {
    size: "lg",
    radius: "xl",
  };

  const getButtonProps = (type) => {
    const config = {
        start: {
            color: "yellow",
            gradient: { from: "#facc15", to: "#fde047", deg: 45 },
            textColor: isLight ? "#1e293b" : "#fefce8",
        },
        lap: {
            color: "grape",
            gradient: { from: "#7e22ce", to: "#8b5cf6", deg: 90 },
            textColor: "#f8fafc",
        },
        reset: {
            color: "red",
            gradient: { from: "#dc2626", to: "#f43f5e", deg: 90 },
            textColor: "#fff1f2",
        },
    };

    const {color, gradient, textColor } = config[type];

    return {
        variant: isLight ? "filled" : "gradient",
        color,
        gradient: !isLight ? gradient : undefined,
        style: {
            root: {
                color: textColor,
                fontWeight: 500,
            },
        },
    };
  };


  return (
      <div className={styles.controls}>
          {children}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                    {...commonProps}
                    onClick={toggle}
                    {...getButtonProps("start")}
                    >
                        {isRunning ? "Pause" : "Start"}
                </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                    {...commonProps}
                    onClick={recordLap}
                    disabled={!isRunning}
                    {...getButtonProps("lap")}
                    >
                        Lap
                </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                    {...commonProps}
                    onClick={reset}
                    {...getButtonProps("reset")}
                >
                    Reset
                </Button>
            </motion.div>
      </div>
    );
};

export default TimerControls;
