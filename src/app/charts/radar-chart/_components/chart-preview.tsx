import { useMemo, useRef } from 'react';
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { BaseTickContentProps } from 'recharts';
import { ChartExporter } from '~/components/chart-exporter';
import type { ChartDataRow, ChartSettings } from './radar-chart-maker';

type ChartPreviewProps = {
  data: ChartDataRow[];
  settings: ChartSettings;
};

function renderRadiusTick({ payload, x, y }: BaseTickContentProps) {
  const numericX = Number(x);
  const numericY = Number(y);

  return (
    <text
      x={numericX}
      y={numericY + 14}
      fill="#888888"
      fontSize={12}
      textAnchor="middle"
    >
      {payload.value}
    </text>
  );
}

export function ChartPreview({ data, settings }: ChartPreviewProps) {
  const exportTargetRef = useRef<HTMLDivElement>(null);

  const normalizedData = useMemo(
    () => data.map((item) => ({ ...item, value: Number(item.value) || 0 })),
    [data]
  );

  const maxValue = useMemo(() => {
    const values = normalizedData.map((item) => item.value);
    const candidate = values.length > 0 ? Math.max(...values) : 100;
    return candidate > 0 ? Math.ceil(candidate / 10) * 10 : 100;
  }, [normalizedData]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-white">
      <div className="flex h-14 shrink-0 items-center justify-between border-[#ebebeb] border-b px-6">
        <h2 className="font-medium text-[#171717] text-sm uppercase tracking-wide">
          Graph
        </h2>
        <ChartExporter targetRef={exportTargetRef} filename="radar-chart" />
      </div>

      <div className="flex w-full flex-1 overflow-x-auto">
        <div
          ref={exportTargetRef}
          className="mx-auto flex h-full min-w-[700px] w-full flex-col items-center justify-center p-4 sm:p-6"
        >
          {settings.title && (
            <h3 className="mb-6 shrink-0 font-medium text-[#171717] text-xl">
              {settings.title}
            </h3>
          )}

          <div className="h-full min-h-[320px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={normalizedData}
                margin={{ top: 20, right: 24, bottom: 20, left: 24 }}
              >
                {settings.showGrid && <PolarGrid stroke="#ebebeb" />}
                <PolarAngleAxis
                  dataKey="name"
                  tick={{ fill: '#888888', fontSize: 13 }}
                />
                {settings.showGrid && (
                  <PolarRadiusAxis
                    angle={90}
                    axisLine={false}
                    tick={renderRadiusTick}
                    tickCount={6}
                    domain={[0, maxValue]}
                  />
                )}
                <Tooltip
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
                <Radar
                  dataKey="value"
                  name={settings.seriesLabel || 'Value'}
                  stroke={settings.color}
                  fill={settings.color}
                  fillOpacity={settings.fillOpacity / 100}
                  strokeWidth={2.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
