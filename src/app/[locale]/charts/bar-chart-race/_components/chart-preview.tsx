'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  DatasetComponent,
  GraphicComponent,
  GridComponent,
  TooltipComponent,
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { ChartExporter } from '~/components/chart-exporter';
import { Button } from '~/components/ui/button';
import type { CategoryColorMap, ChartDataRow, ChartSettings } from './types';

echarts.use([
  BarChart,
  DatasetComponent,
  GraphicComponent,
  GridComponent,
  TooltipComponent,
  SVGRenderer,
]);

type ChartPreviewProps = {
  data: ChartDataRow[];
  settings: ChartSettings;
  categoryColors: CategoryColorMap;
};

// 当用户没有为某个类别指定颜色时，按出现顺序从这个默认调色板分配
const fallbackPalette = [
  '#171717',
  '#3b82f6',
  '#7c3aed',
  '#ef4444',
  '#f59e0b',
  '#10b981',
  '#14b8a6',
  '#ec4899',
  '#8b5cf6',
  '#0ea5e9',
  '#f97316',
  '#22c55e',
];

// 数字格式：用于 X 轴和右侧标签；空值不显示
const valueFormatter = new Intl.NumberFormat('en', {
  maximumFractionDigits: 0,
});

function formatNumber(value: number) {
  return valueFormatter.format(Number.isFinite(value) ? value : 0);
}

function extractNumeric(val: unknown): number | null {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const parsed = Number(val);
    if (!Number.isNaN(parsed)) return parsed;
  }
  if (Array.isArray(val)) {
    for (const item of val) {
      if (typeof item === 'number') return item;
    }
  }
  if (val && typeof val === 'object') {
    if ('value' in val) {
      const v = extractNumeric((val as any).value);
      if (v !== null) return v;
    }
    if ('data' in val) {
      const d = extractNumeric((val as any).data);
      if (d !== null) return d;
    }
  }
  return null;
}

function extractNumericValue(rawValue: unknown): number {
  return extractNumeric(rawValue) ?? 0;
}

function compareTimeLabel(left: string, right: string) {
  const leftNumber = Number(left);
  const rightNumber = Number(right);

  if (Number.isFinite(leftNumber) && Number.isFinite(rightNumber)) {
    return leftNumber - rightNumber;
  }

  return left.localeCompare(right, undefined, {
    numeric: true,
    sensitivity: 'base',
  });
}

type RaceFrame = {
  time: string;
  items: Array<{
    name: string;
    value: number;
    color: string;
  }>;
};

