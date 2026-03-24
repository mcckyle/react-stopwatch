//File name: AnimatedDigit.jsx
//Author: Kyle McColgan
//Date: 22 March 2026
//Description: This file contains the digits component for the stopwatch React project.

import React from "react";
import styles from "./AnimatedDigit.module.css";

const AnimatedDigit = ({ value, isCenti = false }) => {
  const className = isCenti
    ? `${styles.digit} ${styles.centi}`
    : styles.digit;

  return (
    <span className={className} aria-hidden="true">
      <span key={value} className={styles.value}>
        {value}
      </span>
    </span>
  );
};

export default AnimatedDigit;
