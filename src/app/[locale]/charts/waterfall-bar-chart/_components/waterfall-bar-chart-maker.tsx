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
  value: number;
};

export type ChartSettings = {
  title: string;
  totalSeriesLabel: string;
  color: string;
  showGrid: boolean;
  showValues: boolean;
  showConnector: boolean;
};

export type WaterfallBarChartMakerProps = {
  initialData?: ChartDataRow[];
  initialSettings?: ChartSettings;
};

const DEFAULT_TOTAL_SERIES_LABEL = 'Net Total';

const DEFAULT_INITIAL_DATA: ChartDataRow[] = [
  { name: 'Starting Revenue', value: 420 },
  { name: 'Discounts', value: -90 },
  { name: 'Expansion Sales', value: 180 },
  { name: 'Refunds', value: -55 },
  { name: 'Service Costs', value: -40 },
  { name: 'Upsell Programs', value: 120 },
];

const DEFAULT_INITIAL_SETTINGS: ChartSettings = {
  title: 'Quarterly Revenue Bridge',
  totalSeriesLabel: DEFAULT_TOTAL_SERIES_LABEL,
  color: '#3b82f6',
  showGrid: true,
  showValues: true,
  showConnector: true,
};

export function WaterfallBarChartMaker({
  initialData: providedData,
  initialSettings: providedSettings,
}: WaterfallBarChartMakerProps = {}) {
  const t = useTranslations('WaterfallBarChart');
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
        minWidth: 160,
      },
      {
        key: 'value',
        title: t('editorColumnValue'),
        type: 'number',
        minWidth: 140,
      },
    ]
  );

  const defaultNewRow = useMemo(
    () => () => ({
      name: `Step ${data.length + 1}`,
      value: 50,
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
