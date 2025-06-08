'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type RowSelectionState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  useReactTable,
  type Row,
  type RowData,
  type ExpandedState,
  type GroupingState,
} from '@tanstack/react-table';

import { DataTableToolbar } from './DataTableToolbar';
import { DataTablePagination } from './DataTablePagination';
import { DataTableProvider } from './DataTableContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { cn } from '../../../utils/utils';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  showColumnToggle?: boolean;
  showPagination?: boolean;
  pageSize?: number;
  title?: string;
  description?: string;
  exportData?: boolean;
  exportFilename?: string;
  enableGrouping?: boolean;
  enableRowSelection?: boolean;
  enableExpanding?: boolean;
  enableEditing?: boolean;
  enableFilters?: boolean;
  enableSavedViews?: boolean;
  onRowClick?: (row: Row<TData>) => void;
  renderRowSubComponent?: (props: { row: Row<TData> }) => React.ReactNode;
  renderDetailPanel?: (props: { row: Row<TData> }) => React.ReactNode;
  updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
  savedViews?: {
    id: string;
    name: string;
    filters: ColumnFiltersState;
    sorting: SortingState;
    grouping: GroupingState;
    columnVisibility: VisibilityState;
  }[];
  onSaveView?: (view: {
    name: string;
    filters: ColumnFiltersState;
    sorting: SortingState;
    grouping: GroupingState;
    columnVisibility: VisibilityState;
  }) => void;
  onDeleteView?: (viewId: string) => void;
  className?: string;
  variant?: 'default' | 'minimal' | 'card';
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = 'Search...',
  showColumnToggle = true,
  showPagination = true,
  pageSize = 10,
  title,
  description,
  exportData = false,
  exportFilename = 'exported-data',
  enableGrouping = false,
  enableRowSelection = true,
  enableExpanding = false,
  //   enableEditing = false,
  enableFilters = true,
  enableSavedViews = false,
  onRowClick,
  renderRowSubComponent,
  renderDetailPanel,
  updateData,
  savedViews = [],
  onSaveView,
  onDeleteView,
  className,
  variant = 'default',
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [pageSizeState, setPageSizeState] = useState(pageSize);
  const [columnResizeMode] = useState<'onChange' | 'onEnd'>('onChange');
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeView, setActiveView] = useState<string | null>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Initialize column order if not set
  useEffect(() => {
    if (columnOrder.length === 0) {
      setColumnOrder(
        columns.map((col) => {
          const id = col.id as string | undefined;
          const accessorKey =
            'accessorKey' in col && typeof col.accessorKey === 'string'
              ? col.accessorKey
              : undefined;

          return id ?? accessorKey ?? '';
        })
      );
    }
  }, [columns, columnOrder]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    onGroupingChange: setGrouping,
    getGroupedRowModel: getGroupedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnOrderChange: setColumnOrder,
    enableRowSelection,
    enableExpanding,
    enableGrouping,
    enableColumnResizing: true,
    columnResizeMode,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        if (updateData) {
          updateData(rowIndex, columnId, value);
        }
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      expanded,
      grouping,
      globalFilter,
      columnOrder,
    },
    initialState: {
      pagination: {
        pageSize: pageSizeState,
      },
    },
  });

  // Apply saved view
  const applyView = (view: (typeof savedViews)[0]) => {
    setColumnFilters(view.filters);
    setSorting(view.sorting);
    setGrouping(view.grouping);
    setColumnVisibility(view.columnVisibility);
    setActiveView(view.id);
  };

  // Reset all filters, sorting, grouping
  const resetAll = () => {
    setColumnFilters([]);
    setSorting([]);
    setGrouping([]);
    setGlobalFilter('');
    setActiveView(null);
    table.resetColumnVisibility();
    table.resetRowSelection();
    table.resetExpanded();
  };

  // Determine if we should show the toolbar
  const showToolbar =
    searchKey ||
    enableFilters ||
    showColumnToggle ||
    exportData ||
    enableSavedViews ||
    enableGrouping;

  // Context value for provider
  const contextValue = {
    table,
    searchKey,
    searchPlaceholder,
    showColumnToggle,
    exportData,
    exportFilename,
    enableGrouping,
    enableFilters,
    enableSavedViews,
    savedViews,
    onSaveView,
    onDeleteView,
    activeView,
    setActiveView,
    applyView,
    resetAll,
    columnFilters,
    sorting,
    grouping,
    globalFilter,
    setGlobalFilter,
    showFilters,
    setShowFilters,
    tableContainerRef,
    variant,
  };

  return (
    <DataTableProvider value={contextValue as any}>
      <div className={cn('space-y-4', className)}>
        {(title || description) && (
          <div className="mb-4">
            {title && (
              <h2 className="text-xl font-medium tracking-tight">{title}</h2>
            )}
            {description && (
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
        )}

        {showToolbar && <DataTableToolbar />}

        <div
          className={cn(
            'rounded-md border overflow-hidden',
            variant === 'minimal'
              ? 'border-transparent'
              : 'border-muted-foreground/10',
            variant === 'card' && 'bg-card'
          )}
          ref={tableContainerRef}
        >
          <div className="overflow-x-auto w-full">
            <Table className="min-w-max">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className={
                      variant === 'minimal'
                        ? 'border-b border-muted-foreground/10'
                        : ''
                    }
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className={cn(
                          'whitespace-nowrap font-medium text-muted-foreground',
                          variant === 'minimal'
                            ? 'bg-transparent'
                            : 'bg-muted/30'
                        )}
                        style={{
                          width: header.getSize(),
                          position: 'relative',
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <React.Fragment key={row.id}>
                      <TableRow
                        data-state={row.getIsSelected() && 'selected'}
                        onClick={() => onRowClick && onRowClick(row)}
                        className={cn(
                          onRowClick ? 'cursor-pointer' : '',
                          variant === 'minimal'
                            ? 'hover:bg-muted/20'
                            : 'hover:bg-muted/50',
                          variant === 'minimal'
                            ? 'border-b border-muted-foreground/10'
                            : ''
                        )}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className={cn(
                              'py-3',
                              variant === 'minimal' && 'border-0'
                            )}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>

                      {/* Expandable row content */}
                      {row.getIsExpanded() && renderRowSubComponent && (
                        <TableRow
                          className={
                            variant === 'minimal'
                              ? 'border-b border-muted-foreground/10'
                              : ''
                          }
                        >
                          <TableCell
                            colSpan={row.getVisibleCells().length}
                            className="p-0"
                          >
                            <div className="p-4 bg-muted/20 border-t border-muted-foreground/10">
                              {renderRowSubComponent({ row })}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}

                      {/* Detail panel */}
                      {row.getIsExpanded() && renderDetailPanel && (
                        <TableRow
                          className={
                            variant === 'minimal'
                              ? 'border-b border-muted-foreground/10'
                              : ''
                          }
                        >
                          <TableCell
                            colSpan={row.getVisibleCells().length}
                            className="p-0"
                          >
                            <div className="p-4 bg-muted/20 border-t border-muted-foreground/10">
                              {renderDetailPanel({ row })}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className={cn(
                        'h-24 text-center text-muted-foreground',
                        variant === 'minimal' && 'border-0'
                      )}
                    >
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {showPagination && (
          <DataTablePagination
            table={table}
            pageSizeState={pageSizeState}
            setPageSizeState={setPageSizeState}
          />
        )}
      </div>
    </DataTableProvider>
  );
}
