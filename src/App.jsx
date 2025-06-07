//File name: App.jsx
//Author: Kyle McColgan
//Date: 06 June 2025
//Description: This file contains the entry point React component for the react-timer.

import React from "react";
import Timer from "./components/Timer/Timer.jsx";
import './App.css';

function App() {
  return (
      <main className="min-h-screen flex items-center justify-center px-4 transition-all duration-300">
          <Timer />
      </main>
  );
}

export default App;
