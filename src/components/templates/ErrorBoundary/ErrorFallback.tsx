import { type FallbackProps } from 'react-error-boundary';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  useEffect(() => {
    toast.error(`💥 Terjadi kesalahan: ${error.message}`, {
      toastId: 'global-error-toast',
    });
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 text-center bg-gradient-to-br from-primary-foreground to-primary">
      <h2 className="text-2xl font-bold text-red-600 mb-2">Oops! Ada kesalahan.</h2>
      <p className="text-gray-700 mb-4">{error.message}</p>
      <div className="flex gap-3">
        <button
          onClick={resetErrorBoundary}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          🔁 Coba Lagi
        </button>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          🔄 Muat Ulang
        </button>
      </div>
    </div>
  );
}