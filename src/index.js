import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './store/theme-context';
import { ErrorProvider } from './store/error-context';
import { ApiProvider } from './store/api-context';

import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorProvider>
      <ApiProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ApiProvider>
    </ErrorProvider>
  </React.StrictMode>
);
