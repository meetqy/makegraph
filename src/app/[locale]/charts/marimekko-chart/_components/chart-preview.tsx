import { useMemo, useRef } from 'react';
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
};

type NormalizedRow = {
  name: string;
  values: number[];
  total: number;
  widthPercent: number;
  startPercent: number;
  endPercent: number;
  centerPercent: number;
};

type RectDatum = {
  rowName: string;
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

export function ChartPreview({ data, settings }: ChartPreviewProps) {
  const t = useTranslations('MarimekkoChart');
  const exportTargetRef = useRef<HTMLDivElement>(null);

  const seriesMeta = useMemo(
    () => [
      {
        name: settings.seriesLabel1 || t('editorSeries1Fallback'),
        color: settings.color1,
      },
      {
        name: settings.seriesLabel2 || t('editorSeries2Fallback'),
        color: settings.color2,
      },
      {
        name: settings.seriesLabel3 || t('editorSeries3Fallback'),
        color: settings.color3,
      },
    ],
    [
      settings.color1,
      settings.color2,
      settings.color3,
      settings.seriesLabel1,
      settings.seriesLabel2,
      settings.seriesLabel3,
      t,
    ]
  );

  const normalizedRows = useMemo<NormalizedRow[]>(() => {
    const cleaned = data
      .map((row) => {
        const name = row.name.trim();
        const values = [row.value1, row.value2, row.value3].map((value) =>
          Number.isFinite(value) && value > 0 ? value : 0
        );
        const total = values.reduce((sum, value) => sum + value, 0);

        return {
          name,
          values,
          total,
        };
      })
      .filter((row) => row.name && row.total > 0);

    const grandTotal = cleaned.reduce((sum, row) => sum + row.total, 0);
    let cumulative = 0;

    return cleaned.map((row) => {
      const widthPercent = grandTotal > 0 ? (row.total / grandTotal) * 100 : 0;
      const startPercent = cumulative;
      const endPercent = cumulative + widthPercent;
      cumulative = endPercent;

      return {
        ...row,
        widthPercent,
        startPercent,
        endPercent,
        centerPercent: startPercent + widthPercent / 2,
      };
    });
  }, [data]);

  const rectData = useMemo<RectDatum[]>(() => {
    return normalizedRows.flatMap((row) => {
      let cumulativeHeight = 0;

      return row.values.map((value, index) => {
        const heightPercent = row.total > 0 ? (value / row.total) * 100 : 0;
        const datum: RectDatum = {
          rowName: row.name,
          seriesName: seriesMeta[index]?.name ?? `Series ${index + 1}`,
          color: seriesMeta[index]?.color ?? '#171717',
          x0: row.startPercent,
          x1: row.endPercent,
          y0: cumulativeHeight,
          y1: cumulativeHeight + heightPercent,
          rawValue: value,
          rowTotal: row.total,
          widthPercent: row.widthPercent,
          heightPercent,
        };

        cumulativeHeight += heightPercent;
        return datum;
      });
    });
  }, [normalizedRows, seriesMeta]);

  const option = useMemo<EChartsOption>(() => {
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
          show: settings.showGrid,
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
          show: settings.showGrid,
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
        formatter: (params: any) => {
          const datum = rectData[params.dataIndex];
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
          renderItem: (params: CustomSeriesRenderItemParams, api: any): any => {
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
            const labelFits =
              settings.showValues && width >= 42 && height >= 28;
            const textColor = getTextColor(datum.color);

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
                ...(labelFits
                  ? [
                      {
                        type: 'text',
                        style: {
                          x: x + width / 2,
                          y: y + height / 2,
                          text: formatPercent(datum.heightPercent),
                          fill: textColor,
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
    };
  }, [rectData, settings.showGrid, settings.showValues, t]);

  const hasData = normalizedRows.length > 0;

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-white">
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
          className="mx-auto flex h-full min-h-[520px] w-full min-w-[860px] flex-col bg-white p-4 sm:p-6"
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
              <div className="relative flex-1 rounded-2xl border border-[#ebebeb] bg-[#fafafa] p-3 sm:p-4">
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
                    {normalizedRows.map((row) => (
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

              {settings.showLegend ? (
                <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
                  {seriesMeta.map((series) => (
                    <div
                      key={series.name}
                      className="flex items-center gap-2 text-sm text-[#4d4d4d]"
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: series.color }}
                      />
                      <span>{series.name}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
