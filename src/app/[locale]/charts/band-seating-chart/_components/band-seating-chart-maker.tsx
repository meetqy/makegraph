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
  rowLabel: string;
  seatCount: number;
};

export type ChartSettings = {
  rotation: number;
  rowGap: number;
  seatSize: number;
};

export type BandSeatingChartMakerProps = {
  initialData?: ChartDataRow[];
  initialSettings?: ChartSettings;
};

const DEFAULT_INITIAL_DATA: ChartDataRow[] = [
  { rowLabel: 'A', seatCount: 8 },
  { rowLabel: 'B', seatCount: 10 },
  { rowLabel: 'C', seatCount: 12 },
  { rowLabel: 'D', seatCount: 14 },
  { rowLabel: 'E', seatCount: 16 },
];

const DEFAULT_INITIAL_SETTINGS: ChartSettings = {
  rotation: 90,
  rowGap: 44,
  seatSize: 16,
};

function getNextRowLabel(index: number) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (index < alphabet.length) {
    return alphabet[index] ?? `Row ${index + 1}`;
  }

  return `Row ${index + 1}`;
}

export function BandSeatingChartMaker({
  initialData: providedData,
  initialSettings: providedSettings,
}: BandSeatingChartMakerProps = {}) {
  const t = useTranslations('BandSeatingChart');
  const [data, setData] = useState<ChartDataRow[]>(
    providedData ?? DEFAULT_INITIAL_DATA
  );
  const [settings, setSettings] = useState<ChartSettings>(
    providedSettings ?? DEFAULT_INITIAL_SETTINGS
  );

  const [columns, setColumns] = useState<DataTableColumn<ChartDataRow>[]>(
    () => [
      {
        key: 'rowLabel',
        title: t('editorColumnRowLabel'),
        type: 'text',
        minWidth: 150,
      },
      {
        key: 'seatCount',
        title: t('editorColumnSeatCount'),
        type: 'number',
        minWidth: 150,
      },
    ]
  );

  const defaultNewRow = useMemo(
    () => () => ({
      rowLabel: getNextRowLabel(data.length),
      seatCount: 10,
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
      <div className="relative flex h-full w-full flex-col overflow-hidden divide-[#ebebeb] bg-white pb-[calc(6rem+env(safe-area-inset-bottom))] xl:grid xl:grid-cols-[380px_1fr_300px] xl:grid-rows-[1fr] xl:divide-x xl:pb-0">
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

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden xl:flex-none">
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
