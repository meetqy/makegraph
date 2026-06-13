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

export function WaterfallBarChartMaker({
  initialData: providedData,
  initialSettings: providedSettings,
}: WaterfallBarChartMakerProps = {}) {
  const t = useTranslations('WaterfallBarChart');
  const localizedInitialData = useMemo<ChartDataRow[]>(
    () => [
      { name: t('editorSampleName1'), value: 420 },
      { name: t('editorSampleName2'), value: -90 },
      { name: t('editorSampleName3'), value: 180 },
      { name: t('editorSampleName4'), value: -55 },
      { name: t('editorSampleName5'), value: -40 },
      { name: t('editorSampleName6'), value: 120 },
    ],
    [t]
  );
  const localizedInitialSettings = useMemo<ChartSettings>(
    () => ({
      title: t('editorDefaultChartTitle'),
      totalSeriesLabel: t('editorDefaultTotalLabel'),
      color: '#3b82f6',
      showGrid: true,
      showValues: true,
      showConnector: true,
    }),
    [t]
  );
  const [data, setData] = useState<ChartDataRow[]>(
    providedData ?? localizedInitialData
  );
  const [settings, setSettings] = useState<ChartSettings>(
    providedSettings ?? localizedInitialSettings
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
      name: `${t('editorNewItemPrefix')} ${data.length + 1}`,
      value: 50,
    }),
    [data.length, t]
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
