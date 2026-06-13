import { useMemo, useRef } from 'react';
import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { ScatterChart as EChartsScatterChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { ChartExporter } from '~/components/chart-exporter';
import type { ChartDataRow, ChartSettings } from './scatter-chart-maker';

echarts.use([
  EChartsScatterChart,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  SVGRenderer,
]);

type ChartPreviewProps = {
  data: ChartDataRow[];
  settings: ChartSettings;
};

type ScatterPoint = {
  x: number;
  y: number;
};

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
});

function formatNumber(value: number) {
  return numberFormatter.format(Number.isFinite(value) ? value : 0);
}

export function ChartPreview({ data, settings }: ChartPreviewProps) {
  const exportTargetRef = useRef<HTMLDivElement>(null);

  const normalizedData = useMemo<ScatterPoint[]>(() => {
    return data
      .map((item) => ({
        x: Number(item.x),
        y: Number(item.y),
      }))
      .filter((item) => Number.isFinite(item.x) && Number.isFinite(item.y));
  }, [data]);

  const echartOption = useMemo<EChartsOption>(() => {
    return {
      animation: false,
      grid: {
        top: 24,
        right: 28,
        bottom: 32,
        left: 56,
      },
      tooltip: {
        trigger: 'item',
        borderWidth: 1,
        borderColor: '#ebebeb',
        backgroundColor: '#ffffff',
        textStyle: {
          color: '#171717',
          fontSize: 13,
        },
        formatter: (params) => {
          const raw = params as {
            name?: string;
            value?: number[];
          };
          const values = Array.isArray(raw.value) ? raw.value : [];

          return [
            `${settings.xAxisLabel || 'X'}: ${formatNumber(Number(values[0] ?? 0))}`,
            `${settings.yAxisLabel || 'Y'}: ${formatNumber(Number(values[1] ?? 0))}`,
          ].join('<br/>');
        },
      },
      legend: {
        show: false,
        textStyle: {
          color: '#4d4d4d',
          fontSize: 12,
        },
      },
      xAxis: {
        name: '',
        nameLocation: 'middle',
        nameGap: 34,
        splitLine: {
          show: settings.showGrid,
          lineStyle: {
            color: '#ebebeb',
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#888888',
          fontSize: 12,
        },
      },
      yAxis: {
        name: settings.yAxisLabel,
        nameLocation: 'middle',
        nameGap: 42,
        splitLine: {
          show: settings.showGrid,
          lineStyle: {
            color: '#ebebeb',
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#888888',
          fontSize: 12,
        },
      },
      series: [
        {
          type: 'scatter',
          name: settings.seriesLabel || 'Series',
          data: normalizedData.map((item) => [item.x, item.y]),
          symbolSize: 14,
          itemStyle: {
            color: settings.color,
          },
        },
      ],
    };
  }, [normalizedData, settings]);

  const hasData = normalizedData.length > 0;

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-white">
      <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-[#ebebeb] border-b px-6">
        <div className="flex min-w-0 items-center gap-3">
          <h2 className="font-medium text-[#171717] text-sm uppercase tracking-wide">
            Graph
          </h2>
        </div>
        <ChartExporter targetRef={exportTargetRef} filename="scatter-chart" />
      </div>

      <div className="flex w-full flex-1 overflow-x-auto">
        <div
          ref={exportTargetRef}
          className="mx-auto flex h-full min-h-[460px] w-full min-w-[760px] flex-col items-center justify-center bg-white p-4 sm:p-6"
        >
          {settings.title ? (
            <h3 className="mb-6 shrink-0 text-center font-medium text-[#171717] text-xl">
              {settings.title}
            </h3>
          ) : null}

          <div className="flex w-full flex-1 flex-col">
            {!hasData ? (
              <div className="flex flex-1 items-center justify-center px-6 text-center text-sm leading-6 text-[#4d4d4d] sm:text-base">
                Add valid X and Y values to render the scatter chart.
              </div>
            ) : (
              <div className="flex flex-1 flex-col">
                <div className="flex flex-1 p-3 sm:p-4">
                  <ReactEChartsCore
                    echarts={echarts}
                    option={echartOption}
                    notMerge
                    lazyUpdate
                    opts={{ renderer: 'svg' }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                {settings.showLegend || settings.xAxisLabel ? (
                  <div className="flex shrink-0 items-center justify-center gap-6 px-3 pb-2 text-[#4d4d4d] text-xs sm:px-4">
                    {settings.showLegend ? (
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: settings.color }}
                        />
                        <span>{settings.seriesLabel || 'Series'}</span>
                      </div>
                    ) : null}
                    {settings.xAxisLabel ? (
                      <span>{settings.xAxisLabel}</span>
                    ) : null}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
