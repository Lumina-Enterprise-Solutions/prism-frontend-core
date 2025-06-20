import { AnimatePresence } from 'framer-motion';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import { Route, Routes, useLocation } from 'react-router-dom';
import Dynamic404 from '../../../pages/404/Dynamic404';
import { useEffect, useState } from 'react';
import { LoadingUI } from '../../../components/organims/loading/LoadingUi';
import KanbanLayout from '../layout/KanbanDefaultLayout';
import BoardPage from '../pages/board';
import { ToastContextProvider } from '../../../context/ToastProvider';
import { ToastProvider } from '../../../components/ui/use-toast';

export default function KanbanRoute() {
  const location = useLocation();
  const [isAppLoading, setIsAppLoading] = useState(true);
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
        <ToastContextProvider>
          <ToastProvider>
            <Routes location={location} key={location.pathname}>
              <Route element={<KanbanLayout header={''} />}>
                <Route path="/board" element={<BoardPage />} />
              </Route>
              <Route path="*" element={<Dynamic404 />} />
            </Routes>
          </ToastProvider>
        </ToastContextProvider>
      </I18nextProvider>
    </AnimatePresence>
  );
}
