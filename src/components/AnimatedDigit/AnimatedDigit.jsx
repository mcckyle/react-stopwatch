//File name: AnimatedDigit.jsx
//Author: Kyle McColgan
//Date: 6 March 2026
//Description: This file contains the digits component for the stopwatch React project.

import React from "react";
import styles from "./AnimatedDigit.module.css";

const AnimatedDigit = ({ value, isCenti = false }) => {
  const className = `${styles.digitBase} ${isCenti ? styles.centi : styles.slot}`;

  return (
    <span className={className} aria-hidden="true">
      <span className={styles.value}>{value}</span>
    </span>
  );
};

export default AnimatedDigit;
