//File name: App.jsx
//Author: Kyle McColgan
//Date: 5 January 2026
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
      <main className={`app ${theme}`}>
        <Stopwatch onToggleTheme={onToggleTheme} />
      </main>
    );
}

export default App;
