'use client';

import type React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
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
  data: T[];
  onChange: (data: T[]) => void;
  columns: DataTableColumn<T>[];
  defaultNewRow: T | (() => T);
};

export function DataTableEditor<T extends Record<string, unknown>>({
  title = 'Data Editor',
  data,
  onChange,
  columns,
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

    const observer = new ResizeObserver(updateHeight);
    observer.observe(gridContainerRef.current);

    return () => observer.disconnect();
  }, []);

  const addRow = () => {
    const newRow =
      typeof defaultNewRow === 'function'
        ? (defaultNewRow as () => T)()
        : { ...defaultNewRow };
    onChange([...data, newRow]);
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
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white">
      <div className="px-5 h-14 flex items-center justify-between shrink-0">
        <h2 className="font-medium text-[#171717] text-sm uppercase tracking-wide">
          {title}
        </h2>
        <Button
          onClick={addRow}
          variant="ghost"
          size="sm"
          className="h-7 text-xs px-2 text-[#4d4d4d] hover:bg-[#fafafa]"
        >
          <Plus className="mr-1 size-3.5" /> Add Row
        </Button>
      </div>

      <div ref={gridContainerRef} className="min-h-0 flex-1 bg-[#fafafa]">
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
            className="border-none bg-white"
            style={{ '--dsg-border-color': '#ebebeb' } as React.CSSProperties}
          />
        ) : null}
      </div>
    </div>
  );
}
