//File name: AnimatedDigit.jsx
//Author: Kyle McColgan
//Date: 26 December 2025
//Description: This file contains the digits component for the React timer project.

import React from "react";
import { motion, AnimatePresence } from "motion/react";

import styles from "./AnimatedDigit.module.css";

const AnimatedDigit = ({ value }) => (
  <span className={styles.container} aria-hidden="true">
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={value}
        className={styles.digit}
        initial={{ y: "-0.06em", opacity: 0 }}
        animate={{ y: "0em", opacity: 1 }}
        exit={{ y: "0.06em", opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 30, mass: 0.6, }}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  </span>
);

export default AnimatedDigit;
