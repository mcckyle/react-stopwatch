//File name: HelpModal.jsx
//Author: Kyle McColgan
//Date: 9 October 2026
//Description: This file contains the Help modal component for the stopwatch React project.

import React, { useEffect, useId, useRef } from "react";
import styles from "./HelpModal.module.css";

const shortcuts = Object.freeze([
  { label: "Start / Pause", keyLabel: "Space" },
  { label: "Record Lap", keyLabel: "L" },
  { label: "Reset", keyLabel: "R" },
  { label: "Open Help", keyLabel: "Shift + ?" }
]);

const HelpModal = ({ onClose }) =>
{
  const closeRef = useRef(null);
  const modalRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  const titleId = useId();
  const descriptionId = useId();

  useEffect(() =>
  {
    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const modal = modalRef.current;

    const handleKeyDown = event =>
    {
      if ((event.key === "Escape") && (!event.isComposing))
      {
        event.preventDefault();
        event.stopPropagation();
        onClose();
        return;
      }

      if ((event.key !== "Tab") || (!modal))
      {
        return;
      }

      const focusable = modal.querySelectorAll(
        'button:not(:disabled), [href], input:not(:disabled), ' +
        'select:not(:disabled), textarea:not(:disabled), ' +
        '[tabindex]:not([tabindex="-1"])'
      );

      const elements = Array.from(focusable).filter(element =>
        element instanceof HTMLElement &&
        element.getClientRects().length > 0
      );

      const first = elements[0];
      const last = elements[elements.length - 1];

      if ((event.shiftKey) && (document.activeElement === first))
      {
        event.preventDefault();
        last.focus();
      }
      else if ((!event.shiftKey) && (document.activeElement === last))
      {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    closeRef.current?.focus();

    return () =>
    {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus?.();
    }
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <section
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        onClick={event => event.stopPropagation()}
      >
        <header className={styles.header}>
          <div className={styles.heading}>
            <p className={styles.eyebrow}>Shortcuts</p>
            <h2 id={titleId} className={styles.title}>
              Keyboard Shortcuts
            </h2>
          </div>
          <p id={descriptionId} className={styles.subtitle}>
            Control the stopwatch without leaving the keyboard.
          </p>
        </header>

        <ul className={styles.list} aria-label="Keyboard shortcuts">
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
