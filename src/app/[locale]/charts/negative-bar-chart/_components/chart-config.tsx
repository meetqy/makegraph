import { useEffect, useState, useId } from 'react';
import { Input } from '~/components/ui/input';
import type { ChartSettings } from './negative-bar-chart-maker';
import { Checkbox } from '~/components/ui/checkbox';
import { CompactPicker } from 'react-color';

type ChartConfigPanelProps = {
  settings: ChartSettings;
  onChange: (settings: ChartSettings) => void;
};

export function ChartConfigPanel({
  settings,
  onChange,
}: ChartConfigPanelProps) {
  const chartTitleId = useId();
  const showValuesId = useId();
  const showLegendId = useId();
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
    <div className="flex flex-col bg-white overflow-hidden pb-8">
      <div className="border-[#ebebeb] border-b px-5 h-14 flex items-center shrink-0">
        <h2 className="font-medium text-[#171717] text-sm uppercase tracking-wide">
          Customize
        </h2>
      </div>

      <div className="flex flex-col gap-6 p-5 overflow-y-auto">
        <label htmlFor={chartTitleId} className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Chart Title
          </span>
          <Input
            id={chartTitleId}
            type="text"
            value={settings.title}
            onChange={(e) => updateSetting('title', e.target.value)}
            placeholder="e.g., Monthly Revenue"
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0 shadow-none"
          />
        </label>

        <label htmlFor="series-label" className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Series Label (Legend)
          </span>
          <Input
            id="series-label"
            type="text"
            value={settings.yAxisLabel}
            onChange={(e) => updateSetting('yAxisLabel', e.target.value)}
            placeholder="e.g., Revenue ($)"
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0 shadow-none"
          />
        </label>

        <div className="flex flex-col gap-3">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Theme Color
          </span>
          {mounted ? (
            <div className="rounded-md border border-[#ebebeb] bg-white p-2 compact-picker-container">
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
              htmlFor={showValuesId}
              className="flex cursor-pointer items-center gap-3"
            >
              <Checkbox
                id={showValuesId}
                checked={settings.showValues}
                onCheckedChange={(checked) =>
                  updateSetting('showValues', !!checked)
                }
              />
              <span className="text-[#4d4d4d] text-sm">Show Value Labels</span>
            </label>

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
              <span className="text-[#4d4d4d] text-sm">
                Show Background Grid
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
