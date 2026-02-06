//File name: AnimatedDigit.jsx
//Author: Kyle McColgan
//Date: 4 February 2026
//Description: This file contains the digits component for the React stopwatch project.

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import styles from "./AnimatedDigit.module.css";

const AnimatedDigit = ({ value }) => {
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion
    ? { duration: 0.08, ease: "linear"}
    : { type: "spring", stiffness: 190, damping: 30, mass: 0.85, };

  return (
    <span className={styles.container} aria-hidden="true">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          layout="position"
          className={styles.digit}
          initial={{ y: "-0.035em", opacity: 0 }}
          animate={{ y: "0em", opacity: 1 }}
          exit={{ y: "0.035em", opacity: 0 }}
          transition={transition}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default AnimatedDigit;
