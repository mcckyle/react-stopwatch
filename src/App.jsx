//File name: App.jsx
//Author: Kyle McColgan
//Date: 26 October 2025
//Description: This file contains the entry point component for the React stopwatch project.

import React from "react";
import Stopwatch from "./components/Stopwatch/Stopwatch.jsx";
import { useTheme } from "./context/ThemeContext.jsx";

import "./App.css";
import "./components/theme.css";

function App()
{
    const { theme, toggleTheme } = useTheme();

    return (
      <main className={`app ${theme}`}>
        <Stopwatch toggleTheme={toggleTheme} />
      </main>
    );
}

export default App;
