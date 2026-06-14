import { useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ChartExporter } from '~/components/chart-exporter';
import type { ChartDataRow, ChartSettings } from './band-seating-chart-maker';
import {
  ARC_HALF_SPAN_DEGREES,
  buildSeatingGeometry,
  VIEW_BOX_HEIGHT,
  VIEW_BOX_WIDTH,
} from './layout-utils';

type ChartPreviewProps = {
  data: ChartDataRow[];
  settings: ChartSettings;
};

export function ChartPreview({ data, settings }: ChartPreviewProps) {
  const t = useTranslations('BandSeatingChart');
  const exportTargetRef = useRef<HTMLDivElement>(null);

  const normalizedRows = useMemo(
    () =>
      data.map((row) => ({
        rowLabel: row.rowLabel.trim(),
        seatCount: Math.max(0, Math.round(Number(row.seatCount) || 0)),
      })),
    [data]
  );

  const geometry = useMemo(
    () => buildSeatingGeometry(normalizedRows, settings),
    [normalizedRows, settings]
  );

  const largeArcFlag = ARC_HALF_SPAN_DEGREES * 2 > 180 ? 1 : 0;
  const validRowCount = geometry.rows.length;

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-white">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#ebebeb] px-6">
        <h2 className="font-medium text-[#171717] text-sm uppercase tracking-wide">
          {t('editorGraphTitle')}
        </h2>
        <ChartExporter
          targetRef={exportTargetRef}
          filename="band-seating-chart"
          exportLabel={t('editorExport')}
          exportingLabel={t('editorExporting')}
          exportAriaLabel={t('editorExportAriaLabel')}
          missingContainerError={t('editorExportErrorMissing')}
          exportFailedError={t('editorExportErrorFailed')}
        />
      </div>

      <div className="flex min-h-0 w-full flex-1 overflow-x-auto overflow-y-hidden">
        <div
          ref={exportTargetRef}
          className="mx-auto flex min-h-0 h-full w-full min-w-[860px] flex-col items-center justify-center p-4 sm:p-6"
        >
          <div className="mb-5 w-full text-center">
            <h3 className="font-medium text-[#171717] text-xl">
              {t('editorPreviewTitle')}
            </h3>
          </div>

          <div className="flex min-h-0 w-full flex-1 flex-col">
            {geometry.totalSeats === 0 ? (
              <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-[#d4d4d4] bg-[#fafafa] px-6 text-center text-sm leading-6 text-[#4d4d4d] sm:text-base">
                {t('editorEmptyState')}
              </div>
            ) : (
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="flex min-h-0 flex-1 p-4 sm:p-5">
                  <svg
                    viewBox={`0 0 ${VIEW_BOX_WIDTH} ${VIEW_BOX_HEIGHT}`}
                    className="h-full min-h-0 w-full"
                    role="img"
                    aria-label={t('editorPreviewTitle')}
                  >
                    {geometry.rows.map((row) => (
                      <g key={row.id}>
                        <path
                          d={`M ${row.arcStart.x} ${row.arcStart.y} A ${row.radius} ${row.radius} 0 ${largeArcFlag} 1 ${row.arcEnd.x} ${row.arcEnd.y}`}
                          fill="none"
                          stroke="#e5e5e5"
                          strokeWidth="1.5"
                        />
                        <text
                          x={row.labelPosition.x}
                          y={row.labelPosition.y}
                          fill="#4d4d4d"
                          fontSize="14"
                          fontWeight="600"
                          textAnchor="end"
                          dominantBaseline="middle"
                        >
                          {row.label}
                        </text>
                        {row.seats.map((seat) => {
                          const size = settings.seatSize;
                          return (
                            <rect
                              key={seat.id}
                              x={seat.x - size / 2}
                              y={seat.y - size / 2}
                              width={size}
                              height={size}
                              fill="#ffffff"
                              stroke="#171717"
                              strokeWidth="1.5"
                              rx="2"
                            />
                          );
                        })}
                      </g>
                    ))}

                    <g
                      transform={`translate(${geometry.stage.x} ${geometry.stage.y}) rotate(${geometry.stage.rotation})`}
                    >
                      <rect
                        x={-geometry.stage.width / 2}
                        y={-geometry.stage.height / 2}
                        width={geometry.stage.width}
                        height={geometry.stage.height}
                        rx="4"
                        fill="#d4d4d4"
                      />
                    </g>
                  </svg>
                </div>
                <p className="pt-2 text-center text-[#888888] text-sm">
                  {validRowCount} {t('editorRowsUnit')} · {geometry.totalSeats}{' '}
                  {t('editorSeatsUnit')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
