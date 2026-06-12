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
  name: string;
  value: number;
};

export type ChartSettings = {
  title: string;
  seriesLabel: string;
  color: string;
  showLegend: boolean;
  showGrid: boolean;
  fillOpacity: number;
};

const initialData: ChartDataRow[] = [
  { name: 'Strategy', value: 86 },
  { name: 'Execution', value: 78 },
  { name: 'Design', value: 92 },
  { name: 'Growth', value: 74 },
  { name: 'Retention', value: 81 },
  { name: 'Support', value: 69 },
];

const initialSettings: ChartSettings = {
  title: 'Team Skills Overview',
  seriesLabel: 'Score',
  color: '#171717',
  showLegend: true,
  showGrid: true,
  fillOpacity: 35,
};

export function RadarChartMaker() {
  const [data, setData] = useState<ChartDataRow[]>(initialData);
  const [settings, setSettings] = useState<ChartSettings>(initialSettings);

  const [columns, setColumns] = useState<DataTableColumn<ChartDataRow>[]>([
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
  ]);

  const defaultNewRow = () => ({
    name: `Item ${data.length + 1}`,
    value: 50,
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
      <div className="relative flex h-full w-full flex-col divide-[#ebebeb] overflow-hidden bg-white pb-[calc(6rem+env(safe-area-inset-bottom))] xl:grid xl:grid-cols-[400px_1fr_300px] xl:grid-rows-[1fr] xl:divide-x xl:pb-0">
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
