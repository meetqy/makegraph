'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { ChartConfigPanel } from '~/app/charts/bar-chart-race/_components/chart-config';
import { ChartPreview } from '~/app/charts/bar-chart-race/_components/chart-preview';
import type {
  CategoryColorEntry,
  CategoryColorMap,
  ChartDataRow,
  ChartSettings,
} from '~/app/charts/bar-chart-race/_components/types';

// 默认调色板：用户没有手动调整时按出现顺序依次分配
const defaultPalette = [
  '#171717',
  '#3b82f6',
  '#7c3aed',
  '#ef4444',
  '#f59e0b',
  '#10b981',
  '#14b8a6',
  '#ec4899',
  '#8b5cf6',
  '#0ea5e9',
  '#f97316',
  '#22c55e',
];

const initialData: ChartDataRow[] = [
  { time: '2019', name: 'Apple', value: 950 },
  { time: '2019', name: 'Microsoft', value: 880 },
  { time: '2019', name: 'Amazon', value: 860 },
  { time: '2019', name: 'Google', value: 780 },
  { time: '2019', name: 'Tesla', value: 120 },
  { time: '2020', name: 'Apple', value: 1260 },
  { time: '2020', name: 'Microsoft', value: 1120 },
  { time: '2020', name: 'Amazon', value: 1090 },
  { time: '2020', name: 'Google', value: 980 },
  { time: '2020', name: 'Tesla', value: 410 },
  { time: '2021', name: 'Apple', value: 1520 },
  { time: '2021', name: 'Microsoft', value: 1480 },
  { time: '2021', name: 'Google', value: 1320 },
  { time: '2021', name: 'Amazon', value: 1290 },
  { time: '2021', name: 'Tesla', value: 720 },
  { time: '2022', name: 'Apple', value: 1450 },
  { time: '2022', name: 'Microsoft', value: 1390 },
  { time: '2022', name: 'Google', value: 1250 },
  { time: '2022', name: 'Amazon', value: 1180 },
  { time: '2022', name: 'Tesla', value: 670 },
  { time: '2023', name: 'Microsoft', value: 1680 },
  { time: '2023', name: 'Apple', value: 1610 },
  { time: '2023', name: 'Google', value: 1480 },
  { time: '2023', name: 'Amazon', value: 1410 },
  { time: '2023', name: 'Tesla', value: 760 },
];

const initialSettings: ChartSettings = {
  title: 'Top Companies by Market Cap',
  seriesLabel: 'Market Cap (B)',
  topCount: 5,
  playbackMs: 1800,
  showGrid: true,
  showValues: true,
  loop: true,
};

export function BarChartRaceMaker() {
  const [data, setData] = useState<ChartDataRow[]>(initialData);
  const [settings, setSettings] = useState<ChartSettings>(initialSettings);
  // 维护每个名称对应的颜色；新增类别时自动从 defaultPalette 顺序分配
  const [categoryColors, setCategoryColors] = useState<CategoryColorMap>({});

  // 当数据变化时，把新出现的类别补上默认颜色，已存在的颜色保持不变
  useEffect(() => {
    setCategoryColors((current) => {
      let changed = false;
      const next: CategoryColorMap = { ...current };
      let paletteIndex = 0;

      for (const row of data) {
        const name = row.name.trim();
        if (!name || next[name]) {
          continue;
        }

        // 找一个当前还没有被使用的调色板颜色
        const usedColors = new Set(Object.values(next));
        let assigned =
          defaultPalette[paletteIndex % defaultPalette.length] ?? '#171717';
        while (usedColors.has(assigned)) {
          paletteIndex += 1;
          assigned =
            defaultPalette[paletteIndex % defaultPalette.length] ?? '#171717';
        }
        next[name] = assigned;
        paletteIndex += 1;
        changed = true;
      }

      return changed ? next : current;
    });
  }, [data]);

  // 按数据中首次出现顺序组织类别列表，供配置面板渲染
  const categoryList = useMemo<CategoryColorEntry[]>(() => {
    const seen = new Set<string>();
    const list: CategoryColorEntry[] = [];
    for (const row of data) {
      const name = row.name.trim();
      if (!name || seen.has(name)) {
        continue;
      }
      seen.add(name);
      list.push({
        name,
        color: categoryColors[name] ?? defaultPalette[0] ?? '#171717',
      });
    }
    return list;
  }, [data, categoryColors]);

  const handleCategoryColorChange = useCallback(
    (name: string, color: string) => {
      setCategoryColors((current) => ({ ...current, [name]: color }));
    },
    []
  );

  const columns = useMemo<DataTableColumn<ChartDataRow>[]>(
    () => [
      {
        key: 'time',
        title: 'A (Time)',
        type: 'text',
        minWidth: 120,
      },
      {
        key: 'name',
        title: 'B (Category)',
        type: 'text',
        minWidth: 140,
      },
      {
        key: 'value',
        title: 'C (Value)',
        type: 'number',
        minWidth: 120,
      },
    ],
    []
  );

  const defaultNewRow = () => ({
    time: data[data.length - 1]?.time ?? '2024',
    name: `Item ${data.length + 1}`,
    value: 100,
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
            defaultNewRow={defaultNewRow}
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto xl:flex-none">
          <ChartPreview
            data={data}
            settings={settings}
            categoryColors={categoryColors}
          />
        </div>

        <div className="hidden h-full min-h-0 flex-col overflow-hidden xl:-mr-px xl:flex">
          <ChartConfigPanel
            settings={settings}
            onChange={setSettings}
            categories={categoryList}
            onCategoryColorChange={handleCategoryColorChange}
          />
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
                <ChartConfigPanel
                  settings={settings}
                  onChange={setSettings}
                  categories={categoryList}
                  onCategoryColorChange={handleCategoryColorChange}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
