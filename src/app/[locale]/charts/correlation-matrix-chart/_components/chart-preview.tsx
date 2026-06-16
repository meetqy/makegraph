import { useMemo, useRef } from 'react';
import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { HeatmapChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { ChartExporter } from '~/components/chart-exporter';
import type { ChartDataRow, ChartSettings } from './correlation-chart-maker';

echarts.use([
  HeatmapChart,
  GridComponent,
  TooltipComponent,
  VisualMapComponent,
  SVGRenderer,
]);

type ChartPreviewProps = {
  data: ChartDataRow[];
  settings: ChartSettings;
};

type HeatmapCell = [number, number, number | null];

const FIXED_NEGATIVE_COLOR = '#2563eb';
const FIXED_NEUTRAL_COLOR = '#f5f5f5';

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

function formatNumber(value: number) {
  return numberFormatter.format(Number.isFinite(value) ? value : 0);
}

export function ChartPreview({ data, settings }: ChartPreviewProps) {
  const exportTargetRef = useRef<HTMLDivElement>(null);

  const normalizedData = useMemo(() => {
    return data
      .map((item) => ({
        xVariable: item.xVariable.trim(),
        yVariable: item.yVariable.trim(),
        correlation: Number(item.correlation),
      }))
      .filter(
        (item) =>
          item.xVariable.length > 0 &&
          item.yVariable.length > 0 &&
          Number.isFinite(item.correlation)
      )
      .map((item) => ({
        ...item,
        correlation: Math.max(-1, Math.min(1, item.correlation)),
      }));
  }, [data]);

  const { matrixData, variables } = useMemo(() => {
    const variableList: string[] = [];
    const variableSet = new Set<string>();
    const pairMap = new Map<string, number>();

    for (const item of normalizedData) {
      if (!variableSet.has(item.xVariable)) {
        variableSet.add(item.xVariable);
        variableList.push(item.xVariable);
      }
      if (!variableSet.has(item.yVariable)) {
        variableSet.add(item.yVariable);
        variableList.push(item.yVariable);
      }

      pairMap.set(`${item.xVariable}__${item.yVariable}`, item.correlation);
      pairMap.set(`${item.yVariable}__${item.xVariable}`, item.correlation);
    }

    for (const name of variableList) {
      pairMap.set(`${name}__${name}`, 1);
    }

    const indexMap = new Map(variableList.map((name, index) => [name, index]));
    const cells: HeatmapCell[] = [];

    for (const yName of variableList) {
      for (const xName of variableList) {
        const xIndex = indexMap.get(xName);
        const yIndex = indexMap.get(yName);

        if (xIndex == null || yIndex == null) {
          continue;
        }

        const pairValue = pairMap.get(`${xName}__${yName}`);
        cells.push([
          xIndex,
          yIndex,
          typeof pairValue === 'number' ? pairValue : null,
        ]);
      }
    }

    return {
      matrixData: cells,
      variables: variableList,
    };
  }, [normalizedData]);

  const matrixOption = useMemo<EChartsOption>(() => {
    return {
      animation: false,
      grid: {
        top: 20,
        right: 28,
        bottom: 96,
        left: 120,
      },
      tooltip: {
        trigger: 'item',
        axisPointer: {
          show: false,
        },
        borderWidth: 1,
        borderColor: '#ebebeb',
        backgroundColor: '#ffffff',
        textStyle: {
          color: '#171717',
          fontSize: 13,
        },
        formatter: (params) => {
          const raw = params as {
            data?: [number, number, number | null];
          };
          const value = raw.data?.[2];
          const xName = variables[raw.data?.[0] ?? -1] ?? 'Unknown';
          const yName = variables[raw.data?.[1] ?? -1] ?? 'Unknown';

          if (typeof value !== 'number') {
            return `${xName} vs. ${yName}<br/>No correlation value`;
          }

          return `${xName} vs. ${yName}<br/>Correlation Matrix Value: ${formatNumber(value)}`;
        },
      },
      xAxis: {
        type: 'category',
        data: variables,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        splitArea: {
          show: false,
        },
        axisPointer: {
          show: false,
        },
        axisLabel: {
          color: '#888888',
          fontSize: 12,
          rotate: 45,
          interval: 0,
        },
      },
      yAxis: {
        type: 'category',
        data: variables,
        inverse: true,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        splitArea: {
          show: false,
        },
        axisPointer: {
          show: false,
        },
        axisLabel: {
          color: '#888888',
          fontSize: 12,
          interval: 0,
        },
      },
      visualMap: {
        show: false,
        min: -1,
        max: 1,
        calculable: false,
        hoverLink: false,
        orient: 'horizontal',
        left: 'center',
        bottom: 24,
        itemWidth: 180,
        itemHeight: 10,
        text: ['1.0', '-1.0'],
        textGap: 10,
        textStyle: {
          color: '#4d4d4d',
          fontSize: 12,
        },
        inRange: {
          color: [
            FIXED_NEGATIVE_COLOR,
            FIXED_NEUTRAL_COLOR,
            settings.positiveColor,
          ],
        },
      },
      series: [
        {
          type: 'heatmap',
          data: matrixData,
          progressive: 0,
          label: {
            show: true,
            color: '#171717',
            fontSize: 12,
            formatter: (params) => {
              const value = Array.isArray(params.data)
                ? (params.data[2] as number | null)
                : null;
              return typeof value === 'number' ? formatNumber(value) : '';
            },
          },
          itemStyle: {
            borderWidth: settings.showGrid ? 1 : 0,
            borderColor: '#ffffff',
          },
          emphasis: {
            disabled: true,
          },
        },
      ],
    };
  }, [matrixData, settings, variables]);

  const hasData = variables.length > 1;

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
          filename="correlation-matrix"
        />
      </div>

      <div className="flex w-full flex-1 overflow-x-auto">
        <div
          ref={exportTargetRef}
          className="mx-auto flex h-full min-h-[520px] w-full min-w-[820px] flex-col items-center justify-center bg-white p-4 sm:p-6"
        >
          {settings.title ? (
            <h3 className="mb-6 shrink-0 text-center font-medium text-[#171717] text-xl">
              {settings.title}
            </h3>
          ) : null}

          <div className="flex w-full flex-1 flex-col">
            {!hasData ? (
              <div className="flex flex-1 items-center justify-center px-6 text-center text-sm leading-6 text-[#4d4d4d] sm:text-base">
                Add at least two variables with valid correlation values to
                render the correlation matrix.
              </div>
            ) : (
              <div className="flex flex-1 p-3 sm:p-4">
                <div className="flex min-h-[420px] w-full flex-col rounded-2xl border border-[#ebebeb] bg-white">
                  <div className="border-b border-[#ebebeb] px-4 py-3">
                    <p className="font-medium text-[#171717] text-sm">
                      Correlation Matrix
                    </p>
                    <p className="mt-1 text-[#888888] text-xs">
                      Compare the strength and direction of each variable pair
                      in one symmetric heatmap.
                    </p>
                  </div>
                  <div className="flex flex-1 p-2 sm:p-4">
                    <ReactEChartsCore
                      echarts={echarts}
                      option={matrixOption}
                      notMerge
                      lazyUpdate
                      opts={{ renderer: 'svg' }}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
