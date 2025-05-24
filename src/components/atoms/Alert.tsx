import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import type { LucideIcon } from 'lucide-react';
import React from 'react';

interface CustomAlertProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
}

export const CustomAlert: React.FC<CustomAlertProps> = ({
  icon: Icon,
  title,
  description,
  variant,
}) => {
  return (
    <Alert variant={variant}>
      {Icon && <Icon className="h-4 w-4" />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
