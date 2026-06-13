import { useMemo, useRef } from 'react';
import { ResponsiveContainer, Treemap } from 'recharts';
import { ChartExporter } from '~/components/chart-exporter';
import type { ChartDataRow, ChartSettings } from './tree-map-chart-maker';

type ChartPreviewProps = {
  data: ChartDataRow[];
  settings: ChartSettings;
};

type TreemapNodeProps = {
  depth?: number;
  index?: number;
  name?: string;
  value?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

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

function getShadePalette(baseColor: string, count: number) {
  if (count <= 1) {
    return [baseColor];
  }

  return Array.from({ length: count }, (_, index) => {
    const ratio = 0.08 + (0.62 * index) / Math.max(count - 1, 1);
    return mixColors(baseColor, ratio);
  });
}

const colorfulBasePalette = [
  '#2563eb',
  '#7c3aed',
  '#db2777',
  '#ea580c',
  '#ca8a04',
  '#16a34a',
  '#0891b2',
  '#4f46e5',
  '#c026d3',
  '#dc2626',
  '#65a30d',
  '#0f766e',
];

function getColorfulPalette(count: number) {
  if (count <= 1) {
    return [colorfulBasePalette[0] ?? '#2563eb'];
  }

  return Array.from({ length: count }, (_, index) => {
    const baseColor =
      colorfulBasePalette[index % colorfulBasePalette.length] ?? '#2563eb';
    const round = Math.floor(index / colorfulBasePalette.length);

    return round === 0
      ? baseColor
      : mixColors(baseColor, Math.min(round * 0.18, 0.45));
  });
}

function getTextColor(fill: string) {
  const { r, g, b } = hexToRgb(fill);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 160 ? '#171717' : '#ffffff';
}

function formatValue(value: number) {
  return new Intl.NumberFormat('en-US', {
    notation: value >= 10000 ? 'compact' : 'standard',
    maximumFractionDigits: value >= 1000 ? 1 : 0,
  }).format(value);
}

function CustomizedContentFactory(settings: ChartSettings, colors: string[]) {
  return function CustomizedContent({
    depth,
    height,
    index,
    name,
    value,
    width,
    x,
    y,
  }: TreemapNodeProps) {
    if (
      depth !== 1 ||
      x === undefined ||
      y === undefined ||
      width === undefined ||
      height === undefined
    ) {
      return null;
    }

    const safeIndex = index ?? 0;
    const fill = colors[safeIndex % colors.length] ?? settings.color;
    const canShowLabel = width > 72 && height > 34;
    const canShowValue = width > 72 && height > 54;
    const textColor = getTextColor(fill);

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          stroke="#ffffff"
          strokeWidth={3}
          rx={6}
          ry={6}
        />
        {canShowLabel && (
          <text
            x={x + 12}
            y={y + 22}
            fill={textColor}
            fontSize={13}
            fontWeight={600}
          >
            {name}
          </text>
        )}
        {canShowValue && typeof value === 'number' && (
          <text x={x + 12} y={y + 42} fill={textColor} fontSize={12}>
            {formatValue(value)}
          </text>
        )}
      </g>
    );
  };
}

export function ChartPreview({ data, settings }: ChartPreviewProps) {
  const exportTargetRef = useRef<HTMLDivElement>(null);
  const chartData = useMemo(
    () =>
      [...data]
        .filter((item) => Number.isFinite(item.value) && item.value > 0)
        .sort((a, b) => b.value - a.value),
    [data]
  );
  const colors = useMemo(
    () =>
      settings.colorful
        ? getColorfulPalette(Math.max(chartData.length, 1))
        : getShadePalette(settings.color, Math.max(chartData.length, 1)),
    [chartData.length, settings.color, settings.colorful]
  );
  const CustomizedContent = useMemo(
    () => CustomizedContentFactory(settings, colors),
    [colors, settings]
  );

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-white">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#ebebeb] px-6">
        <h2 className="font-medium text-[#171717] text-sm uppercase tracking-wide">
          Graph
        </h2>
        <ChartExporter targetRef={exportTargetRef} filename="tree-map-chart" />
      </div>

      <div className="flex w-full flex-1 overflow-x-auto">
        <div
          ref={exportTargetRef}
          className="mx-auto flex h-full min-h-[420px] w-full min-w-[700px] flex-col items-center justify-center p-4 sm:p-6"
        >
          {settings.title && (
            <h3 className="mb-6 shrink-0 font-medium text-[#171717] text-xl">
              {settings.title}
            </h3>
          )}

          <div className="flex w-full flex-1 flex-col">
            {chartData.length === 0 ? (
              <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-[#d4d4d4] bg-[#fafafa] px-6 text-center text-sm leading-6 text-[#4d4d4d] sm:text-base">
                Add at least one positive value to render the tree map.
              </div>
            ) : (
              <div className="flex-1 rounded-2xl border border-[#ebebeb] bg-[#fafafa] p-3 sm:p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <Treemap
                    data={chartData}
                    dataKey="value"
                    stroke="#ffffff"
                    content={<CustomizedContent />}
                    isAnimationActive={false}
                  />
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
