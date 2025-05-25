import clsx from 'clsx';
import type React from 'react';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    'border-transparent bg-primary text-primary-foreground hover:bg-primary/90',
  secondary:
    'border-transparent bg-secondary text-primary-foreground hover:bg-secondary/80',
  destructive:
    'border-transparent bg-destructive text-primary-foreground hover:bg-destructive/90',
  outline:
    'border border-accent text-accent bg-background hover:text-accent-foreground',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
}) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        variantClasses[variant]
      )}
    >
      {children}
    </span>
  );
};
