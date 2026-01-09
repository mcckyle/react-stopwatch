//File name: App.jsx
//Author: Kyle McColgan
//Date: 9 January 2026
//Description: This file contains the entry point component for the React stopwatch project.

import React from "react";
import Stopwatch from "./components/Stopwatch/Stopwatch.jsx";
import { useTheme } from "./context/ThemeContext.jsx";

import "./components/theme.css";
import "./App.css";

function App()
{
    const { onToggleTheme } = useTheme();

    return (
      <main className="app" role="main">
        <Stopwatch onToggleTheme={onToggleTheme} />
      </main>
    );
}

export default App;
