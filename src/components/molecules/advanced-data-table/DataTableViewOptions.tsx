'use client';
import { Columns } from 'lucide-react';
import { useDataTable } from './DataTableContext';
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
import { ScrollArea } from '../../ui/scroll-area';

export function DataTableViewOptions() {
  const { table } = useDataTable();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
          <Columns className="h-3.5 w-3.5" />
          Columns
          <Badge variant="outline" className="ml-1 px-1 font-normal">
            {
              table.getAllColumns().filter((column) => column.getIsVisible())
                .length
            }
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[220px]">
        <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-80">
          <div className="p-2">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <div key={column.id} className="mb-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={column.getIsVisible()}
                        onChange={column.getToggleVisibilityHandler()}
                        className="rounded border-muted-foreground/30 text-primary h-4 w-4"
                      />
                      <span className="text-sm">
                        {'meta' in column.columnDef &&
                        column.columnDef.meta?.label
                          ? column.columnDef.meta.label
                          : typeof column.columnDef.header === 'string'
                          ? column.columnDef.header
                          : column.id}
                      </span>
                    </label>
                  </div>
                );
              })}
          </div>
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => table.resetColumnVisibility()}
          className="justify-center text-xs"
        >
          Reset to Default
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
