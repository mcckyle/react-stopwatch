//File name: HelpModal.jsx
//Author: Kyle McColgan
//Date: 2 March 2026
//Description: This file contains the Help modal component for the React stopwatch project.

import React, { useEffect } from "react";
import styles from "./HelpModal.module.css";

const HelpModal = ({ onClose }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className={styles.root}>
      <div className={styles.overlay} onClick={onClose}>
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="help-modal-title"
          onClick={(e) => e.stopPropagation()}
        >
          <header className={styles.header}>
            <h2 id="help-modal-title" className={styles.title}>
              Keyboard Shortcuts
            </h2>
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
            type="button"
            className={styles.closeButton}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
