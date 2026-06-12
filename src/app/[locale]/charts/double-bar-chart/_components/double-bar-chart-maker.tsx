'use client';

import { useMemo, useState } from 'react';
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

// 定义双柱状图的数据结构
export type ChartDataRow = {
  name: string;
  value1: number;
  value2: number;
};

// 定义双柱状图的配置结构
export type ChartSettings = {
  title: string;
  yAxisLabel1: string;
  yAxisLabel2: string;
  color1: string;
  color2: string;
  showLegend: boolean;
  showGrid: boolean;
};

// 初始数据
const initialData: ChartDataRow[] = [
  { name: 'Jan', value1: 400, value2: 240 },
  { name: 'Feb', value1: 300, value2: 139 },
  { name: 'Mar', value1: 200, value2: 980 },
  { name: 'Apr', value1: 278, value2: 390 },
  { name: 'May', value1: 189, value2: 480 },
  { name: 'Jun', value1: 239, value2: 380 },
];

// 初始配置
const initialSettings: ChartSettings = {
  title: 'Revenue Comparison',
  yAxisLabel1: 'This Year',
  yAxisLabel2: 'Last Year',
  color1: '#171717',
  color2: '#a3a3a3',
  showLegend: true,
  showGrid: true,
};

export function DoubleBarChartMaker() {
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
      key: 'value1',
      title: 'B (Value 1)',
      type: 'number',
      minWidth: 120,
    },
    {
      key: 'value2',
      title: 'C (Value 2)',
      type: 'number',
      minWidth: 120,
    },
  ]);

  const defaultNewRow = () => ({
    name: `Item ${data.length + 1}`,
    value1: 100,
    value2: 80,
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
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-white pb-[calc(6rem+env(safe-area-inset-bottom))] divide-[#ebebeb] xl:grid xl:grid-cols-[400px_1fr_300px] xl:grid-rows-[1fr] xl:divide-x xl:pb-0">
        {/* 桌面端：数据编辑器 */}
        <div className="hidden xl:flex flex-col h-full min-h-[400px] xl:min-h-0">
          <DataTableEditor
            data={data}
            onChange={setData}
            columns={columns}
            onColumnsChange={setColumns}
            defaultNewRow={defaultNewRow}
          />
        </div>

        {/* 预览区域 (共享) */}
        <div className="flex flex-col h-full min-h-0 overflow-y-auto flex-1 xl:flex-none">
          <ChartPreview data={data} settings={settings} />
        </div>

        {/* 桌面端：自定义配置 */}
        <div className="hidden xl:flex flex-col h-full min-h-0 overflow-hidden xl:-mr-px">
          <ChartConfigPanel settings={settings} onChange={setSettings} />
        </div>

        {/* 移动端：底部操作栏 */}
        <div className="fixed right-0 bottom-0 left-0 z-50 flex items-center gap-4 border-[#ebebeb] border-t bg-white px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] xl:hidden">
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
