//File name: HelpModal.jsx
//Author: Kyle McColgan
//Date: 25 November 2026
//Description: This file contains the Help modal component for the stopwatch React project.

import React, { useEffect, useId, useRef } from "react";
import styles from "./HelpModal.module.css";

const shortcuts = Object.freeze([
  { label: "Start / Pause", keyLabel: "Space" },
  { label: "Record Lap", keyLabel: "L" },
  { label: "Reset", keyLabel: "R" },
  { label: "Open Help", keyLabel: "Shift + ?" }
]);

const FOCUSABLE_SELECTOR = [
  "button:not(:disabled)",
  "[href]",
  "input:not(:disabled)",
  "select:not(:disabled)",
  "textarea:not(:disabled)",
  '[tabindex]:not([tabindex="-1"])'
].join(", ");

const HelpModal = ({ onClose }) =>
{
  const modalRef = useRef(null);
  const closeRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  const titleId = useId();
  const descriptionId = useId();

  useEffect(() =>
  {
    const modal = modalRef.current;
    const appContent = document.querySelector("main");

    //Preserve the existing application state.
    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    const previousInert = appContent?.inert ?? false;

    //Prevent interaction with the background.
    document.body.style.overflow = "hidden";

    if (appContent)
    {
      appContent.inert = true;
    }

    //Return visible, enabled focusable elements.
    const getFocusableElements = () =>
      Array.from(
        modal?.querySelectorAll(FOCUSABLE_SELECTOR) ?? []
      ).filter(element =>
        element instanceof HTMLElement &&
        element.getClientRects().length > 0
      );

    const handleKeyDown = event =>
    {
      if ((event.isComposing) || (event.defaultPrevented))
      {
        return;
      }

      //Close the dialog with Escape.
      if (event.key === "Escape")
      {
        event.preventDefault();
        onClose();
        return;
      }

      if ((event.key !== "Tab") || (!modal))
      {
        return;
      }

      const elements = getFocusableElements();

      if (!elements.length)
      {
        event.preventDefault();
        modal.focus();
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey)
      {
        if ((activeElement === first) || (!modal.contains(activeElement)))
        {
          event.preventDefault();
          last.focus();
        }
      }
      else if ((activeElement === last) || (!modal.contains(activeElement)))
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

      //Restore the application environment.
      document.body.style.overflow = previousOverflow;
      if (appContent)
      {
        appContent.inert = previousInert;
      }

      //Return focus to the previously active element.
      const previouslyFocused = previouslyFocusedRef.current;
      if (previouslyFocused?.isConnected)
      {
        previouslyFocused.focus();
      }
    };
  }, [onClose]);

  //Close the modal when clicking the backdrop.
  const handleOverlayClick = event =>
  {
    if (event.target === event.currentTarget)
    {
      onClose();
    }
  };

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onClick={handleOverlayClick}
    >
      <section
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
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
