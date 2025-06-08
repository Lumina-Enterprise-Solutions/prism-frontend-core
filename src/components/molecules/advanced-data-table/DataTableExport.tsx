'use client';
import {
  FileDown,
  Download,
  FileSpreadsheet,
  FileIcon as FilePdf,
  FileJson,
  Printer,
  ChevronDown,
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Button } from '../../atoms/Button';
import { useDataTable } from './DataTableContext';

export function DataTableExport() {
  const { table, exportFilename, tableContainerRef } = useDataTable();

  // Export functions
  const exportToCSV = () => {
    // Get visible columns
    const visibleColumns = table
      .getAllColumns()
      .filter((column) => column.getIsVisible());

    // Create header row
    const headers = visibleColumns.map((column) => {
      return column.columnDef.header as string;
    });

    // Create data rows
    const rows = table.getFilteredRowModel().rows.map((row) => {
      return visibleColumns.map((column) => {
        const cell = row
          .getAllCells()
          .find((cell) => cell.column.id === column.id);
        if (!cell) return '';

        // Try to get plain text value
        const value = cell.getValue();
        if (
          typeof value === 'string' ||
          typeof value === 'number' ||
          typeof value === 'boolean'
        ) {
          return value;
        }

        // Fallback to rendered content
        return cell.renderValue() || '';
      });
    });

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${exportFilename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = () => {
    // Get visible columns
    const visibleColumns = table
      .getAllColumns()
      .filter((column) => column.getIsVisible());

    // Create header row
    const headers = visibleColumns.map((column) => {
      return column.columnDef.header as string;
    });

    // Create data rows
    const rows = table.getFilteredRowModel().rows.map((row) => {
      return visibleColumns.map((column) => {
        const cell = row
          .getAllCells()
          .find((cell) => cell.column.id === column.id);
        if (!cell) return '';

        // Try to get plain text value
        const value = cell.getValue();
        if (
          typeof value === 'string' ||
          typeof value === 'number' ||
          typeof value === 'boolean'
        ) {
          return value;
        }

        // Fallback to rendered content
        return cell.renderValue() || '';
      });
    });

    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    // Generate Excel file and download
    XLSX.writeFile(workbook, `${exportFilename}.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Get visible columns
    const visibleColumns = table
      .getAllColumns()
      .filter((column) => column.getIsVisible());

    // Create header row
    const headers = visibleColumns.map((column) => {
      return column.columnDef.header as string;
    });

    // Create data rows
    const rows = table.getFilteredRowModel().rows.map((row) => {
      return visibleColumns.map((column) => {
        const cell = row
          .getAllCells()
          .find((cell) => cell.column.id === column.id);
        if (!cell) return '';

        // Try to get plain text value
        const value = cell.getValue();
        if (
          typeof value === 'string' ||
          typeof value === 'number' ||
          typeof value === 'boolean'
        ) {
          return value;
        }

        // Fallback to rendered content
        return cell.renderValue() || '';
      });
    });

    // @ts-ignore - jspdf-autotable types are not included
    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 15,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [45, 55, 60],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    doc.save(`${exportFilename}.pdf`);
  };

  const exportToJSON = () => {
    // Get visible columns
    const visibleColumns = table
      .getAllColumns()
      .filter((column) => column.getIsVisible());

    // Create data objects
    const jsonData = table.getFilteredRowModel().rows.map((row) => {
      const rowData: Record<string, any> = {};

      visibleColumns.forEach((column) => {
        const cell = row
          .getAllCells()
          .find((cell) => cell.column.id === column.id);
        if (!cell) return;

        const header = column.columnDef.header as string;
        const value = cell.getValue();

        rowData[header] = value;
      });

      return rowData;
    });

    // Create and download file
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${exportFilename}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printTable = () => {
    if (!tableContainerRef.current) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const tableHTML = tableContainerRef.current.innerHTML;

    printWindow.document.write(`
      <html>
        <head>
          <title>Table Data</title>
          <style>
            body { font-family: system-ui, sans-serif; padding: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          ${tableHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    // Print after a short delay to ensure content is loaded
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
          <FileDown className="h-3.5 w-3.5" />
          Export
          <ChevronDown className="h-3.5 w-3.5 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={exportToCSV}>
          <Download className="mr-2 h-4 w-4" />
          CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToExcel}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToPDF}>
          <FilePdf className="mr-2 h-4 w-4" />
          PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToJSON}>
          <FileJson className="mr-2 h-4 w-4" />
          JSON
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={printTable}>
          <Printer className="mr-2 h-4 w-4" />
          Print
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
