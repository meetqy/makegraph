import type { ChartSettings } from './bar-chart-maker';

const THEME_COLORS = [
  { label: 'Ink', value: '#171717' },
  { label: 'Blue', value: '#0070f3' },
  { label: 'Violet', value: '#7928ca' },
  { label: 'Cyan', value: '#50e3c2' },
  { label: 'Pink', value: '#ff0080' },
  { label: 'Warning', value: '#f5a623' },
];

type ChartConfigPanelProps = {
  settings: ChartSettings;
  onChange: (settings: ChartSettings) => void;
};

export function ChartConfigPanel({
  settings,
  onChange,
}: ChartConfigPanelProps) {
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
        <label className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Chart Title
          </span>
          <input
            type="text"
            value={settings.title}
            onChange={(e) => updateSetting('title', e.target.value)}
            placeholder="e.g., Monthly Revenue"
            className="w-full rounded-md border border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm outline-none transition-colors focus:border-[#171717] focus:bg-white"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Series Label (Legend)
          </span>
          <input
            type="text"
            value={settings.yAxisLabel}
            onChange={(e) => updateSetting('yAxisLabel', e.target.value)}
            placeholder="e.g., Revenue ($)"
            className="w-full rounded-md border border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm outline-none transition-colors focus:border-[#171717] focus:bg-white"
          />
        </label>

        <div className="flex flex-col gap-3">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Theme Color
          </span>
          <div className="flex flex-wrap gap-3">
            {THEME_COLORS.map((c) => (
              <button
                type="button"
                key={c.value}
                onClick={() => updateSetting('color', c.value)}
                title={c.label}
                className={`size-7 rounded-full border-2 transition-transform hover:scale-110 ${
                  settings.color === c.value
                    ? 'border-[#171717] ring-2 ring-transparent ring-offset-2 ring-offset-white'
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: c.value }}
              />
            ))}
          </div>
        </div>

        <div className="border-[#ebebeb] border-t pt-5">
          <div className="flex flex-col gap-4">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={settings.showLegend}
                onChange={(e) => updateSetting('showLegend', e.target.checked)}
                className="size-4 cursor-pointer rounded border-[#ebebeb] accent-[#171717]"
              />
              <span className="text-[#4d4d4d] text-sm">Show Legend</span>
            </label>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={settings.showGrid}
                onChange={(e) => updateSetting('showGrid', e.target.checked)}
                className="size-4 cursor-pointer rounded border-[#ebebeb] accent-[#171717]"
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
