'use client';

import { useState, useMemo } from 'react';
import { ChartConfigPanel } from './chart-config';
import { ChartPreview } from './chart-preview';
import {
  DataTableEditor,
  type DataTableColumn,
} from '~/components/data-table-editor';

export type ChartDataRow = {
  name: string;
  value: number;
};

export type ChartSettings = {
  title: string;
  yAxisLabel: string;
  color: string;
  showLegend: boolean;
  showGrid: boolean;
};

const initialData: ChartDataRow[] = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 278 },
  { name: 'May', value: 189 },
  { name: 'Jun', value: 239 },
];

const initialSettings: ChartSettings = {
  title: 'Monthly Revenue',
  yAxisLabel: 'Revenue ($)',
  color: '#171717',
  showLegend: true,
  showGrid: true,
};

export function BarChartMaker() {
  const [data, setData] = useState<ChartDataRow[]>(initialData);
  const [settings, setSettings] = useState<ChartSettings>(initialSettings);

  const columns = useMemo<DataTableColumn<ChartDataRow>[]>(
    () => [
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
    ],
    []
  );

  const defaultNewRow = () => ({
    name: `Item ${data.length + 1}`,
    value: 100,
  });

  return (
    <div className="grid w-full h-full grid-cols-1 xl:grid-cols-[400px_1fr_300px] xl:grid-rows-[1fr] overflow-hidden divide-y xl:divide-y-0 xl:divide-x divide-[#ebebeb] bg-white">
      <div className="flex flex-col h-full min-h-[400px] xl:min-h-0">
        <DataTableEditor
          data={data}
          onChange={setData}
          columns={columns}
          defaultNewRow={defaultNewRow}
        />
      </div>

      <div className="flex flex-col h-full min-h-[400px] xl:min-h-0 overflow-y-auto">
        <ChartPreview data={data} settings={settings} />
      </div>

      <div className="flex flex-col h-full min-h-0 overflow-y-auto">
        <ChartConfigPanel settings={settings} onChange={setSettings} />
      </div>
    </div>
  );
}
