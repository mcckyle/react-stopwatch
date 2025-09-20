//File name: AnimatedDigit.jsx
//Author: Kyle McColgan
//Date: 17 September 2025
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
            initial={{ y: -24, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 1.03 }}
            transition={{
              type: "spring",
              stiffness: 160,
              damping: 20,
              mass: 1,
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
