import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './store/theme-context';
import { ErrorProvider } from './store/error-context';

import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorProvider>
  </React.StrictMode>
);
