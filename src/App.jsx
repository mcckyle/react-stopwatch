//File name: App.jsx
//Author: Kyle McColgan
//Date: 9 October 2025
//Description: This file contains the entry point React component for the react timer project.

import React from "react";
import Timer from "./components/Timer/Timer.jsx";
import { useTheme } from "./context/ThemeContext.jsx";

import "./App.css";
import "./components/theme.css";

function App()
{
    const { theme, toggleTheme } = useTheme();

    return (
      <main className={`app ${theme}`}>
        <div className="app-inner">
          <Timer toggleTheme={toggleTheme} />
        </div>
      </main>
    );
}

export default App;
