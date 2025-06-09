//File name: AnimatedDigit.jsx
//Author: Kyle McColgan
//Date: 06 June 2025
//Description: This file contains the Digits component for the React timer site.

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from "./AnimatedDigit.module.css";

function AnimatedDigit({ value, color = "f1f5f9" }) {
  return (
    <div className={styles.digitContainer}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={value}
          style = {{ color }}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={styles.digit}
        >
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default AnimatedDigit;
