//File name: TimerDisplay.jsx
//Author: Kyle McColgan
//Date: 06 June 2025
//Description: This file contains the Timer display component for the React timer site.

import React from "react";
import AnimatedDigit from "../AnimatedDigit/AnimatedDigit.jsx";
import styles from "./TimerDisplay.module.css";
import { formatTime } from "../../utils/formatTime";

const TimerDisplay = ({ time }) => {
  const { hours, minutes, seconds} = formatTime(time);

  return (
    <div className={styles.text}>
        {[...hours].map((digit, i) => (
            <AnimatedDigit key={`hr-${i}`} value={parseInt(digit)} />
        ))}
        <span className={styles.colon}>:</span>
        {[...minutes].map((digit, i) => (
            <AnimatedDigit key={`min-${i}`} value={parseInt(digit)} />
        ))}
        <span className={styles.colon}>:</span>
        {[...seconds].map((digit, i) => (
            <AnimatedDigit key={`sec-${i}`} value={parseInt(digit)} />
        ))}
    </div>
  );
};

export default TimerDisplay;
