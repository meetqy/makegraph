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
  ageGroup: string;
  male: number;
  female: number;
};

export type ChartSettings = {
  title: string;
  leftSeriesLabel: string;
  rightSeriesLabel: string;
  leftColor: string;
  rightColor: string;
  showLegend: boolean;
  showValues: boolean;
};

const initialData: ChartDataRow[] = [
  { ageGroup: '80+', male: 220, female: 310 },
  { ageGroup: '70-79', male: 360, female: 430 },
  { ageGroup: '60-69', male: 510, female: 560 },
  { ageGroup: '50-59', male: 640, female: 670 },
  { ageGroup: '40-49', male: 710, female: 690 },
  { ageGroup: '30-39', male: 760, female: 730 },
  { ageGroup: '20-29', male: 680, female: 650 },
  { ageGroup: '10-19', male: 590, female: 560 },
  { ageGroup: '0-9', male: 520, female: 500 },
];

const initialSettings: ChartSettings = {
  title: 'Population Pyramid by Age Group',
  leftSeriesLabel: 'Female',
  rightSeriesLabel: 'Male',
  leftColor: '#f97316',
  rightColor: '#4b5563',
  showLegend: true,
  showValues: true,
};

export type PopulationPyramidMakerProps = {
  initialData?: ChartDataRow[];
  initialSettings?: ChartSettings;
};

export function PopulationPyramidMaker({
  initialData: providedData,
  initialSettings: providedSettings,
}: PopulationPyramidMakerProps = {}) {
  const [data, setData] = useState<ChartDataRow[]>(providedData ?? initialData);
  const [settings, setSettings] = useState<ChartSettings>(
    providedSettings ?? initialSettings
  );

  const [columns, setColumns] = useState<DataTableColumn<ChartDataRow>[]>([
    {
      key: 'ageGroup',
      title: 'A (Age Group)',
      type: 'text',
      minWidth: 140,
    },
    {
      key: 'male',
      title: 'B (Male)',
      type: 'number',
      minWidth: 120,
    },
    {
      key: 'female',
      title: 'C (Female)',
      type: 'number',
      minWidth: 120,
    },
  ]);

  const defaultNewRow = () => ({
    ageGroup: `${data.length * 10}-${data.length * 10 + 9}`,
    male: 100,
    female: 100,
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
        {/* 桌面端：数据编辑器 */}
        <div className="hidden h-full min-h-[400px] flex-col xl:flex xl:min-h-0">
          <DataTableEditor
            data={data}
            onChange={setData}
            columns={columns}
            onColumnsChange={setColumns}
            defaultNewRow={defaultNewRow}
          />
        </div>

        {/* 预览区域（共享） */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto xl:flex-none">
          <ChartPreview data={data} settings={settings} />
        </div>

        {/* 桌面端：配置面板 */}
        <div className="hidden h-full min-h-0 flex-col overflow-hidden xl:-mr-px xl:flex">
          <ChartConfigPanel settings={settings} onChange={setSettings} />
        </div>

        {/* 移动端：底部操作栏 */}
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
