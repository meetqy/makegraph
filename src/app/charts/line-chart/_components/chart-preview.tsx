import { useRef } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartExporter } from '~/components/chart-exporter';
import type { ChartDataRow, ChartSettings } from './line-chart-maker';

type ChartPreviewProps = {
  data: ChartDataRow[];
  settings: ChartSettings;
};

export function ChartPreview({ data, settings }: ChartPreviewProps) {
  // 导出目标容器：包含标题和图表本体，PNG 导出会基于这个容器渲染
  const exportTargetRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-1 flex-col bg-white overflow-hidden">
      <div className="flex items-center justify-between border-[#ebebeb] border-b px-6 h-14 shrink-0">
        <h2 className="font-medium text-[#171717] text-sm uppercase tracking-wide">
          Graph
        </h2>
        <ChartExporter targetRef={exportTargetRef} filename="line-chart" />
      </div>

      <div className="flex w-full flex-1 overflow-x-auto">
        <div
          ref={exportTargetRef}
          className="flex flex-col items-center justify-center min-w-[700px] w-full h-full p-4 sm:p-6 mx-auto"
        >
          {settings.title && (
            <h3 className="mb-6 font-medium text-[#171717] text-xl shrink-0">
              {settings.title}
            </h3>
          )}

          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 20, right: 12, left: 12, bottom: 20 }}
              >
                {settings.showGrid && (
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="#ebebeb"
                  />
                )}
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#888888', fontSize: 13 }}
                  padding={{ left: 12, right: 12 }}
                  dy={10}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#888888', fontSize: 13 }}
                  dx={-10}
                />
                <Tooltip
                  cursor={{ stroke: '#d4d4d4', strokeDasharray: '4 4' }}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #ebebeb',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                    fontSize: '13px',
                  }}
                  itemStyle={{ color: '#171717', fontWeight: 500 }}
                />
                {settings.showLegend && (
                  <Legend
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: '13px',
                      color: '#4d4d4d',
                      paddingTop: '20px',
                    }}
                  />
                )}
                <Line
                  dataKey="value"
                  name={settings.seriesLabel || 'Value'}
                  stroke={settings.color}
                  strokeWidth={3}
                  dot={{ r: 4, fill: settings.color, strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: settings.color, strokeWidth: 0 }}
                  type="monotone"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
