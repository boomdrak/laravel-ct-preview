import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import '../css/app.css';
// import 'flatpickr/dist/flatpickr.min.css';
import { CookiesProvider } from 'react-cookie';
import { Toast } from '@/components/TailwindToaster';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CookiesProvider defaultSetOptions={{ path: '/', secure: true }}>
    {/* <React.StrictMode> */}
    <Router>
      <Toast />
      <App />
    </Router>
    {/* </React.StrictMode> */}
  </CookiesProvider>
);
