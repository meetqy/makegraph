import { useEffect, useState } from 'react';
import { CompactPicker } from 'react-color';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import type { ChartSettings } from './scatter-chart-maker';

type ChartConfigPanelProps = {
  settings: ChartSettings;
  onChange: (settings: ChartSettings) => void;
};

export function ChartConfigPanel({
  settings,
  onChange,
}: ChartConfigPanelProps) {
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
        <label htmlFor="chart-title" className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Chart Title
          </span>
          <Input
            id="chart-title"
            type="text"
            value={settings.title}
            onChange={(e) => updateSetting('title', e.target.value)}
            placeholder="e.g., Campaign Efficiency Map"
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
          />
        </label>

        <label htmlFor="series-label" className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Series Label
          </span>
          <Input
            id="series-label"
            type="text"
            value={settings.seriesLabel}
            onChange={(e) => updateSetting('seriesLabel', e.target.value)}
            placeholder="e.g., Campaigns"
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label htmlFor="x-axis-label" className="flex flex-col gap-2">
            <span className="font-medium text-[#4d4d4d] text-xs">
              X Axis Label
            </span>
            <Input
              id="x-axis-label"
              type="text"
              value={settings.xAxisLabel}
              onChange={(e) => updateSetting('xAxisLabel', e.target.value)}
              placeholder="e.g., Spend (k$)"
              className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
            />
          </label>

          <label htmlFor="y-axis-label" className="flex flex-col gap-2">
            <span className="font-medium text-[#4d4d4d] text-xs">
              Y Axis Label
            </span>
            <Input
              id="y-axis-label"
              type="text"
              value={settings.yAxisLabel}
              onChange={(e) => updateSetting('yAxisLabel', e.target.value)}
              placeholder="e.g., Conversion Rate (%)"
              className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
            />
          </label>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Theme Color
          </span>
          {mounted ? (
            <div className="compact-picker-container rounded-md border border-[#ebebeb] bg-white p-2">
              <CompactPicker
                color={settings.color}
                onChange={(color) => updateSetting('color', color.hex)}
              />
            </div>
          ) : (
            <div className="h-[90px]" />
          )}
        </div>

        <div className="border-[#ebebeb] border-t pt-5">
          <div className="flex flex-col gap-4">
            <label
              htmlFor="show-legend"
              className="flex cursor-pointer items-center gap-3"
            >
              <Checkbox
                id="show-legend"
                checked={settings.showLegend}
                onCheckedChange={(checked) =>
                  updateSetting('showLegend', !!checked)
                }
              />
              <span className="text-[#4d4d4d] text-sm">Show Legend</span>
            </label>

            <label
              htmlFor="show-grid"
              className="flex cursor-pointer items-center gap-3"
            >
              <Checkbox
                id="show-grid"
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
