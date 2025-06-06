'use client';
import { Layers, Check, RotateCcw } from 'lucide-react';
import { useDataTable } from './data-table-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Button } from '../../atoms/Button';
import { Badge } from '../../atoms/Badge';

export function DataTableGrouping() {
  const { table, grouping } = useDataTable();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
          <Layers className="h-3.5 w-3.5" />
          Group
          {table.getState().grouping.length > 0 && (
            <Badge variant="outline" className="ml-1 px-1 font-normal">
              {table.getState().grouping.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Group By Column</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllLeafColumns()
          .filter(
            (column) =>
              column.getCanGroup() &&
              column.id !== 'select' &&
              column.id !== 'actions'
          )
          .map((column) => {
            const isGrouped = table.getState().grouping.includes(column.id);

            return (
              <DropdownMenuItem
                key={column.id}
                onClick={() => {
                  if (isGrouped) {
                    column.toggleGrouping();
                  } else {
                    table.setGrouping([...grouping, column.id]);
                  }
                }}
                className="flex items-center justify-between"
              >
                <span className="text-sm">
                  {'meta' in column.columnDef && column.columnDef.meta?.label
                    ? column.columnDef.meta.label
                    : typeof column.columnDef.header === 'string'
                    ? column.columnDef.header
                    : column.id}
                </span>
                {isGrouped && <Check className="h-4 w-4 ml-2" />}
              </DropdownMenuItem>
            );
          })}

        {table.getState().grouping.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => table.setGrouping([])}
              className="text-destructive focus:text-destructive"
            >
              <RotateCcw className="mr-2 h-3.5 w-3.5" />
              Clear Grouping
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
