"use client";

import React from "react";
import type { Table } from "@tanstack/react-table";
import { ChevronsUpDown, ChevronDown } from "lucide-react";
import { Button } from "../../atoms/Button";
import { cn } from "../../../utils/utils";

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    pageSizeState: number;
    setPageSizeState: (pageSize: number) => void;
}

export function DataTablePagination<TData>({
    table,
    pageSizeState,
    setPageSizeState,
}: DataTablePaginationProps<TData>) {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground whitespace-nowrap">
                    Rows per page
                </p>
                <select
                    value={pageSizeState}
                    onChange={(e) => {
                        const newSize = Number(e.target.value);
                        setPageSizeState(newSize);
                        table.setPageSize(newSize);
                    }}
                    className="h-8 rounded-md border border-input bg-background px-3 py-1 text-sm"
                >
                    {[5, 10, 20, 50, 100].map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2">
                <div className="text-sm text-muted-foreground">
                    {table.getFilteredRowModel().rows.length > 0
                        ? `${table.getState().pagination.pageIndex *
                        table.getState().pagination.pageSize +
                        1
                        }-${Math.min(
                            (table.getState().pagination.pageIndex + 1) *
                            table.getState().pagination.pageSize,
                            table.getFilteredRowModel().rows.length
                        )} of ${table.getFilteredRowModel().rows.length}`
                        : "0 of 0"}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        className="h-8 w-8 p-0 border-muted-foreground/20"
                    >
                        <span className="sr-only">Go to first page</span>
                        <ChevronsUpDown className="h-4 w-4 rotate-90" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="h-8 w-8 p-0 border-muted-foreground/20"
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronDown className="h-4 w-4 rotate-90" />
                    </Button>
                    <span className="text-sm font-medium">
                        {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="h-8 w-8 p-0 border-muted-foreground/20"
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronDown className="h-4 w-4 -rotate-90" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                        className="h-8 w-8 p-0 border-muted-foreground/20"
                    >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsUpDown className="h-4 w-4 -rotate-90" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Additional components needed for the DataTable
const Select = React.forwardRef<
    HTMLSelectElement,
    React.ComponentPropsWithoutRef<"select"> & {
        onValueChange?: (value: string) => void;
    }
>(({ onValueChange, ...props }, ref) => {
    return (
        <select
            ref={ref}
            onChange={(e) => onValueChange?.(e.target.value)}
            className="h-8 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            {...props}
        />
    );
});
Select.displayName = "Select";

const SelectTrigger = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex h-9 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
        )}
        {...props}
    />
));
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = React.forwardRef<
    HTMLSpanElement,
    React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
    <span ref={ref} className={cn("block truncate", className)} {...props} />
));
SelectValue.displayName = "SelectValue";

const SelectContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
            className
        )}
        {...props}
    />
));
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            className
        )}
        {...props}
    />
));
SelectItem.displayName = "SelectItem";
