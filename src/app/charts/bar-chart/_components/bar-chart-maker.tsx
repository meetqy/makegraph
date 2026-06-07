'use client';

import { useState, useMemo } from 'react';
import { Table, Settings } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet';
import { ChartConfigPanel } from './chart-config';
import { ChartPreview } from './chart-preview';
import {
  DataTableEditor,
  type DataTableColumn,
} from '~/components/data-table-editor';

export type ChartDataRow = {
  name: string;
  value: number;
};

export type ChartSettings = {
  title: string;
  yAxisLabel: string;
  color: string;
  showLegend: boolean;
  showGrid: boolean;
};

const initialData: ChartDataRow[] = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 278 },
  { name: 'May', value: 189 },
  { name: 'Jun', value: 239 },
];

const initialSettings: ChartSettings = {
  title: 'Monthly Revenue',
  yAxisLabel: 'Revenue ($)',
  color: '#171717',
  showLegend: true,
  showGrid: true,
};

export function BarChartMaker() {
  const [data, setData] = useState<ChartDataRow[]>(initialData);
  const [settings, setSettings] = useState<ChartSettings>(initialSettings);

  const columns = useMemo<DataTableColumn<ChartDataRow>[]>(
    () => [
      {
        key: 'name',
        title: 'A (Label)',
        type: 'text',
        minWidth: 120,
      },
      {
        key: 'value',
        title: 'B (Value)',
        type: 'number',
        minWidth: 120,
      },
    ],
    []
  );

  const defaultNewRow = () => ({
    name: `Item ${data.length + 1}`,
    value: 100,
  });

  return (
    <>
      <style>{`
        @media (max-width: 1279px) {
          body {
            padding-bottom: 73px;
          }
        }
      `}</style>
      <div className="flex flex-col xl:grid w-full h-full xl:grid-cols-[400px_1fr_300px] xl:grid-rows-[1fr] overflow-hidden xl:divide-x divide-[#ebebeb] bg-white pb-[73px] xl:pb-0">
        {/* Desktop: Data Editor */}
        <div className="hidden xl:flex flex-col h-full min-h-[400px] xl:min-h-0">
          <DataTableEditor
            data={data}
            onChange={setData}
            columns={columns}
            defaultNewRow={defaultNewRow}
          />
        </div>

        {/* Preview (Shared) */}
        <div className="flex flex-col h-full min-h-0 overflow-y-auto flex-1 xl:flex-none">
          <ChartPreview data={data} settings={settings} />
        </div>

        {/* Desktop: Customize */}
        <div className="hidden xl:flex flex-col h-full min-h-0 overflow-y-auto">
          <ChartConfigPanel settings={settings} onChange={setSettings} />
        </div>

        {/* Mobile: Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 flex xl:hidden items-center border-t border-[#ebebeb] p-4 gap-4 bg-white">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 shadow-none border-[#ebebeb] h-10"
              >
                <Table className="w-4 h-4 mr-2" />
                Data Editor
              </Button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              showCloseButton={false}
              className="data-[side=bottom]:h-[85vh] p-0 flex flex-col sm:max-w-none"
            >
              <SheetTitle className="sr-only">Data Editor</SheetTitle>
              <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                <DataTableEditor
                  data={data}
                  onChange={setData}
                  columns={columns}
                  defaultNewRow={defaultNewRow}
                />
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 shadow-none border-[#ebebeb] h-10"
              >
                <Settings className="w-4 h-4 mr-2" />
                Customize
              </Button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              showCloseButton={false}
              className="data-[side=bottom]:h-[85vh] p-0 flex flex-col sm:max-w-none"
            >
              <SheetTitle className="sr-only">Customize</SheetTitle>
              <div className="flex-1 overflow-y-auto flex flex-col min-h-0">
                <ChartConfigPanel settings={settings} onChange={setSettings} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
