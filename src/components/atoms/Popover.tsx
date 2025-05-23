import * as Popover from '@radix-ui/react-popover';
import type { ReactNode } from 'react';

export interface ReusablePopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  width?: string;
  className?: string;
}

export const ReusablePopover = ({
  trigger,
  children,
  width = '360px',
  className = '',
}: ReusablePopoverProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Content
        sideOffset={5}
        style={{ width }}
        className={`rounded-md border border-gray-300 bg-white p-4 shadow-lg ${className}`}
      >
        {children}
      </Popover.Content>
    </Popover.Root>
  );
};
