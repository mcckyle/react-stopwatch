//File name: AnimatedDigit.jsx
//Author: Kyle McColgan
//Date: 2 February 2026
//Description: This file contains the digits component for the React stopwatch project.

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import styles from "./AnimatedDigit.module.css";

const transition = { type: "spring", stiffness: 180, damping: 28, mass: 0.9, };

const AnimatedDigit = ({ value }) => {
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion
    ? { duration: 0.12, ease: "linear"}
    : { type: "spring", stiffness: 160, damping: 26, mass: 1, };

  return (
    <span className={styles.container} aria-hidden="true">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          layout="position"
          className={styles.digit}
          initial={{ y: "-0.04em", opacity: 0 }}
          animate={{ y: "0em", opacity: 1 }}
          exit={{ y: "0.04em", opacity: 0 }}
          transition={transition}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default AnimatedDigit;
