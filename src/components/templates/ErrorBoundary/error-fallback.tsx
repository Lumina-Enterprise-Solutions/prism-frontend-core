import { type FallbackProps } from 'react-error-boundary';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { Button } from '../../atoms/Button';
import { RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  useEffect(() => {
    toast.error(`💥 Terjadi kesalahan: ${error.message}`, {
      toastId: 'global-error-toast',
    });
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 text-center bg-gradient-to-br from-primary-foreground to-primary">
      <h2 className="text-2xl font-bold text-primary-foreground mb-2">Oops! Ada kesalahan.</h2>
      <p className="text-primary-foreground mb-4">{error.message}</p>
      <div className="flex gap-3">
        <motion.div whileHover={{ y: 5, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Button onClick={resetErrorBoundary}>
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </Button>
        </motion.div>
        <motion.div whileHover={{ y: 5, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Button onClick={() => window.location.reload()}>
            <RefreshCcw className="w-4 h-4" />
            Reload
          </Button>
        </motion.div>
      </div>
    </div>
  );
}