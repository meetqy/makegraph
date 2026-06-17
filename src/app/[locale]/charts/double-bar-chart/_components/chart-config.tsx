import { useEffect, useState, useId } from 'react';
import { Input } from '~/components/ui/input';
import type { ChartSettings } from './double-bar-chart-maker';
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
        {/* 标题设置 */}
        <label htmlFor={chartTitleId} className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Chart Title
          </span>
          <Input
            id={chartTitleId}
            type="text"
            value={settings.title}
            onChange={(e) => updateSetting('title', e.target.value)}
            placeholder="e.g., Revenue Comparison"
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0 shadow-none"
          />
        </label>

        {/* 系列1设置 */}
        <div className="flex flex-col gap-4 border-[#ebebeb] border-t pt-5">
          <span className="font-medium text-[#171717] text-sm">Series 1</span>
          <label htmlFor="series-1-label" className="flex flex-col gap-2">
            <span className="font-medium text-[#4d4d4d] text-xs">
              Label (Legend)
            </span>
            <Input
              id="series-1-label"
              type="text"
              value={settings.yAxisLabel1}
              onChange={(e) => updateSetting('yAxisLabel1', e.target.value)}
              placeholder="e.g., This Year"
              className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0 shadow-none"
            />
          </label>
          <div className="flex flex-col gap-3">
            <span className="font-medium text-[#4d4d4d] text-xs">Color</span>
            {mounted ? (
              <div className="rounded-md border border-[#ebebeb] bg-white p-2 compact-picker-container">
                <CompactPicker
                  color={settings.color1}
                  onChange={(color) => updateSetting('color1', color.hex)}
                />
              </div>
            ) : (
              <div className="h-[90px]" />
            )}
          </div>
        </div>

        {/* 系列2设置 */}
        <div className="flex flex-col gap-4 border-[#ebebeb] border-t pt-5">
          <span className="font-medium text-[#171717] text-sm">Series 2</span>
          <label htmlFor="series-2-label" className="flex flex-col gap-2">
            <span className="font-medium text-[#4d4d4d] text-xs">
              Label (Legend)
            </span>
            <Input
              id="series-2-label"
              type="text"
              value={settings.yAxisLabel2}
              onChange={(e) => updateSetting('yAxisLabel2', e.target.value)}
              placeholder="e.g., Last Year"
              className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0 shadow-none"
            />
          </label>
          <div className="flex flex-col gap-3">
            <span className="font-medium text-[#4d4d4d] text-xs">Color</span>
            {mounted ? (
              <div className="rounded-md border border-[#ebebeb] bg-white p-2 compact-picker-container">
                <CompactPicker
                  color={settings.color2}
                  onChange={(color) => updateSetting('color2', color.hex)}
                />
              </div>
            ) : (
              <div className="h-[90px]" />
            )}
          </div>
        </div>

        {/* 图表通用设置 */}
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
