//File name: AnimatedDigit.jsx
//Author: Kyle McColgan
//Date: 20 February 2026
//Description: This file contains the digits component for the React stopwatch project.

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import styles from "./AnimatedDigit.module.css";

const AnimatedDigit = ({ value }) => {
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.18, ease: [0.22, 1, 0.36, 1] };
  const variants = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { y: "-0.06em", opacity: 0 },
        animate: { y: "0em", opacity: 1 },
        exit: { y: "0.06em", opacity: 0 },
      };

  return (
    <span className={styles.container} aria-hidden="true">
      <AnimatePresence initial={false}>
        <motion.span
          key={value}
          className={styles.digit}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default AnimatedDigit;
