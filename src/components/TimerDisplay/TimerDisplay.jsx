//File name: TimerDisplay.jsx
//Author: Kyle McColgan
//Date: 24 September 2025
//Description: This file contains the timer display component for the React timer project.

import React from "react";
import AnimatedDigit from "../AnimatedDigit/AnimatedDigit.jsx";
import { formatTime } from "../../utils/formatTime";

import styles from "./TimerDisplay.module.css";

const TimerDisplay = ({ time }) => {
  const { hours, minutes, seconds} = formatTime(time);

  const renderDigits = (label, value) =>
    [...value].map((digit, index) => (
      <AnimatedDigit key={`${label}-${index}`} value={parseInt(digit, 10)} />
    ));

  return (
    <div className = {styles.wrapper}>
       <time className={styles.text} role="timer" aria-live="polite">
         {renderDigits("hr", hours)}
         <span className={styles.colon} aria-hidden="true">:</span>
         {renderDigits("min", minutes)}
         <span className={styles.colon} aria-hidden="true">:</span>
         {renderDigits("sec", seconds)}
       </time>
    </div>
  );
};

export default TimerDisplay;
