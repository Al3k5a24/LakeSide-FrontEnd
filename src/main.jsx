
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

  const root = ReactDOM.createRoot(document.getElementById('root'));
  //to use react-router-dom, we need to wrap our app in a BrowserRouter component
  root.render(
    <React.StrictMode>
      <BrowserRouter>
          <App/>
      </BrowserRouter>
    </React.StrictMode>
  )
