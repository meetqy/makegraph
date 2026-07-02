'use client';

import { useState } from 'react';
import { Settings, Table } from 'lucide-react';
import {
  DataTableEditor,
  type DataTableColumn,
} from '~/components/data-table-editor';
import { Button } from '~/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet';
import { ChartConfigPanel } from './chart-config';
import { ChartPreview } from './chart-preview';

export type ChartDataRow = {
  category: string;
  value: number;
};

export type ChartSettings = {
  barSeriesLabel: string;
  lineSeriesLabel: string;
  countAxisLabel: string;
  percentageAxisLabel: string;
  barColor: string;
  lineColor: string;
  showLegend: boolean;
  showGrid: boolean;
  showValueLabels: boolean;
  sortDescending: boolean;
  showTargetLine: boolean;
  targetPercentage: number;
};

const initialData: ChartDataRow[] = [
  { category: 'Late Delivery', value: 42 },
  { category: 'Damaged Package', value: 23 },
  { category: 'Wrong Item', value: 16 },
  { category: 'Billing Error', value: 11 },
  { category: 'Missing Part', value: 8 },
  { category: 'Other', value: 5 },
];

const initialSettings: ChartSettings = {
  barSeriesLabel: 'Issue Count',
  lineSeriesLabel: 'Cumulative %',
  countAxisLabel: 'Count',
  percentageAxisLabel: 'Cumulative Percentage',
  barColor: '#171717',
  lineColor: '#2563eb',
  showLegend: true,
  showGrid: true,
  showValueLabels: false,
  sortDescending: true,
  showTargetLine: true,
  targetPercentage: 80,
};

export function ParetoChartMaker() {
  const [data, setData] = useState<ChartDataRow[]>(initialData);
  const [settings, setSettings] = useState<ChartSettings>(initialSettings);

  const [columns, setColumns] = useState<DataTableColumn<ChartDataRow>[]>([
    {
      key: 'category',
      title: 'A (Category)',
      type: 'text',
      minWidth: 160,
    },
    {
      key: 'value',
      title: 'B (Value)',
      type: 'number',
      minWidth: 120,
    },
  ]);

  const defaultNewRow = () => ({
    category: `Issue ${data.length + 1}`,
    value: 10,
  });

  return (
    <>
      <style>{`
        @media (max-width: 1279px) {
          body {
            padding-bottom: calc(5rem + env(safe-area-inset-bottom)) !important;
          }
        }
      `}</style>
      <div className="relative flex h-full w-full flex-col divide-[#ebebeb] overflow-hidden bg-white pb-[calc(6rem+env(safe-area-inset-bottom))] xl:grid xl:grid-cols-[420px_1fr_320px] xl:grid-rows-[1fr] xl:divide-x xl:pb-0">
        <div className="hidden h-full min-h-[400px] flex-col xl:flex xl:min-h-0">
          <DataTableEditor
            data={data}
            onChange={setData}
            columns={columns}
            onColumnsChange={setColumns}
            defaultNewRow={defaultNewRow}
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto xl:flex-none">
          <ChartPreview data={data} settings={settings} />
        </div>

        <div className="hidden h-full min-h-0 flex-col overflow-hidden xl:-mr-px xl:flex">
          <ChartConfigPanel settings={settings} onChange={setSettings} />
        </div>

        <div className="fixed right-0 bottom-0 left-0 z-50 flex items-center gap-4 border-[#ebebeb] border-t bg-white px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] xl:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="h-10 flex-1 border-[#ebebeb] shadow-none"
              >
                <Table className="mr-2 h-4 w-4" />
                Data Editor
              </Button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              showCloseButton={false}
              className="flex flex-col p-0 data-[side=bottom]:h-[85vh] sm:max-w-none"
            >
              <SheetTitle className="sr-only">Data Editor</SheetTitle>
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                <DataTableEditor
                  data={data}
                  onChange={setData}
                  columns={columns}
                  onColumnsChange={setColumns}
                  defaultNewRow={defaultNewRow}
                />
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="h-10 flex-1 border-[#ebebeb] shadow-none"
              >
                <Settings className="mr-2 h-4 w-4" />
                Customize
              </Button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              showCloseButton={false}
              className="flex flex-col p-0 data-[side=bottom]:h-[85vh] sm:max-w-none"
            >
              <SheetTitle className="sr-only">Customize</SheetTitle>
              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
                <ChartConfigPanel settings={settings} onChange={setSettings} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
