//File name: useKeyboardShortcuts.js
//Author: Kyle McColgan
//Date: 18 March 2026
//Description: This file contains the keyboard shortcut implememtation for the stopwatch React project.

import { useEffect } from "react";

export function useKeyboardShortcuts({ onToggle, onReset, onLap, onOpenHelp }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            const tag = e.target.tagName;

            //Avoid interfering with inputs or editable content.
            if ( (tag === "INPUT") || (tag === "TEXTAREA") || (e.target.isContentEditable))
            {
                return;
            }

            switch(e.code)
            {
                case "Space":
                    e.preventDefault();
                    onToggle();
                    break;
                case "KeyL":
                    onLap();
                    break;
                case "KeyR":
                    onReset();
                    break;
                case "Slash":
                    if (e.shiftKey) onOpenHelp();
                    break;
                default:
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onToggle, onReset, onLap, onOpenHelp]);
}
