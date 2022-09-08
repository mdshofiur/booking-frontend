import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthConntextProvider } from './context/authContext';
import { SearchConntextProvider } from "./context/SearchContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthConntextProvider>
      <SearchConntextProvider>
        <App />
      </SearchConntextProvider>
    </AuthConntextProvider>
  </React.StrictMode>
);
