import './App.css';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LoginPage } from './pages/Auth/Login';
import { useEffect, useState } from 'react';
import { LoadingUI } from './components/organims/loading/LoadingUi';
import AuthLayout from './components/templates/AuthLayout';

function App() {
  const location = useLocation();
  const [isAppLoading, setIsAppLoading] = useState(true);

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
      <Routes location={location} key={location.pathname}>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="erp-prism-frontend/" element={<LoginPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
