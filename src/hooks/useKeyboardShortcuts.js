//File name: useKeyboardShortcuts.js
//Author: Kyle McColgan
//Date: 19 December 2025
//Description: This file contains the keyboard shortcut implememtation for the React stopwatch.

import { useEffect } from "react";

export function useKeyboardShortcuts({ onToggle, onReset, onLap, onOpenHelp }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
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
