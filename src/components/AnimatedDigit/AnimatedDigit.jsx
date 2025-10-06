//File name: AnimatedDigit.jsx
//Author: Kyle McColgan
//Date: 4 October 2025
//Description: This file contains the digits component for the React timer project.

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./AnimatedDigit.module.css";

const AnimatedDigit = ({ value }) => (

  <div className = {styles.container}>
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          className={styles.digit}
          aria-hidden="true"
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 16, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
  </div>
);

export default AnimatedDigit;
