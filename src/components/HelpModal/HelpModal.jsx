//File name: HelpModal.jsx
//Author: Kyle McColgan
//Date: 21 March 2026
//Description: This file contains the Help modal component for the stopwatch React project.

import React, { useEffect, useId, useRef } from "react";
import styles from "./HelpModal.module.css";

const shortcuts = [
  { label: "Start / Pause", keyLabel: "Space" },
  { label: "Record Lap", keyLabel: "L" },
  { label: "Reset", keyLabel: "R" },
  { label: "Show Help", keyLabel: "Shift + ?" }
];

const HelpModal = ({ onClose }) =>
{
  const closeRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() =>
  {
    const handleKeyDown = (event) =>
    {
      if (event.key === "Escape")
      {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    closeRef.current?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose} aria-hidden="true">
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <p className={styles.eyebrow}>Keyboard shortcuts</p>
          <h2 id={titleId} className={styles.title}>
            Move faster without touching the mouse
          </h2>
          <p id={descriptionId} className={styles.subtitle}>
            Quick controls for running, lapping, resetting, and reopening help.
          </p>
        </header>

        <ul className={styles.list}>
          {shortcuts.map(({ label, keyLabel }) => (
            <li key={label} className={styles.item}>
              <span className={styles.label}>{label}</span>
              <kbd className={styles.kbd}>{keyLabel}</kbd>
            </li>
          ))}
        </ul>
        <button
          ref={closeRef}
          type="button"
          role="button"
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
