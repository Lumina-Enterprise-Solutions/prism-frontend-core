import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n';
import App from './App.tsx';
import { ToastContextProvider } from './hooks/use-toast.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ToastContextProvider>
          <App />
        </ToastContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
