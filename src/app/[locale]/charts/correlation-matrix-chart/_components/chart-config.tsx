import { useEffect, useState } from 'react';
import { CompactPicker } from 'react-color';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import type { ChartSettings } from './correlation-chart-maker';

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

  const renderColorPicker = (
    label: string,
    value: string,
    onColorChange: (nextColor: string) => void
  ) => {
    return (
      <div className="flex flex-col gap-3">
        <span className="font-medium text-[#4d4d4d] text-xs">{label}</span>
        {mounted ? (
          <div className="compact-picker-container rounded-md border border-[#ebebeb] bg-white p-2">
            <CompactPicker
              color={value}
              onChange={(color) => onColorChange(color.hex)}
            />
          </div>
        ) : (
          <div className="h-[90px]" />
        )}
      </div>
    );
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
            placeholder="e.g., Marketing KPI Correlation Matrix"
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
          />
        </label>

        {renderColorPicker('Positive Color', settings.positiveColor, (value) =>
          updateSetting('positiveColor', value)
        )}

        <div className="border-[#ebebeb] border-t pt-5">
          <div className="flex flex-col gap-4">
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
              <span className="text-[#4d4d4d] text-sm">Show Cell Borders</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
