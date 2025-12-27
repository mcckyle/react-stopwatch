//File name: App.jsx
//Author: Kyle McColgan
//Date: 26 December 2025
//Description: This file contains the entry point component for the React stopwatch project.

import React from "react";
import Stopwatch from "./components/Stopwatch/Stopwatch.jsx";
import { useTheme } from "./context/ThemeContext.jsx";

import "./App.css";
import "./components/theme.css";

function App()
{
    const { theme, onToggleTheme } = useTheme();

    return (
      <main className={`app ${theme}`} role="application" aria-label="Stopwatch">
        <Stopwatch onToggleTheme={onToggleTheme} />
      </main>
    );
}

export default App;
