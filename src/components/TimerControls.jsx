// src/components/TimerControls.jsx

import React from "react";
import { Button } from "@mantine/core";
import { motion } from "framer-motion";
import styles from "./TimerControls.module.css";

const TimerControls = ({ isRunning, toggle, reset, children, recordLap }) => {
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
                    >
                        {isRunning ? "Pause" : "Start"}
                </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                    size="lg"
                    variant="gradient"
                    gradient={{ from: "blue", to: "violet", deg: 90 }}
                    radius="xl"
                    onClick={() => recordLap()}
                    disabled={!isRunning}
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
                >
                    Reset
                </Button>
            </motion.div>
      </div>
    );
};

export default TimerControls;
