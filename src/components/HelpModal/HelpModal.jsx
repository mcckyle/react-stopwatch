//File name: HelpModal.jsx
//Author: Kyle McColgan
//Date: 10 March 2026
//Description: This file contains the Help modal component for the stopwatch React project.

import React, { useEffect, useRef } from "react";
import styles from "./HelpModal.module.css";

const HelpModal = ({ onClose }) => {
  const closeRef = useRef(null);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    closeRef.current?.focus();

    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-title"
        aria-describedby="help-description"
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.header}>
          <h2 id="help-title" className={styles.title}>
            Keyboard Shortcuts
          </h2>
          <p id="help-description" className={styles.subtitle}>
            Control the stopwatch instantly.
          </p>
        </header>

        <ul className={styles.list}>
          <li className={styles.item}>
            <span>Start / Pause</span>
            <kbd className={styles.kbd}>Space</kbd>
          </li>

          <li className={styles.item}>
            <span>Record Lap</span>
            <kbd className={styles.kbd}>L</kbd>
          </li>

          <li className={styles.item}>
            <span>Reset</span>
            <kbd className={styles.kbd}>R</kbd>
          </li>

          <li className={styles.item}>
            <span>Show Help</span>
            <kbd className={styles.kbd}>Shift + ?</kbd>
          </li>
        </ul>
        <button
          ref={closeRef}
          type="button"
          aria-label="Close help dialog"
          className={styles.closeButton}
          onClick={onClose}
        >
          Close
        </button>
      </section>
    </div>
  );
};

export default HelpModal;
