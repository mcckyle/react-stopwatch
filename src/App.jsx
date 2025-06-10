//File name: App.jsx
//Author: Kyle McColgan
//Date: 09 June 2025
//Description: This file contains the entry point React component for the react-timer.

import React from "react";
import Timer from "./components/Timer/Timer.jsx";
import './App.css';

function App() {
  return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10 transition-all duration-300 appWrapper">
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-yellow-400 drop-shadow-lg header">
              React Timer
          </h1>
          <Timer />
      </main>
  );
}

export default App;
