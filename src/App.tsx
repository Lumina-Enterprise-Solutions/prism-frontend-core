import './App.css';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/Auth/Login';
import { useEffect, useState } from 'react';
import { LoadingUI } from './components/organims/loading/LoadingUi';
import AuthLayout from './components/templates/AuthLayout';
import { RegisterPage } from './pages/Auth/Register';
import DefaultLayout from './components/templates/DefaultLayout';
import Dashboard from './pages/Dashboard';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import type { RootState } from './store';
import { useSelector } from 'react-redux';

function App() {
  const location = useLocation();
  const [isAppLoading, setIsAppLoading] = useState(true);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // Simulate initial app loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  if (isAppLoading) {
    return (
      <LoadingUI
        isLoading={true}
        loadingText={isAppLoading ? 'Authenticating' : 'Loading'}
        showProgress={true}
        showDecorations={true}
        logoVariant="full"
      />
    );
  }

  return (
    <AnimatePresence mode="wait">
      <I18nextProvider i18n={i18n}>
        <Routes location={location} key={location.pathname}>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<DefaultLayout />}>
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />
          </Route>
        </Routes>
      </I18nextProvider>
    </AnimatePresence>
  );
}

export default App;
