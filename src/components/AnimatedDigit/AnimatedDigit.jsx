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

  return (
    <div className = {theme}>
        <div className={styles.digitContainer}>
          <AnimatePresence mode="wait">
            <motion.span
              key={value}
              initial={{ y: -50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 1.05 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 1, 0.5, 1]

              }}
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
