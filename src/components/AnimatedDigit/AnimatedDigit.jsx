//File name: AnimatedDigit.jsx
//Author: Kyle McColgan
//Date: 29 September 2025
//Description: This file contains the digits component for the React timer project.

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import styles from "./AnimatedDigit.module.css";

function AnimatedDigit({ value })
{
  return (
    <div className = {styles.digitContainer}>
        <AnimatePresence mode="wait">
          <motion.span
            aria-hidden="true"
            key={value}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className={styles.digit}
          >
            {value}
          </motion.span>
        </AnimatePresence>
    </div>
  );
}

export default AnimatedDigit;
