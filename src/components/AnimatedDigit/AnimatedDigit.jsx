//File name: AnimatedDigit.jsx
//Author: Kyle McColgan
//Date: 09 June 2025
//Description: This file contains the Digits component for the React timer site.

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from "./AnimatedDigit.module.css";

function AnimatedDigit({ value }) {
  return (
    <div className={styles.digitContainer}>
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ y: -20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
          className={styles.digit}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default AnimatedDigit;
