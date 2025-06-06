//File name: TimerControls.jsx
//Author: Kyle McColgan
//Date: 05 June 2025
//Description: This file contains the Timer controls component for the React timer site.

import React from "react";
import { Button } from "@mantine/core";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import styles from "./TimerControls.module.css";

const TimerControls = ({ isRunning, toggle, reset, children, recordLap }) => {

  const theme = useTheme();

  const lapGradient = theme === "light"
    ? { from: "indigo", to: "purple", deg: 90 }
    : { from: "blue", to: "violet", deg: 90 };


  return (
      <div className={styles.controls}>
          {children}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                    size="lg"
                    variant="gradient"
                    gradient={{ from: "lime", to: "teal", deg: 90 }}
                    radius="xl"
                    onClick={toggle}
                    styles={{
                        root: {
                            color: 'var(--button-text-color)',
                        },
                    }}
                    >
                        {isRunning ? "Pause" : "Start"}
                </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                    size="lg"
                    variant="gradient"
                    gradient={lapGradient}
                    radius="xl"
                    onClick={() => recordLap()}
                    disabled={!isRunning}
                    styles={{
                        root: {
                            color: 'var(--button-text-color)',
                        },
                    }}
                    >
                        Lap
                </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                    size="lg"
                    variant="gradient"
                    gradient={{ from: "red", to: "pink", deg: 90 }}
                    radius="xl"
                    onClick={reset}
                    styles={{
                        root: {
                            color: 'var(--button-text-color)',
                        },
                    }}
                >
                    Reset
                </Button>
            </motion.div>
      </div>
    );
};

export default TimerControls;
