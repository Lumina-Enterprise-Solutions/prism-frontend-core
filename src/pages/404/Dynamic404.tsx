import { useAuth } from '../../hooks/services/use-auth';
import { useTenant } from '../../hooks/services/use-tenant';

export default function Dynamic404() {
  const { isAuthenticated } = useAuth();
  const { tenant, isValidTenant } = useTenant();

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-foreground to-primary">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold text-primary-foreground">404</h1>
          <p className="text-lg mt-2 text-primary-foreground/80">Halaman tidak ditemukan.</p>
          <a href="/" className="text-primary-foreground hover:underline mt-4 block">Kembali ke Home</a>
        </div>
      </div>
    );
  }

  if (!isValidTenant) {
    return (
      <div className="fixed inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-foreground to-primary">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold text-primary-foreground">404</h1>
          <p className="text-lg mt-2 text-primary-foreground/80">Tenant <strong>{tenant}</strong> tidak ditemukan.</p>
          <a href="/" className="text-primary-foreground hover:underline mt-4 block">Kembali ke Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-red-100 text-center">
      <div>
        <h1 className="text-5xl font-bold text-red-600">404</h1>
        <p className="text-lg mt-2 text-gray-700">Halaman tidak ditemukan.</p>
        <a href="/" className="text-primary hover:underline mt-4 block">Kembali ke Home</a>
      </div>
    </div>
  );
}