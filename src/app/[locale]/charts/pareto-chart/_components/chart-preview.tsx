import { useMemo, useRef } from 'react';
import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { ChartExporter } from '~/components/chart-exporter';
import type { ChartDataRow, ChartSettings } from './pareto-chart-maker';

echarts.use([
  BarChart,
  GridComponent,
  LegendComponent,
  LineChart,
  TooltipComponent,
  SVGRenderer,
]);

type ChartPreviewProps = {
  data: ChartDataRow[];
  settings: ChartSettings;
};

type ParetoDatum = {
  category: string;
  value: number;
  cumulativePercentage: number;
};

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
});

function formatNumber(value: number) {
  return numberFormatter.format(Number.isFinite(value) ? value : 0);
}

function clampPercentage(value: number) {
  return Math.max(0, Math.min(100, value));
}

export function ChartPreview({ data, settings }: ChartPreviewProps) {
  const exportTargetRef = useRef<HTMLDivElement>(null);

  const normalizedData = useMemo<ParetoDatum[]>(() => {
    const validRows = data
      .map((item) => ({
        category: item.category.trim(),
        value: Number(item.value),
      }))
      .filter(
        (item) =>
          item.category.length > 0 &&
          Number.isFinite(item.value) &&
          item.value > 0
      );

    const orderedRows = settings.sortDescending
      ? [...validRows].sort((a, b) => b.value - a.value)
      : validRows;

    const total = orderedRows.reduce((sum, item) => sum + item.value, 0);
    let runningTotal = 0;

    return orderedRows.map((item) => {
      runningTotal += item.value;
      return {
        ...item,
        cumulativePercentage: total > 0 ? (runningTotal / total) * 100 : 0,
      };
    });
  }, [data, settings.sortDescending]);

  const targetPercentage = clampPercentage(settings.targetPercentage);

  const chartOption = useMemo<EChartsOption>(() => {
    return {
      animation: false,
      grid: {
        top: 16,
        right: 72,
        bottom: settings.showLegend ? 128 : 96,
        left: 64,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        borderWidth: 1,
        borderColor: '#ebebeb',
        backgroundColor: '#ffffff',
        textStyle: {
          color: '#171717',
          fontSize: 13,
        },
        formatter: (params) => {
          const items = Array.isArray(params) ? params : [params];
          const firstItem = items[0] as { axisValueLabel?: string } | undefined;
          const category = firstItem?.axisValueLabel ?? 'Unknown';
          const lines = [`${category}`];

          for (const item of items as Array<{
            seriesName?: string;
            value?: number;
            color?: string;
          }>) {
            const value = Number(item.value ?? 0);
            const isPercentage = item.seriesName === settings.lineSeriesLabel;
            lines.push(
              `<span style="display:inline-block;margin-right:6px;border-radius:50%;width:8px;height:8px;background:${item.color};"></span>${item.seriesName}: ${isPercentage ? `${formatNumber(value)}%` : formatNumber(value)}`
            );
          }

          return lines.join('<br/>');
        },
      },
      legend: {
        show: settings.showLegend,
        bottom: 12,
        itemWidth: 12,
        itemHeight: 12,
        textStyle: {
          color: '#4d4d4d',
          fontSize: 12,
        },
      },
      xAxis: {
        type: 'category',
        data: normalizedData.map((item) => item.category),
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#888888',
          fontSize: 12,
          interval: 0,
          rotate: 45,
          margin: 16,
        },
      },
      yAxis: [
        {
          type: 'value',
          name: settings.countAxisLabel,
          nameLocation: 'middle',
          nameGap: 50,
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
        {
          type: 'value',
          min: 0,
          max: 100,
          name: settings.percentageAxisLabel,
          nameLocation: 'middle',
          nameGap: 56,
          splitLine: {
            show: false,
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
            formatter: '{value}%',
          },
        },
      ],
      series: [
        {
          type: 'bar',
          name: settings.barSeriesLabel,
          data: normalizedData.map((item) => item.value),
          barMaxWidth: 44,
          itemStyle: {
            color: settings.barColor,
            borderRadius: [6, 6, 0, 0],
          },
          label: settings.showValueLabels
            ? {
                show: true,
                position: 'top',
                color: '#4d4d4d',
                fontSize: 12,
                formatter: ({ value }: { value?: number }) =>
                  formatNumber(Number(value ?? 0)),
              }
            : undefined,
        },
        {
          type: 'line',
          name: settings.lineSeriesLabel,
          yAxisIndex: 1,
          data: normalizedData.map((item) =>
            Number(item.cumulativePercentage.toFixed(2))
          ),
          smooth: false,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            color: settings.lineColor,
            width: 3,
          },
          itemStyle: {
            color: settings.lineColor,
          },
          markLine: settings.showTargetLine
            ? {
                silent: true,
                symbol: 'none',
                lineStyle: {
                  color: '#a3a3a3',
                  type: 'dashed',
                  width: 1,
                },
                label: {
                  show: true,
                  formatter: `${formatNumber(targetPercentage)}%`,
                  color: '#4d4d4d',
                  backgroundColor: '#ffffff',
                  padding: [2, 4],
                },
                data: [{ yAxis: targetPercentage }],
              }
            : undefined,
        },
      ],
    } as EChartsOption;
  }, [normalizedData, settings, targetPercentage]);

  const hasData = normalizedData.length > 0;

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-white">
      <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-[#ebebeb] border-b px-6">
        <div className="flex min-w-0 items-center gap-3">
          <h2 className="font-medium text-[#171717] text-sm uppercase tracking-wide">
            Graph
          </h2>
        </div>
        <ChartExporter targetRef={exportTargetRef} filename="pareto-chart" />
      </div>

      <div className="flex w-full flex-1 overflow-x-auto">
        <div
          ref={exportTargetRef}
          className="mx-auto flex h-full min-h-[520px] w-full min-w-[820px] flex-col items-center justify-center bg-white p-4 sm:p-6"
        >
          <div className="flex w-full flex-1 flex-col">
            {!hasData ? (
              <div className="flex flex-1 items-center justify-center px-6 text-center text-sm leading-6 text-[#4d4d4d] sm:text-base">
                Add valid category names and positive values to render the
                Pareto chart.
              </div>
            ) : (
              <div className="flex flex-1 p-3 sm:p-4">
                <ReactEChartsCore
                  echarts={echarts}
                  option={chartOption}
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
