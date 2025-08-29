//File name: App.jsx
//Author: Kyle McColgan
//Date: 28 August 2025
//Description: This file contains the entry point React component for the react-timer.

import React from "react";
import Timer from "./components/Timer/Timer.jsx";
import { useTheme } from "./hooks/useTheme.js";
import './components/theme.css';
import './App.css';

function App()
{
    const { theme, toggleTheme } = useTheme();
    const dark = theme === "dark";

    return (
      <div className={`app ${theme}`}>
          <Timer dark={dark} toggleTheme={toggleTheme} />
      </div>
    );
}

export default App;
