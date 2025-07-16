import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import './styles/global.css';
import { getTheme } from './styles/theme.js';
import { useState } from 'react';

function MainApp() {
  const [mode, setMode] = useState(localStorage.getItem('themeMode') || 'light');
  const theme = getTheme(mode);
  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App toggleMode={toggleMode} mode={mode} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);