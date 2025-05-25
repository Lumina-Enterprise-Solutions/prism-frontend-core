import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../utils/utils';

type BreadcrumbProps = {
  separator?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export function Breadcrumb({
  separator = '/',
  className,
  children,
}: BreadcrumbProps) {
  const items = React.Children.toArray(children).filter(Boolean);

  return (
    <nav
      className={cn(
        'flex items-center space-x-1 text-sm text-muted-foreground',
        className
      )}
      aria-label="Breadcrumb"
    >
      {items.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {index < items.length - 1 && (
            <span className="px-1">{separator}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

type BreadcrumbItemProps = {
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function BreadcrumbItem({
  asChild,
  className,
  children,
}: BreadcrumbItemProps) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      className={cn(
        'text-muted-foreground hover:text-foreground transition-colors',
        className
      )}
    >
      {children}
    </Comp>
  );
}

export function BreadcrumbLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn('underline-offset-4 hover:underline', className)}
    >
      {children}
    </a>
  );
}

export function BreadcrumbPage({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn('font-medium text-foreground', className)}
      aria-current="page"
    >
      {children}
    </span>
  );
}
