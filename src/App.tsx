import './App.css';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LoginPage } from './pages/Auth/login';
import { useEffect, useState } from 'react';
import { LoadingUI } from './components/organims/loading/LoadingUi';
import AuthLayout from './components/templates/AuthLayout';
import { RegisterPage } from './pages/Auth/register';
import DefaultLayout from './components/templates/DefaultLayout';
import Dashboard from './pages/dashboard';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import type { RootState } from './store';
import { useSelector } from 'react-redux';
import Dynamic404 from './pages/404/Dynamic404';
import { ForgotPasswordPage } from './pages/Auth/forgot-password';
import { ResetPasswordPage } from './pages/Auth/reset-password';
import UserManagementPage from './pages/UserManagement/user-management';
import { TourProvider } from '@reactour/tour';
import { steps } from './types/Step';
import ProfilePage from './pages/Setting/profile';
import PrivacyPage from './pages/Setting/privacy';

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
        <TourProvider steps={steps}>
          <Routes location={location} key={location.pathname}>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Route>
            {/* Protected Routes */}
            <Route element={<DefaultLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/setting/profile" element={<ProfilePage />} />
              <Route path="/user-management" element={<UserManagementPage />} />
              <Route path="/setting/privacy" element={<PrivacyPage />} />
              {/* <Route
              path="/dashboard"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
              />
              <Route
              path="/user-management"
              element={
                isAuthenticated ? <UserManagementPage /> : <Navigate to="/login" />
              }
            /> */}
            </Route>
            <Route path="*" element={<Dynamic404 />} />
          </Routes>
        </TourProvider>
      </I18nextProvider>
    </AnimatePresence>
  );
}

export default App;
