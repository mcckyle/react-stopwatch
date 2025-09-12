//File name: AnimatedDigit.jsx
//Author: Kyle McColgan
//Date: 12 September 2025
//Description: This file contains the digits component for the React timer project.

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from "./AnimatedDigit.module.css";
import { useTheme } from "../../hooks/useTheme";

function AnimatedDigit({ value })
{
  const { theme } = useTheme();

  return (
    <div className = {`${styles.digitContainer} ${theme}`}>
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ y: -28, opacity: 0, scale: 0.94 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 28, opacity: 0, scale: 1.02 }}
            transition={{
              type: "spring",
              stiffness: 170,
              damping: 18,
              mass: 0.9

            }}
            className={styles.digit}
          >
            {value}
          </motion.span>
        </AnimatePresence>
    </div>
  );
}

export default AnimatedDigit;
