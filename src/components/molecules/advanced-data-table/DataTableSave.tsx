'use client';

import { useState } from 'react';
import { FolderOpen, ChevronDown, Check, Trash, Save } from 'lucide-react';
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
import { Input } from '../../atoms/Input';

export function DataTableSavedViews() {
  const {
    savedViews,
    onSaveView,
    onDeleteView,
    activeView,
    setActiveView,
    applyView,
    columnFilters,
    sorting,
    grouping,
    table,
  } = useDataTable();

  const [viewName, setViewName] = useState('');

  // Save current view
  const saveCurrentView = () => {
    if (!viewName.trim() || !onSaveView) return;

    onSaveView({
      name: viewName,
      filters: columnFilters,
      sorting,
      grouping,
      columnVisibility: table.getState().columnVisibility,
    });

    setViewName('');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-1.5 text-xs border border-muted-foreground/30 shadow-none focus:border-muted-foreground/10 focus:outline-none transition-all duration-200 hover:shadow-none"
        >
          <FolderOpen className="h-3.5 w-3.5" />
          {activeView
            ? savedViews?.find((v) => v.id === activeView)?.name ||
              'Saved Views'
            : 'Saved Views'}
          <ChevronDown className="h-3.5 w-3.5 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[220px]">
        <DropdownMenuLabel className="">Saved Views</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {(savedViews?.length ?? 0) > 0 ? (
          <>
            {savedViews!.map((view) => (
              <DropdownMenuItem
                key={view.id}
                onClick={() => applyView(view)}
                className="flex items-center justify-between"
              >
                <span>{view.name}</span>
                {activeView === view.id && <Check className="h-4 w-4 ml-2" />}

                {onDeleteView && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 ml-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteView(view.id);
                      if (activeView === view.id) {
                        setActiveView(null);
                      }
                    }}
                  >
                    <Trash className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                  </Button>
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </>
        ) : (
          <DropdownMenuItem disabled>No saved views</DropdownMenuItem>
        )}

        {onSaveView && (
          <div className="p-2">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="New view name..."
                value={viewName}
                onChange={(e) => setViewName(e.target.value)}
                className="h-8 text-xs bg-background border-muted-foreground/20"
              />
              <Button
                size="sm"
                className="h-8 px-2"
                onClick={saveCurrentView}
                disabled={!viewName.trim()}
              >
                <Save className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
