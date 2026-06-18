import { useEffect, useId, useState } from 'react';
import { CompactPicker } from 'react-color';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import type { ChartSettings } from './confidence-interval-area-chart-maker';

type ChartConfigPanelProps = {
  settings: ChartSettings;
  onChange: (settings: ChartSettings) => void;
};

export function ChartConfigPanel({
  settings,
  onChange,
}: ChartConfigPanelProps) {
  const chartTitleId = useId();
  const trendLabelId = useId();
  const intervalLabelId = useId();
  const yAxisLabelId = useId();
  const showLegendId = useId();
  const showGridId = useId();
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
        <label htmlFor={chartTitleId} className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Chart Title
          </span>
          <Input
            id={chartTitleId}
            type="text"
            value={settings.title}
            onChange={(event) => updateSetting('title', event.target.value)}
            placeholder="e.g., Demand Forecast With 95% Confidence Interval"
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
          />
        </label>

        <label htmlFor={trendLabelId} className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Trend Line Label
          </span>
          <Input
            id={trendLabelId}
            type="text"
            value={settings.trendLabel}
            onChange={(event) =>
              updateSetting('trendLabel', event.target.value)
            }
            placeholder="e.g., Forecast"
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
          />
        </label>

        <label htmlFor={intervalLabelId} className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Confidence Band Label
          </span>
          <Input
            id={intervalLabelId}
            type="text"
            value={settings.intervalLabel}
            onChange={(event) =>
              updateSetting('intervalLabel', event.target.value)
            }
            placeholder="e.g., 95% Confidence Interval"
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
          />
        </label>

        <label htmlFor={yAxisLabelId} className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Y Axis Label
          </span>
          <Input
            id={yAxisLabelId}
            type="text"
            value={settings.yAxisLabel}
            onChange={(event) =>
              updateSetting('yAxisLabel', event.target.value)
            }
            placeholder="e.g., Orders"
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
          />
        </label>

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
          </div>
        </div>
      </div>
    </div>
  );
}
