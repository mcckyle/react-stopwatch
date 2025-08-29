//File name: main.jsx
//Author: Kyle McColgan
//Date: 28 August 2025
//Description: This file contains the main React component for the react-timer app.

import React from 'react';
import { createRoot } from 'react-dom/client';
import ThemeWrapper from './components/ThemeWrapper.jsx';
import App from './App';

import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeWrapper>
      <App />
    </ThemeWrapper>
  </React.StrictMode>
);
