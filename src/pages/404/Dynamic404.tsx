
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/services/use-auth';
import { useTenant } from '../../hooks/services/use-tenant';

export default function Dynamic404() {
  const { isAuthenticated } = useAuth();
  const { tenant, isValidTenant } = useTenant();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isValidTenant) {
    return (
      <div className="flex items-center justify-center h-screen bg-yellow-100 text-center">
        <div>
          <h1 className="text-5xl font-bold text-yellow-600">404</h1>
          <p className="text-lg mt-2 text-gray-700">Tenant <strong>{tenant}</strong> tidak ditemukan.</p>
          <a href="/" className="text-blue-500 hover:underline mt-4 block">Kembali ke Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-red-100 text-center">
      <div>
        <h1 className="text-5xl font-bold text-red-600">404</h1>
        <p className="text-lg mt-2 text-gray-700">Halaman tidak ditemukan.</p>
        <a href="/" className="text-blue-500 hover:underline mt-4 block">Kembali ke Home</a>
      </div>
    </div>
  );
}