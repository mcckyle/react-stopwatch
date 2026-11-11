//File name: useKeyboardShortcuts.js
//Author: Kyle McColgan
//Date: 10 November 2026
//Description: This file contains the keyboard shortcut implememtation for the stopwatch React project.

import { useEffect } from "react";

const EDITABLE_SELECTOR = [
    "input",
    "textarea",
    "select",
    '[contenteditable="true"]',
    '[contenteditable="false"]'
].join(", ");

function isEditableTarget(target)
{
    if (!(target instanceof HTMLElement))
    {
        return false;
    }

    return ((target.isContentEditable) || (target.closest(EDITABLE_SELECTOR) !== null));
}

function isDialogTarget(target)
{
    return ((target instanceof HTMLElement) && (target.closest('[role="dialog"]') !== null));
}

export function useKeyboardShortcuts({ onToggle, onReset, onLap, onOpenHelp }) {
    useEffect(() =>
    {
        const handleKeyDown = (event) =>
        {
            //Ignore IME composition (important for international inputs).
            if ((event.defaultPrevented) || (event.repeat) || (event.isComposing))
            {
                return;
            }

            if ((event.metaKey) || (event.ctrlKey) || (event.altKey))
            {
                return;
            }

            const { target } = event;

            //Respect text editing and dialog interactions.
            if ((isEditableTarget(target) || (isDialogTarget(target))))
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
                default:
                {
                    if (event.key === "?")
                    {
                        event.preventDefault();
                        onOpenHelp();
                    }
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onToggle, onReset, onLap, onOpenHelp]);
}
