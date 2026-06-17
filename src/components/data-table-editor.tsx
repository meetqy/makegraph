'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Plus, Upload } from 'lucide-react';
import Papa from 'papaparse';
import { Button } from '~/components/ui/button';

export type DataTableColumn<T> = {
  key: Extract<keyof T, string>;
  title: string;
  type: 'text' | 'number';
  min?: number;
  max?: number;
  minWidth?: number;
  width?: number;
};

type DataTableEditorProps<T extends Record<string, unknown>> = {
  title?: string;
  importCsvLabel?: string;
  data: T[];
  onChange: (data: T[]) => void;
  columns: DataTableColumn<T>[];
  onColumnsChange?: (columns: DataTableColumn<T>[]) => void;
  defaultNewRow: T | (() => T);
};

export function DataTableEditor<T extends Record<string, unknown>>({
  title = 'Data Editor',
  importCsvLabel = 'Import CSV',
  data,
  onChange,
  columns,
  onColumnsChange,
  defaultNewRow,
}: DataTableEditorProps<T>) {
  // Cell component for editing
  const EditableCell = ({ getValue, row, column, table }: any) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
      table.options.meta?.updateData(row.index, column.id, value);
    };

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <input
        className="w-full h-full min-h-[34px] px-2 border-none bg-transparent focus:outline-none focus:ring-1 focus:ring-[#171717] focus:z-10"
        value={(value ?? '') as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  };

  // Header component for editing column title
  const EditableHeader = ({ column, table }: any) => {
    const initialValue = column.columnDef.header;
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
      table.options.meta?.updateColumnTitle(column.id, value);
    };

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <input
        className="w-full h-full min-h-[34px] px-2 font-medium border-none bg-transparent focus:outline-none focus:ring-1 focus:ring-[#171717] focus:z-10 text-sm text-[#171717]"
        value={(value ?? '') as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  };

  const tableColumns = React.useMemo(
    () =>
      columns.map((col) => ({
        accessorKey: col.key,
        id: col.key,
        header: col.title,
        cell: EditableCell,
        minSize: col.minWidth ?? 120,
        size: col.width ?? 170,
      })),
    [columns]
  );

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: string) => {
        const colDef = columns.find((c) => c.key === columnId);
        let finalValue: string | number = value;

        if (colDef?.type === 'number') {
          const num = Number(value);
          finalValue = Number.isNaN(num) ? 0 : num;
        }

        const newData = data.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...row,
              [columnId]: finalValue,
            };
          }
          return row;
        });
        onChange(newData);
      },
      updateColumnTitle: (columnId: string, newTitle: string) => {
        if (!onColumnsChange) return;
        const newColumns = columns.map((col) => {
          if (col.key === columnId) {
            return { ...col, title: newTitle };
          }
          return col;
        });
        onColumnsChange(newColumns);
      },
    },
  });

  const handleAddRow = () => {
    const newRow =
      typeof defaultNewRow === 'function'
        ? (defaultNewRow as () => T)()
        : { ...defaultNewRow };
    onChange([...data, newRow]);
  };

  const handleAddColumn = () => {
    if (!onColumnsChange) return;

    // Generate a unique key for the new column
    let newIndex = 1;
    let newKey = `value${newIndex}`;
    while (columns.some((c) => c.key === newKey)) {
      newIndex++;
      newKey = `value${newIndex}`;
    }

    const newColumn: DataTableColumn<T> = {
      key: newKey as Extract<keyof T, string>,
      title: `New Column ${newIndex}`,
      type: 'number',
      minWidth: 120,
    };
    onColumnsChange([...columns, newColumn]);

    // Add default value for the new column in all rows
    const newData = data.map((row) => ({
      ...row,
      [newKey]: 0,
    }));
    onChange(newData);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const clampNumber = (value: number, min?: number, max?: number) => {
    if (!Number.isFinite(value)) {
      return 0;
    }

    if (typeof min === 'number' && value < min) {
      return min;
    }

    if (typeof max === 'number' && value > max) {
      return max;
    }

    return value;
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (!results.data || results.data.length === 0) return;

        const parsedData = results.data as Record<string, unknown>[];
        const newData: T[] = parsedData.map((row) => {
          const newRow =
            typeof defaultNewRow === 'function'
              ? (defaultNewRow as () => T)()
              : { ...defaultNewRow };
          const mutableRow: Record<string, unknown> = { ...newRow };

          const csvKeys = Object.keys(row);

          // Update column titles based on CSV headers if they exist and onColumnsChange is provided
          // We only want to do this once per file upload, not for every row, so check index
          if (
            onColumnsChange &&
            csvKeys.length > 0 &&
            parsedData.indexOf(row) === 0
          ) {
            const updatedColumns = columns.map((col, colIndex) => {
              if (colIndex < csvKeys.length) {
                // Keep the A, B, C prefix if it exists in the original title
                const prefixMatch = col.title.match(/^([A-Z]\s*\()/);
                const csvKey = csvKeys[colIndex];
                const newTitle =
                  prefixMatch && csvKey
                    ? `${prefixMatch[1]}${csvKey})`
                    : (csvKey ?? col.title);
                return { ...col, title: newTitle };
              }
              return col;
            });
            // Only update if titles actually changed
            const hasChanges = updatedColumns.some(
              (col, i) => col.title !== columns[i]?.title
            );
            if (hasChanges) {
              // We defer the column update slightly to avoid state update conflicts during parsing
              setTimeout(() => onColumnsChange(updatedColumns), 0);
            }
          }

          columns.forEach((col, index) => {
            let matchedKey = csvKeys.find(
              (k) =>
                k.trim().toLowerCase() === col.title.trim().toLowerCase() ||
                k.trim().toLowerCase() === String(col.key).trim().toLowerCase()
            );

            if (!matchedKey && index < csvKeys.length) {
              matchedKey = csvKeys[index];
            }

            if (matchedKey && row[matchedKey] !== undefined) {
              const val = row[matchedKey];
              if (col.type === 'number') {
                const num = Number(val);
                mutableRow[col.key as string] = clampNumber(
                  Number.isNaN(num) ? 0 : num,
                  col.min,
                  col.max
                );
              } else {
                mutableRow[col.key as string] = String(val);
              }
            }
          });
          return mutableRow as T;
        });

        onChange(newData);
      },
    });

    // reset input
    e.target.value = '';
  };

  return (
    <div className="flex flex-1 w-full h-full min-h-0 flex-col overflow-hidden bg-white">
      <div className="border-[#ebebeb] border-b px-5 h-14 flex items-center justify-between shrink-0">
        <h2 className="font-medium text-[#171717] text-sm uppercase tracking-wide">
          {title}
        </h2>
        <div>
          <input
            type="file"
            accept=".csv"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImportCSV}
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="ghost"
            size="sm"
            className="h-7 text-xs px-2 text-[#4d4d4d] hover:bg-[#fafafa]"
          >
            <Upload className="mr-1 size-3.5" /> {importCsvLabel}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-[#fafafa]">
        <div className="w-max min-w-full inline-block align-top">
          <table className="w-full border-collapse text-left border-b border-[#ebebeb]">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-[#ebebeb]">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border-r border-[#ebebeb] p-0 font-normal bg-[#f5f5f5] text-[#737373] relative"
                      style={{
                        width: header.getSize(),
                        minWidth: header.column.columnDef.minSize,
                      }}
                    >
                      <EditableHeader column={header.column} table={table} />
                    </th>
                  ))}
                  {onColumnsChange && (
                    <th className="p-0 w-10 min-w-[40px] bg-[#f5f5f5]">
                      <button
                        type="button"
                        onClick={handleAddColumn}
                        className="w-full h-[34px] flex items-center justify-center text-[#737373] hover:bg-[#ebebeb] transition-colors"
                        title="Add Column"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </th>
                  )}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[#ebebeb] bg-white hover:bg-[#fafafa]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border-r border-[#ebebeb] p-0 relative"
                      style={{
                        width: cell.column.getSize(),
                        minWidth: cell.column.columnDef.minSize,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                  {onColumnsChange && (
                    <td className="p-0 w-10 min-w-[40px]"></td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={handleAddRow}
            className="w-full h-10 flex items-center justify-start px-5 text-sm text-[#737373] hover:bg-[#ebebeb] hover:text-[#171717] transition-colors bg-white border-b border-[#ebebeb]"
            title="Add Row"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Row
          </button>
        </div>
      </div>
    </div>
  );
}
