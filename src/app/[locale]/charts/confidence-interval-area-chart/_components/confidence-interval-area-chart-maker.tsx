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
  label: string;
  estimate: number;
  lower: number;
  upper: number;
};

export type ChartSettings = {
  title: string;
  trendLabel: string;
  intervalLabel: string;
  yAxisLabel: string;
  lineColor: string;
  showLegend: boolean;
  showGrid: boolean;
};

const initialData: ChartDataRow[] = [
  { label: 'Week 1', estimate: 120, lower: 108, upper: 132 },
  { label: 'Week 2', estimate: 128, lower: 116, upper: 141 },
  { label: 'Week 3', estimate: 137, lower: 123, upper: 151 },
  { label: 'Week 4', estimate: 149, lower: 133, upper: 165 },
  { label: 'Week 5', estimate: 158, lower: 141, upper: 176 },
  { label: 'Week 6', estimate: 166, lower: 148, upper: 185 },
];

const initialSettings: ChartSettings = {
  title: 'Demand Forecast With 95% Confidence Interval',
  trendLabel: 'Forecast',
  intervalLabel: '95% Confidence Interval',
  yAxisLabel: 'Orders',
  lineColor: '#171717',
  showLegend: true,
  showGrid: true,
};

export function ConfidenceIntervalAreaChartMaker() {
  const [data, setData] = useState<ChartDataRow[]>(initialData);
  const [settings, setSettings] = useState<ChartSettings>(initialSettings);

  const [columns, setColumns] = useState<DataTableColumn<ChartDataRow>[]>([
    {
      key: 'label',
      title: 'A (Label)',
      type: 'text',
      minWidth: 140,
    },
    {
      key: 'estimate',
      title: 'B (Estimate)',
      type: 'number',
      minWidth: 120,
    },
    {
      key: 'lower',
      title: 'C (Lower)',
      type: 'number',
      minWidth: 120,
    },
    {
      key: 'upper',
      title: 'D (Upper)',
      type: 'number',
      minWidth: 120,
    },
  ]);

  const defaultNewRow = () => ({
    label: `Period ${data.length + 1}`,
    estimate: 100,
    lower: 90,
    upper: 110,
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
      <div className="relative flex h-full w-full flex-col divide-[#ebebeb] overflow-hidden bg-white pb-[calc(6rem+env(safe-area-inset-bottom))] xl:grid xl:grid-cols-[460px_1fr_320px] xl:grid-rows-[1fr] xl:divide-x xl:pb-0">
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
