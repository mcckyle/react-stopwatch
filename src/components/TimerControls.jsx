// src/components/TimerControls.jsx

import React from "react";
import { Button } from "@mantine/core";
import { motion } from "framer-motion";
import styles from "./TimerControls.module.css";

const TimerControls = ({ isRunning, toggle, reset, children }) => {
  return (
      <div className={styles.box}>
          {children}
          <div className={styles.buttons}>
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
                        gradient={{ from: "red", to: "pink", deg: 90 }}
                        radius="xl"
                        onClick={reset}
                    >
                        Reset
                    </Button>
                </motion.div>
          </div>
      </div>
    );
};

export default TimerControls;
