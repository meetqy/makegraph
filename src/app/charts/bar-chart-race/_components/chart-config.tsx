import { useEffect, useState } from 'react';
import { CompactPicker } from 'react-color';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import type { CategoryColorEntry, ChartSettings } from './types';

type ChartConfigPanelProps = {
  settings: ChartSettings;
  onChange: (settings: ChartSettings) => void;
  categories: CategoryColorEntry[];
  onCategoryColorChange: (name: string, color: string) => void;
};

export function ChartConfigPanel({
  settings,
  onChange,
  categories,
  onCategoryColorChange,
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
            onChange={(event) => updateSetting('title', event.target.value)}
            placeholder="e.g., Top Companies by Market Cap"
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
          />
        </label>

        <label htmlFor="series-label" className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Value Label
          </span>
          <Input
            id="series-label"
            type="text"
            value={settings.seriesLabel}
            onChange={(event) =>
              updateSetting('seriesLabel', event.target.value)
            }
            placeholder="e.g., Market Cap (B)"
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
          />
        </label>

        <label htmlFor="top-count" className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Visible Bars
          </span>
          <Input
            id="top-count"
            type="number"
            min={3}
            max={15}
            value={settings.topCount}
            onChange={(event) =>
              updateSetting(
                'topCount',
                Math.min(15, Math.max(3, Number(event.target.value) || 3))
              )
            }
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
          />
        </label>

        <label htmlFor="playback-ms" className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Playback Speed (ms)
          </span>
          <Input
            id="playback-ms"
            type="number"
            min={500}
            max={6000}
            step={100}
            value={settings.playbackMs}
            onChange={(event) =>
              updateSetting(
                'playbackMs',
                Math.min(6000, Math.max(500, Number(event.target.value) || 500))
              )
            }
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
          />
        </label>

        <div className="border-[#ebebeb] border-t pt-5">
          <span className="font-medium text-[#4d4d4d] text-xs">Bar Colors</span>
          {categories.length === 0 ? (
            <p className="mt-2 text-[#888888] text-xs">
              Add categories in the data table to customize bar colors.
            </p>
          ) : (
            <div className="mt-3 flex flex-col gap-4">
              {categories.map((category) => (
                <div className="flex flex-col gap-2" key={category.name}>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block size-3 shrink-0 rounded-sm border border-[#ebebeb]"
                      style={{ backgroundColor: category.color }}
                      aria-hidden
                    />
                    <span className="truncate font-medium text-[#171717] text-xs">
                      {category.name}
                    </span>
                  </div>
                  {mounted ? (
                    <div className="rounded-md border border-[#ebebeb] bg-white p-2 compact-picker-container">
                      <CompactPicker
                        color={category.color}
                        onChange={(color) =>
                          onCategoryColorChange(category.name, color.hex)
                        }
                      />
                    </div>
                  ) : (
                    <div className="h-[90px]" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-[#ebebeb] border-t pt-5">
          <div className="flex flex-col gap-4">
            <label
              htmlFor="show-values"
              className="flex cursor-pointer items-center gap-3"
            >
              <Checkbox
                id="show-values"
                checked={settings.showValues}
                onCheckedChange={(checked) =>
                  updateSetting('showValues', !!checked)
                }
              />
              <span className="text-[#4d4d4d] text-sm">Show Value Labels</span>
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

            <label
              htmlFor="loop-animation"
              className="flex cursor-pointer items-center gap-3"
            >
              <Checkbox
                id="loop-animation"
                checked={settings.loop}
                onCheckedChange={(checked) => updateSetting('loop', !!checked)}
              />
              <span className="text-[#4d4d4d] text-sm">Loop Playback</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
