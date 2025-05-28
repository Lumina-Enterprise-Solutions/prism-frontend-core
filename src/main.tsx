import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n';
import App from './App.tsx';
import { ToastContextProvider } from './hooks/use-toast.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider.tsx';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store/index.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider>
            <ToastContextProvider>
              <App />
            </ToastContextProvider>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
