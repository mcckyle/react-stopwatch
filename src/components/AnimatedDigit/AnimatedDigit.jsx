//File name: AnimatedDigit.jsx
//Author: Kyle McColgan
//Date: 28 December 2025
//Description: This file contains the digits component for the React timer project.

import React from "react";
import { motion, AnimatePresence } from "motion/react";

import styles from "./AnimatedDigit.module.css";

const transition = { type: "spring", stiffness: 180, damping: 26, mass: 0.55, };

const AnimatedDigit = ({ value }) => (
  <span className={styles.container} aria-hidden="true">
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={value}
        className={styles.digit}
        initial={{ y: "-0.08em", opacity: 0 }}
        animate={{ y: "0em", opacity: 1 }}
        exit={{ y: "0.08em", opacity: 0 }}
        transition={transition}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  </span>
);

export default AnimatedDigit;
