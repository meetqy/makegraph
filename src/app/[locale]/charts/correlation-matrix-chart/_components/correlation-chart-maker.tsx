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
  xVariable: string;
  yVariable: string;
  correlation: number;
};

export type ChartSettings = {
  title: string;
  positiveColor: string;
  showGrid: boolean;
};

const initialData: ChartDataRow[] = [
  {
    xVariable: 'Revenue',
    yVariable: 'Marketing Spend',
    correlation: 0.82,
  },
  {
    xVariable: 'Revenue',
    yVariable: 'Conversion Rate',
    correlation: 0.68,
  },
  {
    xVariable: 'Revenue',
    yVariable: 'Customer Satisfaction',
    correlation: 0.55,
  },
  {
    xVariable: 'Revenue',
    yVariable: 'Support Tickets',
    correlation: -0.44,
  },
  {
    xVariable: 'Marketing Spend',
    yVariable: 'Conversion Rate',
    correlation: 0.49,
  },
  {
    xVariable: 'Marketing Spend',
    yVariable: 'Customer Satisfaction',
    correlation: 0.23,
  },
  {
    xVariable: 'Marketing Spend',
    yVariable: 'Support Tickets',
    correlation: -0.19,
  },
  {
    xVariable: 'Conversion Rate',
    yVariable: 'Customer Satisfaction',
    correlation: 0.61,
  },
  {
    xVariable: 'Conversion Rate',
    yVariable: 'Support Tickets',
    correlation: -0.52,
  },
  {
    xVariable: 'Customer Satisfaction',
    yVariable: 'Support Tickets',
    correlation: -0.71,
  },
];

const initialSettings: ChartSettings = {
  title: 'Marketing KPI Correlation Matrix',
  positiveColor: '#f97316',
  showGrid: true,
};

export function CorrelationChartMaker() {
  const [data, setData] = useState<ChartDataRow[]>(initialData);
  const [settings, setSettings] = useState<ChartSettings>(initialSettings);

  const [columns, setColumns] = useState<DataTableColumn<ChartDataRow>[]>([
    {
      key: 'xVariable',
      title: 'Variable A',
      type: 'text',
      minWidth: 150,
    },
    {
      key: 'yVariable',
      title: 'Variable B',
      type: 'text',
      minWidth: 150,
    },
    {
      key: 'correlation',
      title: 'Correlation Matrix Value',
      type: 'number',
      min: -1,
      max: 1,
      minWidth: 130,
    },
  ]);

  const defaultNewRow = () => ({
    xVariable: `Metric ${data.length + 1}`,
    yVariable: `Metric ${data.length + 2}`,
    correlation: 0,
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
      <div className="relative flex h-full w-full flex-col divide-[#ebebeb] overflow-hidden bg-white pb-[calc(6rem+env(safe-area-inset-bottom))] xl:grid xl:grid-cols-[440px_1fr_320px] xl:grid-rows-[1fr] xl:divide-x xl:pb-0">
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
