//File name: useKeyboardShortcuts.js
//Author: Kyle McColgan
//Date: 9 October 2026
//Description: This file contains the keyboard shortcut implememtation for the stopwatch React project.

import { useEffect } from "react";

function isEditableTarget(target)
{
    if (!(target instanceof HTMLElement))
    {
        return false;
    }

    return (
        target.isContentEditable ||
        target.closest(
            'input, textarea, select, [contenteditable="true"], [contenteditable="false"]'
        ) !== null
    );
}

export function useKeyboardShortcuts({ onToggle, onReset, onLap, onOpenHelp }) {
    useEffect(() =>
    {
        const handleKeyDown = (event) =>
        {
            //Ignore IME composition (important for international inputs).
            if ((event.defaultPrevented) || (event.isComposing) || (event.repeat))
            {
                return;
            }

            if ((event.metaKey) || (event.ctrlKey) || (event.altKey))
            {
                return;
            }

            const target = event.target;

            //Ignore typing contexts.
            if (isEditableTarget(target))
            {
                return;
            }

            if ((target instanceof HTMLElement) && (target.closest('[role="dialog"]')))
            {
                return;
            }

            switch (event.code)
            {
                case "Space":
                {
                    event.preventDefault(); //Prevent page scroll.
                    onToggle();
                    break;
                }
                case "KeyL":
                {
                    onLap();
                    break;
                }
                case "KeyR":
                {
                    onReset();
                    break;
                }
                case "Slash":
                {
                    //Shift + / -> ?
                    if ((event.shiftKey) || (event.key === "?"))
                    {
                        event.preventDefault();
                        onOpenHelp();
                    }
                    break;
                }
                default:
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onToggle, onReset, onLap, onOpenHelp]);
}
