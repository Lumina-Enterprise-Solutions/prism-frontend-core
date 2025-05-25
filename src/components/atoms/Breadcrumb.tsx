import { Link, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from '../ui/breadcrumb';
import { ChevronRightIcon } from '@radix-ui/react-icons';

export function BreadcrumbDynamic() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumb separator={<ChevronRightIcon className="w-4 h-4" />}>
      <BreadcrumbItem>
        <Link to="/">
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </Link>
      </BreadcrumbItem>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <BreadcrumbItem key={to}>
            {isLast ? (
              <BreadcrumbPage>{capitalize(value)}</BreadcrumbPage>
            ) : (
              <Link to={to}>
                <BreadcrumbLink href={to}>{capitalize(value)}</BreadcrumbLink>
              </Link>
            )}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}

// Helper untuk kapitalisasi
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
}
