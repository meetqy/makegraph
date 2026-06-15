import { useMemo, useRef } from 'react';
import {
  Bar,
  BarChart,
  LabelList,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartExporter } from '~/components/chart-exporter';
import type { ChartDataRow, ChartSettings } from './population-pyramid-maker';

type ChartPreviewProps = {
  data: ChartDataRow[];
  settings: ChartSettings;
};

const GAP = 0;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    const validPayload = payload.filter(
      (p: any) => p.dataKey !== 'femaleGap' && p.dataKey !== 'maleGap'
    );
    return (
      <div className="rounded-lg border border-[#ebebeb] bg-white p-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] text-[13px]">
        <div className="mb-2 font-medium text-[#171717]">{label}</div>
        {validPayload.map((p: any) => (
          <div
            key={p.dataKey}
            className="flex items-center gap-2 font-medium text-[#171717]"
          >
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: p.color }}
            />
            <span className="text-[#888888]">{p.name}:</span>
            <span>{Math.abs(p.value).toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function ChartPreview({ data, settings }: ChartPreviewProps) {
  // 导出目标容器：包含标题和图表本体，PNG 导出会基于这个容器渲染
  const exportTargetRef = useRef<HTMLDivElement>(null);
  const chartData = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        femaleGap: -GAP,
        female: -Math.abs(item.female),
        maleGap: GAP,
        male: Math.abs(item.male),
      })),
    [data]
  );

  const { ticks, domain } = useMemo(() => {
    const maxValue = chartData.reduce((max, item) => {
      return Math.max(max, Math.abs(item.male), Math.abs(item.female));
    }, 0);

    let step = 10;
    if (maxValue > 5000) step = 1000;
    else if (maxValue > 1000) step = 500;
    else if (maxValue > 500) step = 100;
    else if (maxValue > 100) step = 50;
    else if (maxValue > 50) step = 20;

    const niceMax = Math.ceil(maxValue / step) * step + step;

    const ticksArray: number[] = [];
    for (let i = step; i < niceMax; i += step) {
      ticksArray.push(i + GAP);
      ticksArray.push(-(i + GAP));
    }

    return { ticks: ticksArray, domain: [-(niceMax + GAP), niceMax + GAP] };
  }, [chartData]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-white">
      <div className="flex h-14 shrink-0 items-center justify-between border-[#ebebeb] border-b px-6">
        <h2 className="font-medium text-[#171717] text-sm uppercase tracking-wide">
          Graph
        </h2>
        <ChartExporter
          targetRef={exportTargetRef}
          filename="population-pyramid"
        />
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

          <div className="min-h-[520px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                barCategoryGap={10}
                barGap="-100%"
                margin={{ top: 20, right: 36, left: 36, bottom: 36 }}
              >
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tick={false}
                  domain={domain}
                  ticks={ticks}
                  tickFormatter={(value) => {
                    return Math.abs(Math.abs(Number(value)) - GAP).toString();
                  }}
                />
                <YAxis
                  yAxisId="main"
                  type="category"
                  dataKey="ageGroup"
                  tickLine={false}
                  axisLine={false}
                  tick={{
                    fill: '#171717',
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                  width={60}
                  orientation="right"
                  reversed
                />
                <YAxis
                  yAxisId="secondary"
                  type="category"
                  dataKey="ageGroup"
                  hide
                  reversed
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: '#fafafa' }}
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
                <ReferenceLine x={0} stroke="#ebebeb" />
                <Bar
                  legendType="none"
                  stackId="femaleStack"
                  dataKey="femaleGap"
                  fill="transparent"
                  isAnimationActive={false}
                  hide
                />
                <Bar
                  isAnimationActive={false}
                  yAxisId="main"
                  dataKey="female"
                  name={settings.leftSeriesLabel || 'Female'}
                  fill={settings.leftColor}
                  barSize={18}
                  radius={[0, 4, 4, 0]}
                >
                  {settings.showValues && (
                    <LabelList
                      dataKey="female"
                      content={({ x, y, width, height, value }: any) => {
                        if (
                          typeof x !== 'number' ||
                          typeof y !== 'number' ||
                          typeof width !== 'number' ||
                          typeof height !== 'number'
                        )
                          return null;
                        return (
                          <text
                            x={x + width - 8}
                            y={y + height / 2}
                            fill="#4d4d4d"
                            fontSize={12}
                            textAnchor="end"
                            dominantBaseline="central"
                          >
                            {Math.abs(Number(value))}
                          </text>
                        );
                      }}
                    />
                  )}
                </Bar>
                <Bar
                  isAnimationActive={false}
                  yAxisId="secondary"
                  dataKey="male"
                  name={settings.rightSeriesLabel || 'Male'}
                  fill={settings.rightColor}
                  barSize={18}
                  radius={[0, 4, 4, 0]}
                >
                  {settings.showValues && (
                    <LabelList
                      dataKey="male"
                      content={({ x, y, width, height, value }: any) => {
                        if (
                          typeof x !== 'number' ||
                          typeof y !== 'number' ||
                          typeof width !== 'number' ||
                          typeof height !== 'number'
                        )
                          return null;
                        return (
                          <text
                            x={x + width + 8}
                            y={y + height / 2}
                            fill="#4d4d4d"
                            fontSize={12}
                            textAnchor="start"
                            dominantBaseline="central"
                          >
                            {Math.abs(Number(value))}
                          </text>
                        );
                      }}
                    />
                  )}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
