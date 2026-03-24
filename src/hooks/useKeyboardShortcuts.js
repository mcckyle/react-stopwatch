//File name: useKeyboardShortcuts.js
//Author: Kyle McColgan
//Date: 22 March 2026
//Description: This file contains the keyboard shortcut implememtation for the stopwatch React project.

import { useEffect } from "react";

function isEditableTarget(target)
{
    if (!(target instanceof HTMLElement))
    {
        return false;
    }

    const tagName = target.tagName;

    return (
        target.isContentEditable ||
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        tagName === "SELECT"
    );
}

export function useKeyboardShortcuts({ onToggle, onReset, onLap, onOpenHelp }) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isEditableTarget(event.target))
            {
                return;
            }

            if (event.repeat)
            {
                return;
            }

            const hasModifierKey = (event.metaKey) || (event.ctrlKey) || (event.altKey);

            if (hasModifierKey)
            {
                return;
            }

            if (event.code === "Space")
            {
                event.preventDefault();
                onToggle();
                return;
            }
            if (event.code === "KeyL")
            {
                onLap();
                return;
            }
            if (event.code === "KeyR")
            {
                onReset();
                return;
            }
            if ( (event.code === "Slash") && (event.shiftKey) )
            {
                event.preventDefault();
                onOpenHelp();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onToggle, onReset, onLap, onOpenHelp]);
}
