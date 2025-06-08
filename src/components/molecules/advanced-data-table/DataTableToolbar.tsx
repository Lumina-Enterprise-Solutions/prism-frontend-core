'use client';
import { X, Search, Filter, RefreshCw } from 'lucide-react';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { Badge } from '../../atoms/Badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../ui/tooltip';
import { DataTableSavedViews } from './DataTableSave';
import { DataTableGrouping } from './DataTableGroup';
import { DataTableViewOptions } from './DataTableViewOptions';
import { DataTableExport } from './DataTableExport';
import { DataTableFilters } from './DataTableFilter';
import { useDataTable } from './DataTableContext';

export function DataTableToolbar() {
  const {
    table,
    searchKey,
    searchPlaceholder,
    showColumnToggle,
    exportData,
    enableGrouping,
    enableFilters,
    enableSavedViews,
    resetAll,
    columnFilters,
    sorting,
    grouping,
    globalFilter,
    setGlobalFilter,
    showFilters,
    setShowFilters,
  } = useDataTable();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
          {/* Global search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search all columns..."
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-9 h-9 w-full bg-background border-muted-foreground/20"
            />
            {globalFilter && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-9 w-9 text-muted-foreground hover:text-foreground"
                onClick={() => setGlobalFilter('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Column-specific search */}
          {searchKey && (
            <div className="relative w-full sm:w-64">
              <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={
                  (table.getColumn(searchKey)?.getFilterValue() as string) ?? ''
                }
                onChange={(event) =>
                  table.getColumn(searchKey)?.setFilterValue(event.target.value)
                }
                className="pl-9 h-9 w-full bg-background border-muted-foreground/20"
              />
              {(table.getColumn(searchKey)?.getFilterValue() as string) && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-9 w-9 text-muted-foreground hover:text-foreground"
                  onClick={() => table.getColumn(searchKey)?.setFilterValue('')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}

          {/* Filter toggle button */}
          {enableFilters && (
            <Button
              variant={showFilters ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="h-9 gap-1.5 text-xs"
            >
              <Filter className="h-3.5 w-3.5" />
              Filters
              {table.getState().columnFilters.length > 0 && (
                <Badge variant="outline" className="ml-1 px-1 font-normal">
                  {table.getState().columnFilters.length}
                </Badge>
              )}
            </Button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 ml-auto">
          {/* Saved views */}
          {enableSavedViews && <DataTableSavedViews />}

          {/* Grouping */}
          {enableGrouping && <DataTableGrouping />}

          {/* Column visibility */}
          {showColumnToggle && <DataTableViewOptions />}

          {/* Export options */}
          {exportData && <DataTableExport />}

          {/* Reset all */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetAll}
                  className="h-9 w-9 text-muted-foreground hover:text-foreground"
                  disabled={
                    columnFilters.length === 0 &&
                    sorting.length === 0 &&
                    grouping.length === 0 &&
                    globalFilter === ''
                  }
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset all filters and sorting</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Active filters display */}
      {(columnFilters.length > 0 ||
        sorting.length > 0 ||
        grouping.length > 0) && <DataTableActiveFilters />}

      {/* Column-specific filters */}
      {showFilters && <DataTableFilters />}
    </div>
  );
}

function DataTableActiveFilters() {
  const { table, columnFilters, sorting, grouping, resetAll } = useDataTable();

  return (
    <div className="flex flex-wrap gap-2 text-sm">
      {columnFilters.map((filter) => {
        const column = table.getColumn(filter.id);
        const columnName = column?.columnDef.header as string;

        return (
          <Badge
            key={filter.id}
            variant="outline"
            className="flex items-center gap-1 px-2 py-1 bg-background border-muted-foreground/20"
          >
            <span>{columnName}:</span>
            <span className="font-medium">{filter.value as string}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
              onClick={() => {
                column?.setFilterValue(undefined);
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        );
      })}

      {sorting.map((sort) => {
        const column = table.getColumn(sort.id);
        const columnName = column?.columnDef.header as string;

        return (
          <Badge
            key={sort.id}
            variant="outline"
            className="flex items-center gap-1 px-2 py-1 bg-background border-muted-foreground/20"
          >
            <span>{columnName}:</span>
            <span className="font-medium">
              {sort.desc ? 'Descending' : 'Ascending'}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
              onClick={() => {
                table.setSorting(sorting.filter((s) => s.id !== sort.id));
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        );
      })}

      {grouping.map((group) => {
        const column = table.getColumn(group);
        const columnName = column?.columnDef.header as string;

        return (
          <Badge
            key={group}
            variant="outline"
            className="flex items-center gap-1 px-2 py-1 bg-background border-muted-foreground/20"
          >
            <span>Grouped by:</span>
            <span className="font-medium">{columnName}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
              onClick={() => {
                table.setGrouping(grouping.filter((g) => g !== group));
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        );
      })}

      {(columnFilters.length > 0 ||
        sorting.length > 0 ||
        grouping.length > 0) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={resetAll}
          className="h-7 text-xs px-2 text-muted-foreground hover:text-foreground"
        >
          Clear All
        </Button>
      )}
    </div>
  );
}
