import { useMemo, useRef } from 'react';
import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { ChartExporter } from '~/components/chart-exporter';
import type {
  ChartDataRow,
  ChartSettings,
} from './confidence-interval-area-chart-maker';

echarts.use([
  LineChart,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  SVGRenderer,
]);

type ChartPreviewProps = {
  data: ChartDataRow[];
  settings: ChartSettings;
};

type ConfidenceBandPoint = {
  label: string;
  estimate: number;
  lower: number;
  upper: number;
  range: number;
};

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
});

function formatNumber(value: number) {
  return numberFormatter.format(Number.isFinite(value) ? value : 0);
}

export function ChartPreview({ data, settings }: ChartPreviewProps) {
  const exportTargetRef = useRef<HTMLDivElement>(null);

  const normalizedData = useMemo<ConfidenceBandPoint[]>(() => {
    return data
      .map((item) => {
        const estimate = Number(item.estimate);
        const rawLower = Number(item.lower);
        const rawUpper = Number(item.upper);
        const lower = Math.min(rawLower, rawUpper);
        const upper = Math.max(rawLower, rawUpper);

        return {
          label: String(item.label ?? '').trim(),
          estimate,
          lower,
          upper,
          range: upper - lower,
        };
      })
      .filter(
        (item) =>
          item.label.length > 0 &&
          Number.isFinite(item.estimate) &&
          Number.isFinite(item.lower) &&
          Number.isFinite(item.upper)
      );
  }, [data]);

  const chartOption = useMemo<EChartsOption>(() => {
    return {
      animation: false,
      grid: {
        top: 24,
        right: 28,
        bottom: settings.showLegend ? 100 : 82,
        left: settings.yAxisLabel ? 68 : 52,
      },
      tooltip: {
        trigger: 'axis',
        borderWidth: 1,
        borderColor: '#ebebeb',
        backgroundColor: '#ffffff',
        textStyle: {
          color: '#171717',
          fontSize: 13,
        },
        formatter: (params) => {
          const items = Array.isArray(params) ? params : [params];
          const first = items[0] as {
            axisValueLabel?: string;
            dataIndex?: number;
          };
          const point = normalizedData[first.dataIndex ?? 0];

          if (!point) {
            return '';
          }

          return [
            first.axisValueLabel || point.label,
            `${settings.trendLabel || 'Estimate'}: ${formatNumber(point.estimate)}`,
            `Lower Bound: ${formatNumber(point.lower)}`,
            `Upper Bound: ${formatNumber(point.upper)}`,
          ].join('<br/>');
        },
      },
      legend: {
        show: settings.showLegend,
        bottom: 18,
        left: 'center',
        itemWidth: 14,
        itemHeight: 8,
        textStyle: {
          color: '#4d4d4d',
          fontSize: 12,
        },
        data: [
          settings.trendLabel || 'Estimate',
          settings.intervalLabel || '95% Confidence Interval',
        ],
      },
      xAxis: {
        type: 'category',
        data: normalizedData.map((item) => item.label),
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#888888',
          fontSize: 12,
          rotate: 45,
          margin: 16,
        },
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        name: settings.yAxisLabel,
        nameLocation: 'middle',
        nameGap: settings.yAxisLabel ? 48 : 0,
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
          type: 'line',
          name: settings.intervalLabel || '95% Confidence Interval',
          stack: 'confidence-band',
          data: normalizedData.map((item) => item.lower),
          symbol: 'none',
          lineStyle: {
            opacity: 0,
          },
          areaStyle: {
            opacity: 0,
          },
          tooltip: {
            show: false,
          },
        },
        {
          type: 'line',
          name: settings.intervalLabel || '95% Confidence Interval',
          stack: 'confidence-band',
          data: normalizedData.map((item) => item.range),
          symbol: 'none',
          lineStyle: {
            opacity: 0,
          },
          areaStyle: {
            color: settings.intervalColor,
            opacity: 0.24,
          },
          tooltip: {
            show: false,
          },
        },
        {
          type: 'line',
          name: settings.trendLabel || 'Estimate',
          data: normalizedData.map((item) => item.estimate),
          smooth: 0.3,
          showSymbol: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            color: settings.lineColor,
            width: 3,
          },
          itemStyle: {
            color: settings.lineColor,
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
        <ChartExporter
          targetRef={exportTargetRef}
          filename="confidence-interval-area-chart"
        />
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
                Add labels, estimates, and lower or upper bounds to render the
                confidence interval area chart.
              </div>
            ) : (
              <div className="flex flex-1 flex-col">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
