import { useMemo, useRef } from 'react';
import type { EChartsOption, SeriesOption } from 'echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  TooltipComponent,
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import { useTranslations } from 'next-intl';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { ChartExporter } from '~/components/chart-exporter';
import type { ChartDataRow, ChartSettings } from './waterfall-bar-chart-maker';

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '');
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : normalized;
  const numeric = Number.parseInt(full, 16);

  return {
    r: (numeric >> 16) & 255,
    g: (numeric >> 8) & 255,
    b: numeric & 255,
  };
}

function mixColors(baseColor: string, mixColor: string, ratio: number) {
  const c1 = hexToRgb(baseColor);
  const c2 = hexToRgb(mixColor);
  const mix = (channel1: number, channel2: number) =>
    Math.round(channel1 + (channel2 - channel1) * ratio)
      .toString(16)
      .padStart(2, '0');

  return `#${mix(c1.r, c2.r)}${mix(c1.g, c2.g)}${mix(c1.b, c2.b)}`;
}

function getDarkerColor(baseColor: string) {
  return mixColors(baseColor, '#000000', 0.2); // 20% darker
}

echarts.use([
  BarChart,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  TooltipComponent,
  SVGRenderer,
]);

type ChartPreviewProps = {
  data: ChartDataRow[];
  settings: ChartSettings;
};

type WaterfallPoint = {
  category: string;
  helper: number;
  value: number | '-';
  rawValue: number;
  start: number;
  end: number;
  isTotal: boolean;
};

const DEFAULT_TOTAL_SERIES_LABEL = 'Net Total';

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
});

function formatNumber(value: number) {
  return numberFormatter.format(Number.isFinite(value) ? value : 0);
}

function formatSignedNumber(value: number) {
  const formatted = formatNumber(Math.abs(value));
  return value > 0 ? `+${formatted}` : value < 0 ? `-${formatted}` : formatted;
}

