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
  label: string;
  x: number;
  y: number;
  group: string;
  size: number;
};

type ScatterSeries = {
  name: string;
  color: string;
  items: ScatterPoint[];
};

const fallbackPalette = [
  '#2563eb',
  '#7c3aed',
  '#db2777',
  '#ea580c',
  '#16a34a',
  '#0891b2',
  '#ca8a04',
  '#4f46e5',
];

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
});

function formatNumber(value: number) {
  return numberFormatter.format(Number.isFinite(value) ? value : 0);
}

function getSeriesColors(baseColor: string, count: number) {
  const seed = [baseColor, ...fallbackPalette].filter(
    (color, index, all) => all.indexOf(color) === index
  );

  if (count <= seed.length) {
    return seed.slice(0, count);
  }

  const extras = Array.from({ length: count - seed.length }, (_, index) => {
    const ratio = Math.min(0.18 + index * 0.12, 0.55);
    const normalized = baseColor.replace('#', '');
    const numeric = Number.parseInt(normalized, 16);
    const r = (numeric >> 16) & 255;
    const g = (numeric >> 8) & 255;
    const b = numeric & 255;
    const mix = (channel: number) =>
      Math.round(channel + (255 - channel) * ratio)
        .toString(16)
        .padStart(2, '0');

    return `#${mix(r)}${mix(g)}${mix(b)}`;
  });

  return [...seed, ...extras];
}

function getBubbleSize(value: number, useBubbleSize: boolean) {
  if (!useBubbleSize) {
    return 14;
  }

  return Math.max(10, Math.min(38, value * 1.4));
}

export function ChartPreview({ data, settings }: ChartPreviewProps) {
  const exportTargetRef = useRef<HTMLDivElement>(null);

  const normalizedData = useMemo<ScatterPoint[]>(() => {
    return data
      .map((item, index) => ({
        label: item.label.trim() || `Point ${index + 1}`,
        x: Number(item.x),
        y: Number(item.y),
        group: item.group.trim() || settings.seriesLabel || 'Series',
        size:
          Number.isFinite(Number(item.size)) && Number(item.size) > 0
            ? Number(item.size)
            : 12,
      }))
      .filter(
        (item) =>
          Number.isFinite(item.x) &&
          Number.isFinite(item.y) &&
          Number.isFinite(item.size)
      );
  }, [data, settings.seriesLabel]);

  const seriesData = useMemo<ScatterSeries[]>(() => {
    const names = [...new Set(normalizedData.map((item) => item.group))];
    const colors = getSeriesColors(settings.color, Math.max(names.length, 1));

    return names.map((name, index) => ({
      name,
      color: colors[index] ?? settings.color,
      items: normalizedData.filter((item) => item.group === name),
    }));
  }, [normalizedData, settings.color]);

  const echartOption = useMemo<EChartsOption>(() => {
    return {
      animation: false,
      grid: {
        top: 24,
        right: 28,
        bottom: 54,
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
            seriesName?: string;
            value?: number[];
          };
          const values = Array.isArray(raw.value) ? raw.value : [];

          return [
            raw.name ?? 'Point',
            `${settings.xAxisLabel || 'X'}: ${formatNumber(Number(values[0] ?? 0))}`,
            `${settings.yAxisLabel || 'Y'}: ${formatNumber(Number(values[1] ?? 0))}`,
            `Group: ${raw.seriesName ?? settings.seriesLabel ?? 'Series'}`,
            `Size: ${formatNumber(Number(values[2] ?? 0))}`,
          ].join('<br/>');
        },
      },
      legend: {
        show: settings.showLegend,
        top: 0,
        textStyle: {
          color: '#4d4d4d',
          fontSize: 12,
        },
      },
      xAxis: {
        name: settings.xAxisLabel,
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
      series: seriesData.map((series) => ({
        type: 'scatter',
        name: series.name,
        data: series.items.map((item) => ({
          name: item.label,
          value: [item.x, item.y, item.size],
          itemStyle: {
            color: series.color,
          },
        })),
        symbolSize: (value: unknown) => {
          const safeValue = Array.isArray(value) ? Number(value[2] ?? 12) : 12;
          return getBubbleSize(safeValue, settings.useBubbleSize);
        },
      })),
    };
  }, [seriesData, settings]);

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
              <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-[#d4d4d4] bg-[#fafafa] px-6 text-center text-sm leading-6 text-[#4d4d4d] sm:text-base">
                Add valid X and Y values to render the scatter chart.
              </div>
            ) : (
              <div className="flex flex-1 rounded-2xl border border-[#ebebeb] bg-[#fafafa] p-3 sm:p-4">
                <ReactEChartsCore
                  echarts={echarts}
                  option={echartOption}
                  notMerge
                  lazyUpdate
                  opts={{ renderer: 'svg' }}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
