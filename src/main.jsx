//File name: main.jsx
//Author: Kyle McColgan
//Date: 06 June 2025
//Description: This file contains the main React component for the react-timer app.

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import ThemeWrapper from './components/ThemeWrapper.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeWrapper>
      <App />
    </ThemeWrapper>
  </React.StrictMode>
);
