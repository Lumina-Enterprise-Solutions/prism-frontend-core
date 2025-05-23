import clsx from 'clsx';
import type React from 'react';

export interface LabelProps {
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ children }) => {
  return (
    <label
      className={clsx(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
      )}
    >
      {children}
    </label>
  );
};
