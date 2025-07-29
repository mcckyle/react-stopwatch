//File name: AnimatedDigit.jsx
//Author: Kyle McColgan
//Date: 28 July 2025
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
              initial={{ y: -40, opacity: 0, scale: 0.92 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 1.04 }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 22

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
