//File name: App.jsx
//Author: Kyle McColgan
//Date: 8 February 2026
//Description: This file contains the App component for the React stopwatch project.

import Stopwatch from "./components/Stopwatch/Stopwatch.jsx";
import { useTheme } from "./context/ThemeContext.jsx";

import "./components/theme.css";
import "./App.css";

function App()
{
    const { onToggleTheme } = useTheme();

    return (
      <main className="app" aria-label="Stopwatch application">
        <Stopwatch onToggleTheme={onToggleTheme} />
      </main>
    );
}

export default App;
