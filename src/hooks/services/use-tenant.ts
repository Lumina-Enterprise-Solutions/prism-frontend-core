import { useParams } from 'react-router-dom';

export function useTenant() {
  const { tenant } = useParams();
  const validTenants = ['default', 'acme', 'beta']; // Bisa dari API

  return {
    tenant,
    isValidTenant: validTenants.includes(tenant ?? ''),
  };
}