'use client';

import type React from 'react';

import type { ColumnDef, Row } from '@tanstack/react-table';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CheckIcon,
  CopyIcon,
  FileText,
  MoreHorizontal,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../atoms/Button';
import { Checkbox } from '../../ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Badge } from '../../atoms/Badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../ui/tooltip';

// Helper function to create sortable header
export function createSortableHeader<T>(
  label: string,
  _accessor: keyof T
): ColumnDef<T>['header'] {
  return ({ column }) => {
    return (
      <Button
        variant="ghost"
        className="-ml-4 h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        {label}
        {column.getIsSorted() === 'asc' ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === 'desc' ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
        )}
      </Button>
    );
  };
}

// Helper function to create a selection column
export function createSelectionColumn<T>(): ColumnDef<T> {
  return {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };
}

// Helper function to create an actions column
export function createActionsColumn<T>(
  actions: Array<{
    label: string;
    onClick: (data: T) => void;
    icon?: React.ReactNode;
    popover?: (data: T) => React.ReactNode;
  }>
): ColumnDef<T> {
  return {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const data = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {actions.map((action, index) => {
              const content = (
                <div className="flex items-center">
                  {action.icon && <span className="mr-2">{action.icon}</span>}
                  {action.label}
                </div>
              );

              return action.popover ? (
                <DropdownMenuItem key={index} asChild>
                  {action.popover(data)}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  key={index}
                  onClick={() => action.onClick(data)}
                >
                  {content}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };
}

export function createSelectionColumnName<T>(
  header: string,
  accessor: keyof T
): ColumnDef<T> {
  return {
    accessorKey: accessor as string,
    header: createSortableHeader<T>(header, accessor),
    meta: {
      label: header,
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue(accessor as string)}</div>
    ),
  };
}

export function createSelectionColumnNumber<T>(
  header: string,
  accessor: keyof T
): ColumnDef<T> {
  return {
    accessorKey: accessor as string,
    header: createSortableHeader<T>(header, accessor),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue(accessor as string)}</div>
    ),
  };
}

type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'gold';

export function createBadgeColumn<T extends Record<string, any>>(
  header: string,
  accessor: keyof T,
  colorMap: Record<string, BadgeVariant>
): ColumnDef<T> {
  return {
    accessorKey: accessor as string,
    header,
    cell: ({ row }: { row: Row<T> }) => {
      const value = row.getValue(accessor as string) as string;
      const variant = colorMap[value] || 'default';
      return <Badge variant={variant}>{value}</Badge>;
    },
  };
}

export function createLocationColumnBadge<T>(
  header: string,
  accessor: keyof T
): ColumnDef<T> {
  return {
    accessorKey: accessor as string,
    header: createSortableHeader<T>(header, accessor),
    cell: ({ row }) => {
      const location = row.getValue(accessor as string) as string;

      const locationColorMap: Record<
        string,
        'default' | 'secondary' | 'destructive'
      > = {
        Packing: 'default',
        'Finish Good': 'destructive',
        'Quality Assurance': 'secondary',
      };

      const variant = locationColorMap[location] || 'default';

      return (
        <Badge variant={variant} className="whitespace-nowrap">
          {location}
        </Badge>
      );
    },
  };
}

export function createCopyableColumn<T>(
  header: string,
  accessor: keyof T
): ColumnDef<T> {
  return {
    accessorKey: accessor as string,
    header: header,
    cell: ({ row }) => {
      const value = row.getValue(accessor as string) as string;
      const [copied, setCopied] = useState(false);

      const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      };

      return (
        <TooltipProvider>
          <Tooltip>
            <div className="flex items-center p-2 gap-1">
              <FileText size={16} />
              <TooltipTrigger asChild>
                <span className="text-sm">{value}</span>
              </TooltipTrigger>
              <TooltipContent
                onClick={handleCopy}
                className="flex items-center space-x-2"
              >
                <span className="text-sm">{value}</span>
                {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
              </TooltipContent>
            </div>
          </Tooltip>
        </TooltipProvider>
      );
    },
  };
}

// Helper function to create a status column with badge
export function createStatusColumn<T>(
  header: string,
  accessor: keyof T,
  statusConfig: Record<
    string,
    {
      label: string;
      variant: 'default' | 'secondary' | 'destructive' | 'outline';
    }
  >
): ColumnDef<T> {
  return {
    accessorKey: accessor as string,
    header,
    cell: ({ row }) => {
      const value = row.getValue(accessor as string) as string;
      const status = statusConfig[value] || {
        label: value,
        variant: 'default',
      };

      return (
        <Badge variant={status.variant} className="capitalize">
          {status.label}
        </Badge>
      );
    },
  };
}

// Helper function to create a date column with formatting
export function createDateColumn<T>(
  header: string,
  accessor: keyof T,
  format: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
): ColumnDef<T> {
  return {
    accessorKey: accessor as string,
    header: createSortableHeader<T>(header, accessor),
    meta: {
      label: header,
    },
    cell: ({ row }) => {
      const value = row.getValue(accessor as string);
      if (!value) return null;

      const date =
        value instanceof Date ? value : new Date(value as string | number);

      return <div>{date.toLocaleDateString(undefined, format)}</div>;
    },
  };
}

// Helper function to create a number column with formatting
export function createNumberColumn<T>(
  header: string,
  accessor: keyof T,
  options: {
    prefix?: string;
    suffix?: string | ((row: T) => string);
    decimals?: number;
    sortable?: boolean;
  } = {}
): ColumnDef<T> {
  const { prefix = '', suffix, decimals = 0, sortable = false } = options;

  return {
    accessorKey: accessor as string,
    header: sortable ? createSortableHeader<T>(header, accessor) : header,
    cell: ({ row }) => {
      const value = row.getValue(accessor as string) as number;
      if (value === undefined || value === null) return null;

      const formatted =
        decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

      const resolvedSuffix =
        typeof suffix === 'function' ? suffix(row.original) : suffix ?? '';

      return (
        <div className="text-right font-mono">
          {prefix}
          {formatted}
          {resolvedSuffix}
        </div>
      );
    },
  };
}
