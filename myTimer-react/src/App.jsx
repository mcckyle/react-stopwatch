//src/App.jsx

import React from "react";
import Timer from "./components/Timer";
import './App.css';

function App() {
  return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 px-4">
          <Timer />
      </main>
  );
}

export default App;
