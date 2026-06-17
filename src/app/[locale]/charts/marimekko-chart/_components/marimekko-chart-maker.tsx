'use client';

import { useMemo, useState } from 'react';
import { Settings, Table } from 'lucide-react';
import { useTranslations } from 'next-intl';
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
  value1: number;
  value2: number;
  value3: number;
};

export type ChartSettings = {
  title: string;
  seriesLabel1: string;
  seriesLabel2: string;
  seriesLabel3: string;
  color1: string;
  color2: string;
  color3: string;
  showLegend: boolean;
  showGrid: boolean;
  showValues: boolean;
};

export type MarimekkoChartMakerProps = {
  initialData?: ChartDataRow[];
  initialSettings?: ChartSettings;
};

const DEFAULT_INITIAL_DATA: ChartDataRow[] = [
  { name: 'North America', value1: 420, value2: 260, value3: 180 },
  { name: 'Europe', value1: 280, value2: 240, value3: 160 },
  { name: 'Asia Pacific', value1: 360, value2: 310, value3: 260 },
  { name: 'Latin America', value1: 140, value2: 110, value3: 70 },
];

const DEFAULT_INITIAL_SETTINGS: ChartSettings = {
  title: 'Regional Revenue Mix',
  seriesLabel1: 'Consumer',
  seriesLabel2: 'SMB',
  seriesLabel3: 'Enterprise',
  color1: '#171717',
  color2: '#525252',
  color3: '#a3a3a3',
  showLegend: true,
  showGrid: true,
  showValues: true,
};

export function MarimekkoChartMaker({
  initialData: providedData,
  initialSettings: providedSettings,
}: MarimekkoChartMakerProps = {}) {
  const t = useTranslations('MarimekkoChart');
  const [data, setData] = useState<ChartDataRow[]>(
    providedData ?? DEFAULT_INITIAL_DATA
  );
  const [settings, setSettings] = useState<ChartSettings>(
    providedSettings ?? DEFAULT_INITIAL_SETTINGS
  );

  const [columns, setColumns] = useState<DataTableColumn<ChartDataRow>[]>(
    () => [
      {
        key: 'name',
        title: t('editorColumnLabel'),
        type: 'text',
        minWidth: 150,
      },
      {
        key: 'value1',
        title: t('editorColumnValue1'),
        type: 'number',
        minWidth: 120,
      },
      {
        key: 'value2',
        title: t('editorColumnValue2'),
        type: 'number',
        minWidth: 120,
      },
      {
        key: 'value3',
        title: t('editorColumnValue3'),
        type: 'number',
        minWidth: 120,
      },
    ]
  );

  const defaultNewRow = useMemo(
    () => () => ({
      name: `Category ${data.length + 1}`,
      value1: 100,
      value2: 80,
      value3: 60,
    }),
    [data.length]
  );

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
            title={t('editorDataTitle')}
            importCsvLabel={t('editorImportCsv')}
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

        <div className="fixed right-0 bottom-0 left-0 z-50 flex items-center gap-4 border-t border-[#ebebeb] bg-white px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] xl:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="h-10 flex-1 border-[#ebebeb] shadow-none"
              >
                <Table className="mr-2 h-4 w-4" />
                {t('editorDataTitle')}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              showCloseButton={false}
              className="data-[side=bottom]:h-[85vh] flex flex-col p-0 sm:max-w-none"
            >
              <SheetTitle className="sr-only">
                {t('editorDataTitle')}
              </SheetTitle>
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                <DataTableEditor
                  title={t('editorDataTitle')}
                  importCsvLabel={t('editorImportCsv')}
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
                {t('editorCustomizeTitle')}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              showCloseButton={false}
              className="data-[side=bottom]:h-[85vh] flex flex-col p-0 sm:max-w-none"
            >
              <SheetTitle className="sr-only">
                {t('editorCustomizeTitle')}
              </SheetTitle>
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
