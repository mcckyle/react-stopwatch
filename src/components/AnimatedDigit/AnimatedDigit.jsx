//File name: AnimatedDigit.jsx
//Author: Kyle McColgan
//Date: 19 January 2026
//Description: This file contains the digits component for the React stopwatch project.

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./AnimatedDigit.module.css";

const transition = { type: "spring", stiffness: 140, damping: 34, mass: 0.9, };

const AnimatedDigit = ({ value }) => (
  <span className={styles.container} aria-hidden="true">
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={value}
        className={styles.digit}
        initial={{ y: "-0.12em", opacity: 0 }}
        animate={{ y: "0em", opacity: 1 }}
        exit={{ y: "0.12em", opacity: 0 }}
        transition={transition}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  </span>
);

export default AnimatedDigit;
