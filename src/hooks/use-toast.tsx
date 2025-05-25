import * as React from 'react';
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastViewport,
  ToastProvider,
  type ToastProps,
} from '../components/atoms/Toast';

type ToastData = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: ToastProps['variant'];
};

type ToastContextType = {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, 'id'>) => void;
  removeToast: (id: string) => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

export function ToastContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const addToast = (toast: Omit<ToastData, 'id'>) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      <ToastProvider>
        {children}
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            onOpenChange={(open) => !open && removeToast(toast.id)}
          >
            <div className="grid gap-1">
              {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
              {toast.description && (
                <ToastDescription>{toast.description}</ToastDescription>
              )}
            </div>
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastContextProvider');
  }
  return context;
}
