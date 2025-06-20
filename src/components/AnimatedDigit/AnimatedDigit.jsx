//File name: AnimatedDigit.jsx
//Author: Kyle McColgan
//Date: 19 June 2025
//Description: This file contains the Digits component for the React timer site.

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from "./AnimatedDigit.module.css";
import { useTheme } from "../../hooks/useTheme";

function AnimatedDigit({ value })
{
  const theme = useTheme();
  //const themeClass = theme === 'light' ? 'light' : 'dark';

  return (
    <div className = {theme}>
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
      </div>
  );
}

export default AnimatedDigit;