export function ChartPreview({
  data,
  settings,
  categoryColors,
}: ChartPreviewProps) {
  const exportTargetRef = useRef<HTMLDivElement>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const frames = useMemo<RaceFrame[]>(() => {
    const times = [
      ...new Set(data.map((row) => row.time.trim()).filter(Boolean)),
    ];
    times.sort(compareTimeLabel);

    // 收集所有出现过的类别，按首次出现顺序保留；颜色优先取用户设定的，否则回退到调色板
    const seen = new Set<string>();
    const orderedNames: string[] = [];
    const colorMap = new Map<string, string>();
    let fallbackIndex = 0;

    for (const row of data) {
      const name = row.name.trim();
      if (!name || seen.has(name)) {
        continue;
      }
      seen.add(name);
      orderedNames.push(name);

      if (categoryColors[name]) {
        colorMap.set(name, categoryColors[name]);
        continue;
      }

      const used = new Set(colorMap.values());
      let assigned =
        fallbackPalette[fallbackIndex % fallbackPalette.length] ?? '#171717';
      while (used.has(assigned)) {
        fallbackIndex += 1;
        assigned =
          fallbackPalette[fallbackIndex % fallbackPalette.length] ?? '#171717';
      }
      colorMap.set(name, assigned);
      fallbackIndex += 1;
    }

    return times.map((time) => {
      const items = data
        .filter((row) => row.time.trim() === time && row.name.trim())
        .map((row) => {
          const name = row.name.trim();
          return {
            name,
            value: Number.isFinite(row.value) ? row.value : 0,
            color: colorMap.get(name) ?? '#171717',
          };
        })
        .sort((left, right) => right.value - left.value);

      return { time, items };
    });
  }, [data, categoryColors]);

  const maxValue = useMemo(() => {
    const values = frames.flatMap((frame) =>
      frame.items.map((item) => item.value)
    );
    return Math.max(...values, 100);
  }, [frames]);

  const currentFrame = frames[frameIndex] ?? { time: '', items: [] };

  useEffect(() => {
    if (frames.length === 0) {
      setFrameIndex(0);
      setIsPlaying(false);
      return;
    }

    setFrameIndex((current) => Math.min(current, frames.length - 1));
  }, [frames]);

  useEffect(() => {
    if (!isPlaying || frames.length <= 1) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setFrameIndex((current) => {
        if (current >= frames.length - 1) {
          if (settings.loop) {
            return 0;
          }

          setIsPlaying(false);
          return current;
        }

        return current + 1;
      });
    }, settings.playbackMs);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [
    frames.length,
    isPlaying,
    settings.loop,
    settings.playbackMs,
    frameIndex,
  ]);

  const option = useMemo(() => {
    const source = currentFrame.items.map((item) => [
      item.name,
      item.value,
      item.color,
    ]);

    const chartOption: EChartsOption = {
      animationDuration: 0,
      animationDurationUpdate: settings.playbackMs,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear',
      dataset: {
        source,
      },
      grid: {
        top: 8,
        right: 80,
        bottom: 56,
        left: 12,
        containLabel: true,
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
        formatter: (rawParams) => {
          const params = rawParams as any;
          const name = Array.isArray(params.data)
            ? params.data[0]
            : (params.name ?? '');
          return `${name}<br/>${settings.seriesLabel}: ${formatNumber(extractNumericValue(params))}`;
        },
      },
      xAxis: {
        type: 'value',
        max: maxValue,
        splitLine: {
          show: settings.showGrid,
          lineStyle: {
            color: '#ebebeb',
          },
        },
        axisLabel: {
          color: '#888888',
          fontSize: 12,
          rotate: 45,
          formatter: (value: number) => formatNumber(value),
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: 'category',
        inverse: true,
        max: settings.topCount - 1,
        axisLabel: {
          color: '#171717',
          fontSize: 13,
          width: 140,
          overflow: 'truncate',
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        animationDuration: 250,
        animationDurationUpdate: 250,
      },
      graphic: {
        elements: [
          {
            type: 'text',
            right: 12,
            bottom: 6,
            z: 100,
            style: {
              text: currentFrame.time,
              font: '600 56px Geist Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',
              fill: 'rgba(23, 23, 23, 0.12)',
            },
          },
        ],
      },
      series: [
        {
          type: 'bar',
          realtimeSort: true,
          encode: {
            x: 1, // index 1 is value
            y: 0, // index 0 is name
          },
          itemStyle: {
            color: (params: any) => params.data?.[2] ?? '#171717',
            borderRadius: [0, 6, 6, 0],
          },
          label: {
            show: settings.showValues,
            position: 'right',
            distance: 10,
            valueAnimation: true,
            color: '#171717',
            fontSize: 12,
            formatter: (params: any) => {
              const val = extractNumericValue(params);
              return formatNumber(val);
            },
          },
        },
      ],
    };
    return chartOption;
  }, [
    currentFrame.items,
    currentFrame.time,
    maxValue,
    settings.playbackMs,
    settings.seriesLabel,
    settings.showGrid,
    settings.showValues,
    settings.topCount,
  ]);

  const handleReset = () => {
    setFrameIndex(0);
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-white">
      <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-[#ebebeb] border-b px-6">
        <div className="min-w-0">
          <h2 className="font-medium text-[#171717] text-sm uppercase tracking-wide">
            Graph
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#fafafa] px-3 py-1 font-mono text-[#4d4d4d] text-xs">
            {currentFrame.time || 'No time'}
          </span>
          <Button
            size="sm"
            variant="outline"
            className="h-8 border-[#ebebeb] shadow-none"
            onClick={() => setIsPlaying((current) => !current)}
            disabled={frames.length <= 1}
          >
            {isPlaying ? (
              <Pause className="mr-2 size-3.5" />
            ) : (
              <Play className="mr-2 size-3.5" />
            )}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 border-[#ebebeb] shadow-none"
            onClick={handleReset}
            disabled={frames.length === 0}
          >
            <RotateCcw className="mr-2 size-3.5" />
            Restart
          </Button>
          <ChartExporter
            targetRef={exportTargetRef}
            filename="bar-chart-race"
          />
        </div>
      </div>

      <div className="flex w-full flex-1 overflow-x-auto">
        <div
          ref={exportTargetRef}
          className="mx-auto flex h-full min-h-[520px] w-full min-w-[760px] flex-col items-center justify-center bg-white p-4 sm:p-6"
        >
          {settings.title ? (
            <h3 className="mb-6 shrink-0 text-center font-medium text-[#171717] text-xl">
              {settings.title}
            </h3>
          ) : null}

          <div className="flex min-h-[360px] w-full flex-1">
            <ReactEChartsCore
              echarts={echarts}
              option={option}
              notMerge
              lazyUpdate
              opts={{ renderer: 'svg' }}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
