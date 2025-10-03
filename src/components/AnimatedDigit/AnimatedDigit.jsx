//File name: AnimatedDigit.jsx
//Author: Kyle McColgan
//Date: 3 October 2025
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
            key={value}
            aria-hidden="true"
            className={styles.digit}
            initial={{ y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 18, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
    </div>
  );
}

export default AnimatedDigit;
