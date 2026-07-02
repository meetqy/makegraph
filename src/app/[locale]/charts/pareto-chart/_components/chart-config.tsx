import { useEffect, useId, useState } from 'react';
import { CompactPicker } from 'react-color';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import type { ChartSettings } from './pareto-chart-maker';

type ChartConfigPanelProps = {
  settings: ChartSettings;
  onChange: (settings: ChartSettings) => void;
};

export function ChartConfigPanel({
  settings,
  onChange,
}: ChartConfigPanelProps) {
  const barSeriesLabelId = useId();
  const lineSeriesLabelId = useId();
  const countAxisLabelId = useId();
  const percentageAxisLabelId = useId();
  const targetPercentageId = useId();
  const showLegendId = useId();
  const showGridId = useId();
  const showValueLabelsId = useId();
  const sortDescendingId = useId();
  const showTargetLineId = useId();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateSetting = <K extends keyof ChartSettings>(
    key: K,
    value: ChartSettings[K]
  ) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white pb-8">
      <div className="flex h-14 shrink-0 items-center border-[#ebebeb] border-b px-5">
        <h2 className="font-medium text-[#171717] text-sm uppercase tracking-wide">
          Customize
        </h2>
      </div>

      <div className="flex flex-col gap-6 overflow-y-auto p-5">
        <label htmlFor={barSeriesLabelId} className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Bar Series Label
          </span>
          <Input
            id={barSeriesLabelId}
            type="text"
            value={settings.barSeriesLabel}
            onChange={(event) =>
              updateSetting('barSeriesLabel', event.target.value)
            }
            placeholder="e.g., Defect Count"
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
          />
        </label>

        <label htmlFor={lineSeriesLabelId} className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Cumulative Line Label
          </span>
          <Input
            id={lineSeriesLabelId}
            type="text"
            value={settings.lineSeriesLabel}
            onChange={(event) =>
              updateSetting('lineSeriesLabel', event.target.value)
            }
            placeholder="e.g., Cumulative %"
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
          />
        </label>

        <label htmlFor={countAxisLabelId} className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Count Axis Label
          </span>
          <Input
            id={countAxisLabelId}
            type="text"
            value={settings.countAxisLabel}
            onChange={(event) =>
              updateSetting('countAxisLabel', event.target.value)
            }
            placeholder="e.g., Frequency"
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
          />
        </label>

        <label htmlFor={percentageAxisLabelId} className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Percentage Axis Label
          </span>
          <Input
            id={percentageAxisLabelId}
            type="text"
            value={settings.percentageAxisLabel}
            onChange={(event) =>
              updateSetting('percentageAxisLabel', event.target.value)
            }
            placeholder="e.g., Cumulative Percentage"
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
          />
        </label>

        <label htmlFor={targetPercentageId} className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Target Reference Percentage
          </span>
          <Input
            id={targetPercentageId}
            type="number"
            min={0}
            max={100}
            step="1"
            value={settings.targetPercentage}
            onChange={(event) => {
              const nextValue = Number(event.target.value);
              if (Number.isFinite(nextValue)) {
                updateSetting('targetPercentage', nextValue);
              }
            }}
            placeholder="80"
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
          />
        </label>

        <div className="flex flex-col gap-3">
          <span className="font-medium text-[#4d4d4d] text-xs">Bar Color</span>
          {mounted ? (
            <div className="compact-picker-container rounded-md border border-[#ebebeb] bg-white p-2">
              <CompactPicker
                color={settings.barColor}
                onChange={(color) => updateSetting('barColor', color.hex)}
              />
            </div>
          ) : (
            <div className="h-[90px]" />
          )}
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-medium text-[#4d4d4d] text-xs">Line Color</span>
          {mounted ? (
            <div className="compact-picker-container rounded-md border border-[#ebebeb] bg-white p-2">
              <CompactPicker
                color={settings.lineColor}
                onChange={(color) => updateSetting('lineColor', color.hex)}
              />
            </div>
          ) : (
            <div className="h-[90px]" />
          )}
        </div>

        <div className="border-[#ebebeb] border-t pt-5">
          <div className="flex flex-col gap-4">
            <label
              htmlFor={showLegendId}
              className="flex cursor-pointer items-center gap-3"
            >
              <Checkbox
                id={showLegendId}
                checked={settings.showLegend}
                onCheckedChange={(checked) =>
                  updateSetting('showLegend', !!checked)
                }
              />
              <span className="text-[#4d4d4d] text-sm">Show Legend</span>
            </label>

            <label
              htmlFor={showGridId}
              className="flex cursor-pointer items-center gap-3"
            >
              <Checkbox
                id={showGridId}
                checked={settings.showGrid}
                onCheckedChange={(checked) =>
                  updateSetting('showGrid', !!checked)
                }
              />
              <span className="text-[#4d4d4d] text-sm">Show Grid</span>
            </label>

            <label
              htmlFor={showValueLabelsId}
              className="flex cursor-pointer items-center gap-3"
            >
              <Checkbox
                id={showValueLabelsId}
                checked={settings.showValueLabels}
                onCheckedChange={(checked) =>
                  updateSetting('showValueLabels', !!checked)
                }
              />
              <span className="text-[#4d4d4d] text-sm">Show Bar Values</span>
            </label>

            <label
              htmlFor={sortDescendingId}
              className="flex cursor-pointer items-center gap-3"
            >
              <Checkbox
                id={sortDescendingId}
                checked={settings.sortDescending}
                onCheckedChange={(checked) =>
                  updateSetting('sortDescending', !!checked)
                }
              />
              <span className="text-[#4d4d4d] text-sm">
                Sort Bars Descending
              </span>
            </label>

            <label
              htmlFor={showTargetLineId}
              className="flex cursor-pointer items-center gap-3"
            >
              <Checkbox
                id={showTargetLineId}
                checked={settings.showTargetLine}
                onCheckedChange={(checked) =>
                  updateSetting('showTargetLine', !!checked)
                }
              />
              <span className="text-[#4d4d4d] text-sm">Show Target Line</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
