import { useParams } from 'react-router-dom';

export function useTenant() {
  const { tenant } = useParams();
  const validTenants = ['default', 'acme', 'beta'];

  return {
    tenant,
    isValidTenant: validTenants.includes(tenant ?? ''),
  };
}