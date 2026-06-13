'use client';

import type React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import Papa from 'papaparse';
import {
  DataSheetGrid,
  floatColumn,
  keyColumn,
  textColumn,
  type Column,
} from 'react-datasheet-grid';
import { Button } from '~/components/ui/button';

export type DataTableColumn<T> = {
  key: Extract<keyof T, string>;
  title: string;
  type: 'text' | 'number';
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
  const gridContainerRef = useRef<HTMLDivElement | null>(null);
  const [gridHeight, setGridHeight] = useState(0);

  useEffect(() => {
    if (!gridContainerRef.current) return;

    const updateHeight = () => {
      const nextHeight = gridContainerRef.current?.clientHeight ?? 0;
      setGridHeight(nextHeight);
    };

    updateHeight();
    const timeout = setTimeout(updateHeight, 100); // Fallback for delayed portal layouts

    const observer = new ResizeObserver(updateHeight);
    observer.observe(gridContainerRef.current);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
                mutableRow[col.key as string] = Number.isNaN(num) ? 0 : num;
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

  const normalizeData = (rows: T[]) => {
    return rows.map((row) => {
      const nextRow = { ...row };
      const mutableRow: Record<string, unknown> = nextRow;
      for (const col of columns) {
        const rawValue = nextRow[col.key];
        if (col.type === 'number') {
          const parsed =
            typeof rawValue === 'number' ? rawValue : Number(rawValue ?? 0);
          mutableRow[col.key] = Number.isFinite(parsed) ? parsed : 0;
        } else {
          mutableRow[col.key] = rawValue == null ? '' : String(rawValue);
        }
      }
      return nextRow;
    });
  };

  const gridColumns = useMemo<Column<T>[]>(() => {
    return columns.map((col) => {
      const base = col.type === 'number' ? floatColumn : textColumn;
      const keyedColumn = keyColumn(
        col.key,
        base as unknown as Partial<
          Column<T[Extract<keyof T, string>], unknown, string>
        >
      ) as Column<T>;

      return {
        ...keyedColumn,
        title: col.title,
        minWidth: col.minWidth ?? 120,
        basis: col.width ?? 170,
        grow: 1,
        shrink: 0,
      };
    });
  }, [columns]);

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

      <div
        ref={gridContainerRef}
        className="min-h-0 flex-1 bg-[#fafafa] -mr-px"
      >
        {gridHeight > 0 ? (
          <DataSheetGrid
            value={data}
            onChange={(rows) => onChange(normalizeData(rows))}
            columns={gridColumns}
            createRow={() =>
              typeof defaultNewRow === 'function'
                ? (defaultNewRow as () => T)()
                : { ...defaultNewRow }
            }
            addRowsComponent={false}
            autoAddRow={false}
            rowHeight={34}
            headerRowHeight={34}
            height={gridHeight}
            className="data-editor-grid border-none bg-white"
            style={{ '--dsg-border-color': '#ebebeb' } as React.CSSProperties}
          />
        ) : null}
      </div>
    </div>
  );
}
