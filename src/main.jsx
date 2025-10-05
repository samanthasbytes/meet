import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import * as atatus from 'atatus-spa';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

atatus.config('daff2cc8d313467496d2faa721e073c9').install();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorkerRegistration.register();
