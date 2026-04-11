//File name: useKeyboardShortcuts.js
//Author: Kyle McColgan
//Date: 8 April 2026
//Description: This file contains the keyboard shortcut implememtation for the stopwatch React project.

import { useEffect } from "react";

function isEditableTarget(target)
{
    if (!(target instanceof HTMLElement))
    {
        return false;
    }

    const tag = target.tagName;

    return (
        target.isContentEditable ||
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT"
    );
}

export function useKeyboardShortcuts({ onToggle, onReset, onLap, onOpenHelp }) {
    useEffect(() => {
        const handleKeyDown = (event) =>
        {
            //Ignore IME composition (important for international inputs).
            if (event.isComposing)
            {
                return;
            }

            //Ignore typing contexts.
            if (isEditableTarget(event.target))
            {
                return;
            }

            //Prevent key-hold spam.
            if (event.repeat)
            {
                return;
            }

            //Ignore modified shortcuts (preserve OS/browser combos).
            const hasModifierKey = (event.metaKey) || (event.ctrlKey) || (event.altKey);
            if (hasModifierKey)
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
                    if (event.shiftKey)
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