export function ChartPreview({ data, settings }: ChartPreviewProps) {
  const t = useTranslations('WaterfallBarChart');
  const exportTargetRef = useRef<HTMLDivElement>(null);

  const normalizedData = useMemo(
    () =>
      data
        .map((item) => ({
          name: item.name.trim(),
          value: Number(item.value),
        }))
        .filter((item) => item.name && Number.isFinite(item.value)),
    [data]
  );

  const chartData = useMemo<WaterfallPoint[]>(() => {
    let runningTotal = 0;

    const steps: WaterfallPoint[] = normalizedData.map((item) => {
      const start = runningTotal;
      runningTotal += item.value;
      const end = runningTotal;
      const lowerBound = Math.min(start, end);
      const magnitude = Math.abs(item.value);

      return {
        category: item.name,
        helper: lowerBound,
        value: magnitude,
        rawValue: item.value,
        start,
        end,
        isTotal: false,
      };
    });

    steps.push({
      category: settings.totalSeriesLabel || DEFAULT_TOTAL_SERIES_LABEL,
      helper: 0,
      value: runningTotal,
      rawValue: runningTotal,
      start: 0,
      end: runningTotal,
      isTotal: true,
    });

    return steps;
  }, [normalizedData, settings.totalSeriesLabel]);

  const connectorData = useMemo(
    () =>
      chartData.slice(0, -1).map((point, index) => [
        {
          coord: [point.category, point.end],
        },
        {
          coord: [chartData[index + 1]?.category ?? point.category, point.end],
        },
      ]) as Array<[{ coord: [string, number] }, { coord: [string, number] }]>,
    [chartData]
  );

  const valueRange = useMemo(() => {
    const values = chartData.flatMap((point) => [point.start, point.end]);
    const min = Math.min(...values, 0);
    const max = Math.max(...values, 0);
    const span = Math.max(max - min, 1);
    const padding = span * 0.12;

    return {
      min: Math.floor(min - padding),
      max: Math.ceil(max + padding),
    };
  }, [chartData]);

  const valueSeriesData = useMemo(
    () =>
      chartData.map((point) =>
        point.value === '-'
          ? { value: '-' }
          : {
              value: point.value,
              rawValue: point.rawValue,
              isTotal: point.isTotal,
            }
      ),
    [chartData]
  );

  const echartOption = useMemo<EChartsOption>(() => {
    const labelFormatter = (params: any) => {
      const rawValue = Number(params?.data?.rawValue ?? params?.value ?? 0);
      return formatSignedNumber(rawValue);
    };

    const helperSeries: SeriesOption = {
      type: 'bar',
      name: '__helper__',
      stack: 'total',
      silent: true,
      itemStyle: {
        color: 'transparent',
        borderColor: 'transparent',
      },
      emphasis: {
        disabled: true,
      },
      tooltip: {
        show: false,
      },
      data: chartData.map((point) => point.helper),
      ...(settings.showConnector
        ? {
            markLine: {
              silent: true,
              symbol: ['none', 'none'],
              animation: false,
              label: {
                show: false,
              },
              lineStyle: {
                color: '#a3a3a3',
                type: 'dashed',
                width: 1,
              },
              data: connectorData as any,
            },
          }
        : {}),
    };

    const series: SeriesOption[] = [
      helperSeries,
      {
        type: 'bar',
        name: settings.totalSeriesLabel || DEFAULT_TOTAL_SERIES_LABEL,
        stack: 'total',
        itemStyle: {
          color: (params: any) => {
            const dataIndex = params.dataIndex;
            if (chartData[dataIndex]?.isTotal) {
              return getDarkerColor(settings.color);
            }
            return settings.color;
          },
          borderRadius: 0,
        },
        label: {
          show: settings.showValues,
          position: 'top',
          color: '#171717',
          fontSize: 12,
          formatter: labelFormatter,
        },
        emphasis: {
          focus: 'series',
        },
        data: valueSeriesData,
      },
    ];

    return {
      animation: false,
      grid: {
        top: 36,
        right: 24,
        bottom: 82,
        left: 58,
      },
      legend: {
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        borderWidth: 1,
        borderColor: '#ebebeb',
        backgroundColor: '#ffffff',
        extraCssText: 'border-radius: 0; padding: 8px 10px;',
        textStyle: {
          color: '#171717',
          fontSize: 13,
        },
        formatter: (params) => {
          const items = Array.isArray(params) ? params : [params];
          const dataIndex = Number(items[0]?.dataIndex ?? 0);
          const point = chartData[dataIndex];

          if (!point) {
            return '';
          }

          if (point.isTotal) {
            return [
              point.category,
              `${t('editorTooltipTotal')}: ${formatNumber(point.rawValue)}`,
            ].join('<br/>');
          }

          return [
            point.category,
            `${t('editorTooltipChange')}: ${formatSignedNumber(point.rawValue)}`,
            `${t('editorTooltipStart')}: ${formatNumber(point.start)}`,
            `${t('editorTooltipEnd')}: ${formatNumber(point.end)}`,
          ].join('<br/>');
        },
      },
      xAxis: {
        type: 'category',
        data: chartData.map((point) => point.category),
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: '#888888',
          fontSize: 12,
          interval: 0,
          rotate: 45,
        },
      },
      yAxis: {
        type: 'value',
        min: valueRange.min,
        max: valueRange.max,
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
          formatter: (value: number) => formatNumber(value),
        },
      },
      series,
    };
  }, [
    chartData,
    connectorData,
    valueSeriesData,
    settings,
    t,
    valueRange.max,
    valueRange.min,
  ]);

  const hasData = normalizedData.length > 0;

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-white">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#ebebeb] px-6">
        <h2 className="font-medium text-[#171717] text-sm uppercase tracking-wide">
          {t('editorGraphTitle')}
        </h2>
        <ChartExporter
          targetRef={exportTargetRef}
          filename="waterfall-bar-chart"
          exportLabel={t('editorExport')}
          exportingLabel={t('editorExporting')}
          exportAriaLabel={t('editorExportAriaLabel')}
          missingContainerError={t('editorExportErrorMissing')}
          exportFailedError={t('editorExportErrorFailed')}
        />
      </div>

      <div className="flex w-full flex-1 overflow-x-auto">
        <div
          ref={exportTargetRef}
          className="mx-auto flex h-full min-h-[460px] w-full min-w-[780px] flex-col items-center justify-center bg-white p-4 sm:p-6"
        >
          {settings.title ? (
            <h3 className="mb-6 shrink-0 text-center font-medium text-[#171717] text-xl">
              {settings.title}
            </h3>
          ) : null}

          <div className="flex w-full flex-1 flex-col">
            {!hasData ? (
              <div className="flex flex-1 items-center justify-center bg-white px-6 text-center text-sm leading-6 text-[#4d4d4d] sm:text-base">
                {t('editorEmptyState')}
              </div>
            ) : (
              <div className="flex flex-1 bg-white p-2 sm:p-3">
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
