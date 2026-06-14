import { useMemo, useRef } from 'react';
import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { SunburstChart } from 'echarts/charts';
import { TooltipComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import { useTranslations } from 'next-intl';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { ChartExporter } from '~/components/chart-exporter';
import type { ChartDataRow, ChartSettings } from './sunburst-chart-maker';

echarts.use([SunburstChart, TooltipComponent, SVGRenderer]);

type ChartPreviewProps = {
  data: ChartDataRow[];
  settings: ChartSettings;
};

type MutableTreeNode = {
  name: string;
  value: number;
  children: Map<string, MutableTreeNode>;
};

type SunburstNode = {
  name: string;
  value: number;
  depth?: number;
  itemStyle?: {
    color: string;
  };
  children?: SunburstNode[];
};

const colorfulBasePalette = [
  '#2563eb',
  '#7c3aed',
  '#db2777',
  '#ea580c',
  '#ca8a04',
  '#16a34a',
  '#0891b2',
  '#4f46e5',
];

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

function mixColors(baseColor: string, ratio: number) {
  const { r, g, b } = hexToRgb(baseColor);
  const mix = (channel: number) =>
    Math.round(channel + (255 - channel) * ratio)
      .toString(16)
      .padStart(2, '0');

  return `#${mix(r)}${mix(g)}${mix(b)}`;
}

function formatValue(value: number) {
  return new Intl.NumberFormat('en-US', {
    notation: value >= 10000 ? 'compact' : 'standard',
    maximumFractionDigits: value >= 1000 ? 1 : 0,
  }).format(value);
}

function buildTree(rows: ChartDataRow[]) {
  const root = new Map<string, MutableTreeNode>();

  for (const row of rows) {
    const value = Number(row.value);
    const path = [row.level1, row.level2, row.level3]
      .map((item) => item.trim())
      .filter(Boolean);

    if (!path.length || !Number.isFinite(value) || value <= 0) {
      continue;
    }

    let currentLevel = root;

    for (const name of path) {
      if (!currentLevel.has(name)) {
        currentLevel.set(name, {
          name,
          value: 0,
          children: new Map<string, MutableTreeNode>(),
        });
      }

      const node = currentLevel.get(name);
      if (!node) {
        continue;
      }

      node.value += value;
      currentLevel = node.children;
    }
  }

  return root;
}

function convertTreeToArray(
  tree: Map<string, MutableTreeNode>,
  depth = 1
): SunburstNode[] {
  return [...tree.values()]
    .sort((a, b) => b.value - a.value)
    .map((node) => ({
      name: node.name,
      value: node.value,
      depth,
      children:
        node.children.size > 0
          ? convertTreeToArray(node.children, depth + 1)
          : undefined,
    }));
}

function getTopLevelColors(
  baseColor: string,
  count: number,
  colorful: boolean
) {
  if (count <= 0) {
    return [];
  }

  if (!colorful) {
    return Array.from({ length: count }, (_, index) =>
      mixColors(baseColor, 0.1 + (0.55 * index) / Math.max(count - 1, 1))
    );
  }

  return Array.from({ length: count }, (_, index) => {
    const paletteColor =
      colorfulBasePalette[index % colorfulBasePalette.length] ?? '#2563eb';
    const round = Math.floor(index / colorfulBasePalette.length);

    return round === 0
      ? paletteColor
      : mixColors(paletteColor, Math.min(round * 0.16, 0.42));
  });
}

function colorizeNodes(
  nodes: SunburstNode[],
  topLevelColors: string[],
  depth = 0,
  inheritedColor?: string
): SunburstNode[] {
  return nodes.map((node, index) => {
    const currentColor =
      depth === 0
        ? (topLevelColors[index] ?? inheritedColor ?? '#171717')
        : mixColors(
            inheritedColor ?? '#171717',
            Math.min(0.18 + index * 0.12 + depth * 0.08, 0.72)
          );

    return {
      ...node,
      itemStyle: {
        color: currentColor,
      },
      children: node.children
        ? colorizeNodes(node.children, topLevelColors, depth + 1, currentColor)
        : undefined,
    };
  });
}

function getPathLabel(treePathInfo: Array<{ name: string }>) {
  return treePathInfo
    .slice(1)
    .map((item) => item.name)
    .filter(Boolean)
    .join(' / ');
}

function truncateLabel(text: string, maxChars: number) {
  if (!text) {
    return '';
  }

  const chars = [...text];
  if (chars.length <= maxChars) {
    return text;
  }

  return `${chars.slice(0, Math.max(maxChars - 1, 1)).join('')}...`;
}

function getLabelMaxChars(depth: number) {
  if (depth <= 1) {
    return 14;
  }

  if (depth === 2) {
    return 11;
  }

  return 8;
}

export function ChartPreview({ data, settings }: ChartPreviewProps) {
  const t = useTranslations('SunburstChart');
  const exportTargetRef = useRef<HTMLDivElement>(null);

  const normalizedRows = useMemo(
    () =>
      data.map((row) => ({
        level1: row.level1.trim(),
        level2: row.level2.trim(),
        level3: row.level3.trim(),
        value: Number(row.value),
      })),
    [data]
  );

  const chartData = useMemo(() => {
    const tree = buildTree(normalizedRows);
    const nodes = convertTreeToArray(tree);
    const topLevelColors = getTopLevelColors(
      settings.color,
      nodes.length,
      settings.colorful
    );

    return colorizeNodes(nodes, topLevelColors);
  }, [normalizedRows, settings.color, settings.colorful]);

  const totalValue = useMemo(
    () => chartData.reduce((sum, node) => sum + node.value, 0),
    [chartData]
  );

  const echartOption = useMemo<EChartsOption>(() => {
    return {
      animation: false,
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
            value?: number;
            treePathInfo?: Array<{ name: string }>;
          };
          const value = Number(raw.value ?? 0);
          const path = getPathLabel(raw.treePathInfo ?? []);

          return [
            path || t('chartName'),
            `${settings.metricLabel || t('editorTooltipValue')}: ${formatValue(value)}`,
          ].join('<br/>');
        },
      },
      series: {
        type: 'sunburst',
        sort: undefined,
        nodeClick: false,
        radius: ['8%', '94%'],
        center: ['50%', '52%'],
        data: chartData,
        emphasis: {
          focus: 'ancestor',
        },
        label: {
          show: settings.showLabels,
          color: '#171717',
          rotate: 0,
          minAngle: 2,
          overflow: 'truncate',
          ellipsis: '...',
          align: 'center',
          verticalAlign: 'middle',
          lineHeight: 12,
          fontSize: 11,
          width: 84,
          formatter: (params) => {
            const raw = params as {
              name?: string;
              treePathInfo?: Array<{ name: string }>;
            };
            const depth = Math.max((raw.treePathInfo?.length ?? 1) - 1, 1);
            return truncateLabel(raw.name ?? '', getLabelMaxChars(depth));
          },
        },
        itemStyle: {
          borderWidth: 2,
          borderColor: '#ffffff',
        },
        levels: [
          {},
          {
            r0: '8%',
            r: '30%',
            label: {
              rotate: 0,
              overflow: 'truncate',
              ellipsis: '...',
              width: 96,
              lineHeight: 12,
              fontSize: 11,
            },
          },
          {
            r0: '30%',
            r: '54%',
            label: {
              rotate: 'tangential',
              overflow: 'truncate',
              ellipsis: '...',
              width: 78,
              lineHeight: 12,
              fontSize: 11,
            },
          },
          {
            r0: '54%',
            r: '76%',
            label: {
              rotate: 'radial',
              overflow: 'truncate',
              ellipsis: '...',
              width: 58,
              lineHeight: 11,
              fontSize: 10,
            },
          },
          {
            r0: '76%',
            r: '94%',
            label: {
              rotate: 'tangential',
              overflow: 'truncate',
              ellipsis: '...',
              width: 50,
              lineHeight: 10,
              fontSize: 9,
            },
          },
        ],
      },
    };
  }, [chartData, settings.metricLabel, settings.showLabels, t]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#ebebeb] px-6">
        <h2 className="font-medium text-[#171717] text-sm uppercase tracking-wide">
          {t('editorGraphTitle')}
        </h2>
        <ChartExporter
          targetRef={exportTargetRef}
          filename="sunburst-chart"
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
          className="mx-auto flex h-full min-h-[620px] w-full min-w-[860px] flex-col items-center justify-center p-2 sm:p-3"
        >
          {settings.title ? (
            <h3 className="mb-2 shrink-0 text-center font-medium text-[#171717] text-xl">
              {settings.title}
            </h3>
          ) : null}

          <div className="flex w-full flex-1 flex-col">
            {chartData.length === 0 ? (
              <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-[#d4d4d4] bg-[#fafafa] px-6 text-center text-sm leading-6 text-[#4d4d4d] sm:text-base">
                {t('editorEmptyState')}
              </div>
            ) : (
              <div className="flex flex-1 rounded-2xl p-1 sm:p-2">
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

          {totalValue > 0 && settings.metricLabel ? (
            <p className="mt-3 shrink-0 text-center text-[#888888] text-sm">
              {settings.metricLabel}: {formatValue(totalValue)}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
