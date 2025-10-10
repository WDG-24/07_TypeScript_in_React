import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.js';
import { BrowserRouter } from 'react-router';
import ThemeContextProvider from './contexts/ThemeContext.js';
import BookingContextProvider from './contexts/BookingContext.js';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <BookingContextProvider>
          <App />
        </BookingContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </StrictMode>
);
