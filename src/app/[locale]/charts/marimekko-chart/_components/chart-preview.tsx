import { useEffect, useMemo, useRef, useState } from 'react';
import type { CustomSeriesRenderItemParams, EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { CustomChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { useTranslations } from 'next-intl';
import { ChartExporter } from '~/components/chart-exporter';
import type { ChartDataRow, ChartSettings } from './marimekko-chart-maker';

echarts.use([CustomChart, GridComponent, TooltipComponent, SVGRenderer]);

type ChartPreviewProps = {
  data: ChartDataRow[];
  settings: ChartSettings;
  columns?: Array<{
    key: string;
    title?: string;
  }>;
};

type SeriesDefinition = {
  key: string;
  name: string;
  color: string;
};

type RowSegment = {
  seriesKey: string;
  seriesName: string;
  color: string;
  value: number;
};

type MarimekkoRow = {
  name: string;
  total: number;
  startPercent: number;
  endPercent: number;
  widthPercent: number;
  centerPercent: number;
  segments: RowSegment[];
};

type RectDatum = {
  rowName: string;
  seriesKey: string;
  seriesName: string;
  color: string;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  rawValue: number;
  rowTotal: number;
  widthPercent: number;
  heightPercent: number;
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

function getTextColor(fill: string) {
  const { r, g, b } = hexToRgb(fill);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 160 ? '#171717' : '#ffffff';
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

function formatValue(value: number) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
  }).format(value);
}

export function ChartPreview({ data, settings, columns }: ChartPreviewProps) {
  const t = useTranslations('MarimekkoChart');
  const exportTargetRef = useRef<HTMLDivElement>(null);
  const [hiddenSeriesKeys, setHiddenSeriesKeys] = useState<string[]>([]);

  const dataColumns = useMemo(() => {
    if (columns && columns.length > 0) {
      return columns.filter((column) => column.key !== 'name');
    }

    const firstRow = data[0];
    if (!firstRow) {
      return [];
    }

    return Object.keys(firstRow)
      .filter((key) => key !== 'name')
      .map((key) => ({
        key,
        title: key,
      }));
  }, [columns, data]);

  const seriesDefinitions = useMemo<SeriesDefinition[]>(() => {
    const defaultColors = [
      '#171717',
      '#525252',
      '#a3a3a3',
      '#d4d4d4',
      '#e5e5e5',
    ];

    return dataColumns.map((column, index) => ({
      key: column.key,
      name:
        column.title ||
        t(`editorSeries${index + 1}Fallback` as never) ||
        `Series ${index + 1}`,
      color:
        settings.colors?.[index] ??
        defaultColors[index % defaultColors.length] ??
        '#171717',
    }));
  }, [dataColumns, settings.colors, t]);

  useEffect(() => {
    const validSeriesKeys = new Set(
      seriesDefinitions.map((series) => series.key)
    );

    setHiddenSeriesKeys((prev) =>
      prev.filter((seriesKey) => validSeriesKeys.has(seriesKey))
    );
  }, [seriesDefinitions]);

  const hiddenSeriesKeySet = useMemo(
    () => new Set(hiddenSeriesKeys),
    [hiddenSeriesKeys]
  );

  const visibleSeriesDefinitions = useMemo(
    () =>
      seriesDefinitions.filter((series) => !hiddenSeriesKeySet.has(series.key)),
    [hiddenSeriesKeySet, seriesDefinitions]
  );

  const marimekkoRows = useMemo<MarimekkoRow[]>(() => {
    const baseRows = data
      .map((row) => {
        const name = String(row.name ?? '').trim();
        if (!name) {
          return null;
        }

        const segments = visibleSeriesDefinitions
          .map<RowSegment | null>((series) => {
            const rawValue = Number(row[series.key]);
            if (!Number.isFinite(rawValue) || rawValue <= 0) {
              return null;
            }

            return {
              seriesKey: series.key,
              seriesName: series.name,
              color: series.color,
              value: rawValue,
            };
          })
          .filter((segment): segment is RowSegment => segment !== null);

        const total = segments.reduce((sum, segment) => sum + segment.value, 0);
        if (total <= 0) {
          return null;
        }

        return {
          name,
          total,
          segments,
        };
      })
      .filter(
        (
          row
        ): row is {
          name: string;
          total: number;
          segments: RowSegment[];
        } => row !== null
      );

    const grandTotal = baseRows.reduce((sum, row) => sum + row.total, 0);
    let currentStart = 0;

    return baseRows.map((row) => {
      const widthPercent = grandTotal > 0 ? (row.total / grandTotal) * 100 : 0;
      const startPercent = currentStart;
      const endPercent = startPercent + widthPercent;
      currentStart = endPercent;

      return {
        name: row.name,
        total: row.total,
        startPercent,
        endPercent,
        widthPercent,
        centerPercent: startPercent + widthPercent / 2,
        segments: row.segments,
      };
    });
  }, [data, visibleSeriesDefinitions]);

  const rectData = useMemo<RectDatum[]>(() => {
    return marimekkoRows.flatMap((row) => {
      let currentHeight = 0;

      return row.segments.map((segment) => {
        const heightPercent =
          row.total > 0 ? (segment.value / row.total) * 100 : 0;
        const y0 = currentHeight;
        const y1 = y0 + heightPercent;
        currentHeight = y1;

        return {
          rowName: row.name,
          seriesKey: segment.seriesKey,
          seriesName: segment.seriesName,
          color: segment.color,
          x0: row.startPercent,
          x1: row.endPercent,
          y0,
          y1,
          rawValue: segment.value,
          rowTotal: row.total,
          widthPercent: row.widthPercent,
          heightPercent,
        };
      });
    });
  }, [marimekkoRows]);

  const option = useMemo(() => {
    return {
      animation: false,
      grid: {
        top: 24,
        right: 20,
        bottom: 82,
        left: 20,
      },
      xAxis: {
        type: 'value',
        min: 0,
        max: 100,
        splitNumber: 4,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#ebebeb',
          },
        },
        axisLabel: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        splitNumber: 5,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#ebebeb',
          },
        },
        axisLabel: {
          show: false,
        },
      },
      tooltip: {
        trigger: 'item',
        borderWidth: 1,
        borderColor: '#ebebeb',
        backgroundColor: '#ffffff',
        extraCssText: 'border-radius: 0; padding: 8px 10px;',
        textStyle: {
          color: '#171717',
          fontSize: 13,
        },
        formatter: (params) => {
          const raw = params as { dataIndex?: number };
          const datum =
            typeof raw.dataIndex === 'number'
              ? rectData[raw.dataIndex]
              : undefined;

          if (!datum) {
            return '';
          }

          return [
            datum.rowName,
            `${datum.seriesName}: ${formatValue(datum.rawValue)}`,
            `${t('editorTooltipColumnWidth')}: ${formatPercent(datum.widthPercent)}`,
            `${t('editorTooltipSegmentHeight')}: ${formatPercent(datum.heightPercent)}`,
            `${t('editorTooltipColumnTotal')}: ${formatValue(datum.rowTotal)}`,
          ].join('<br/>');
        },
      },
      series: [
        {
          type: 'custom' as const,
          data: rectData.map((_, index) => index),
          renderItem: (params: CustomSeriesRenderItemParams, api: any) => {
            const datum = rectData[params.dataIndex];
            if (!datum) {
              return null;
            }

            const topLeft = api.coord([datum.x0, datum.y1]);
            const bottomRight = api.coord([datum.x1, datum.y0]);
            const x = topLeft[0];
            const y = topLeft[1];
            const width = bottomRight[0] - topLeft[0];
            const height = bottomRight[1] - topLeft[1];
            const showInnerLabel =
              settings.showValues && width >= 42 && height >= 28;

            const rectShape = echarts.graphic.clipRectByRect(
              {
                x,
                y,
                width,
                height,
              },
              {
                x: (params.coordSys as any).x,
                y: (params.coordSys as any).y,
                width: (params.coordSys as any).width,
                height: (params.coordSys as any).height,
              }
            );

            if (!rectShape) {
              return null;
            }

            return {
              type: 'group',
              children: [
                {
                  type: 'rect',
                  shape: rectShape,
                  style: {
                    fill: datum.color,
                    stroke: '#ffffff',
                    lineWidth: 2,
                  },
                },
                ...(showInnerLabel
                  ? [
                      {
                        type: 'text',
                        style: {
                          x: x + width / 2,
                          y: y + height / 2,
                          text: formatPercent(datum.heightPercent),
                          fill: getTextColor(datum.color),
                          fontSize: 12,
                          fontWeight: 600,
                          align: 'center',
                          verticalAlign: 'middle',
                        },
                        silent: true,
                      },
                    ]
                  : []),
              ],
            };
          },
        },
      ],
    } as EChartsOption;
  }, [rectData, settings.showValues, t]);

  const hasData = marimekkoRows.length > 0 && rectData.length > 0;

  const toggleSeries = (seriesKey: string) => {
    setHiddenSeriesKeys((prev) =>
      prev.includes(seriesKey)
        ? prev.filter((key) => key !== seriesKey)
        : [...prev, seriesKey]
    );
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#ebebeb] px-6">
        <h2 className="font-medium text-[#171717] text-sm uppercase tracking-wide">
          {t('editorGraphTitle')}
        </h2>
        <ChartExporter
          targetRef={exportTargetRef}
          filename="marimekko-chart"
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
          className="mx-auto flex h-full min-h-[520px] w-full min-w-[860px] flex-col p-4 sm:p-6"
        >
          {settings.title ? (
            <h3 className="mb-6 shrink-0 text-center font-medium text-[#171717] text-xl">
              {settings.title}
            </h3>
          ) : null}

          {!hasData ? (
            <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-[#d4d4d4] bg-[#fafafa] px-6 text-center text-sm leading-6 text-[#4d4d4d] sm:text-base">
              {t('editorEmptyState')}
            </div>
          ) : (
            <>
              <div className="relative flex-1 p-3 sm:p-4">
                <div className="relative h-full w-full">
                  <ReactEChartsCore
                    echarts={echarts}
                    option={option}
                    notMerge
                    lazyUpdate
                    opts={{ renderer: 'svg' }}
                    style={{ width: '100%', height: '100%' }}
                  />

                  <div
                    className="pointer-events-none absolute bottom-4 h-14"
                    style={{ left: 20, right: 20 }}
                  >
                    {marimekkoRows.map((row) => (
                      <div
                        key={row.name}
                        className="absolute text-[#4d4d4d] text-xs"
                        style={{
                          left: `${row.centerPercent}%`,
                          transform: 'translateX(-50%) rotate(45deg)',
                          transformOrigin: 'top left',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {row.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {seriesDefinitions.length > 0 ? (
                <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
                  {seriesDefinitions.map((series) => {
                    const isHidden = hiddenSeriesKeySet.has(series.key);

                    return (
                      <button
                        type="button"
                        key={series.key}
                        onClick={() => toggleSeries(series.key)}
                        className={`flex cursor-pointer items-center gap-2 text-sm transition-opacity ${
                          isHidden ? 'opacity-40' : 'opacity-100'
                        }`}
                      >
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor: isHidden
                              ? '#d4d4d4'
                              : series.color,
                          }}
                        />
                        <span
                          className={
                            isHidden
                              ? 'text-[#a3a3a3] line-through'
                              : 'text-[#4d4d4d]'
                          }
                        >
                          {series.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
