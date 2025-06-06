"use client"

import type React from "react"
import { createContext, useContext } from "react"
import type { ColumnFiltersState, SortingState, GroupingState, Table as TanStackTable } from "@tanstack/react-table"

export interface DataTableContextProps<TData = unknown> {
    table: TanStackTable<TData>
    searchKey?: string
    searchPlaceholder?: string
    showColumnToggle?: boolean
    exportData?: boolean
    exportFilename?: string
    enableGrouping?: boolean
    enableFilters?: boolean
    enableSavedViews?: boolean
    savedViews?: {
        id: string
        name: string
        filters: ColumnFiltersState
        sorting: SortingState
        grouping: GroupingState
        columnVisibility: Record<string, boolean>
    }[]
    onSaveView?: (view: {
        name: string
        filters: ColumnFiltersState
        sorting: SortingState
        grouping: GroupingState
        columnVisibility: Record<string, boolean>
    }) => void
    onDeleteView?: (viewId: string) => void
    activeView: string | null
    setActiveView: (viewId: string | null) => void
    applyView: (view: {
        id: string
        name: string
        filters: ColumnFiltersState
        sorting: SortingState
        grouping: GroupingState
        columnVisibility: Record<string, boolean>
    }) => void
    resetAll: () => void
    columnFilters: ColumnFiltersState
    sorting: SortingState
    grouping: GroupingState
    globalFilter: string
    setGlobalFilter: (value: string) => void
    showFilters: boolean
    setShowFilters: (value: boolean) => void
    tableContainerRef: React.RefObject<HTMLDivElement>
    variant?: "default" | "minimal" | "card"
}

export const DataTableContext = createContext<DataTableContextProps | undefined>(undefined)

export function useDataTable<TData = unknown>() {
    const context = useContext(DataTableContext) as DataTableContextProps<TData>

    if (!context) {
        throw new Error("useDataTable must be used within a DataTableProvider")
    }

    return context
}

interface DataTableProviderProps {
    children: React.ReactNode
    value: DataTableContextProps
}

export function DataTableProvider({ children, value }: DataTableProviderProps) {
    return <DataTableContext.Provider value={value}>{children}</DataTableContext.Provider>
}

