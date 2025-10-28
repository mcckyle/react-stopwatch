//File name: StopwatchDisplay.jsx
//Author: Kyle McColgan
//Date: 26 October 2025
//Description: This file contains the stopwatch display component for the React stopwatch project.

import React from "react";
import AnimatedDigit from "../AnimatedDigit/AnimatedDigit.jsx";
import { formatTime } from "../../utils/formatTime";

import styles from "./StopwatchDisplay.module.css";

const StopwatchDisplay = ({ time }) => {
  const { hours, minutes, seconds} = formatTime(time);

  const renderDigits = (label, value) =>
    [...value].map((digit, index) => (
      <AnimatedDigit key={`${label}-${index}`} value={Number(digit)} />
    ));

  return (
    <div className = {styles.wrapper}>
      <time className={styles.time} role="timer" aria-live="polite">
        {renderDigits("hr", hours)}
        <span className={styles.separator}>:</span>
        {renderDigits("min", minutes)}
        <span className={styles.separator}>:</span>
        {renderDigits("sec", seconds)}
      </time>
    </div>
  );
};

export default StopwatchDisplay;
