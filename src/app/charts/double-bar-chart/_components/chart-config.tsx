import { Input } from '~/components/ui/input';
import type { ChartSettings } from './double-bar-chart-maker';
import { Checkbox } from '~/components/ui/checkbox';

// 主题颜色选项
const THEME_COLORS = [
  { label: 'Ink', value: '#171717' },
  { label: 'Gray', value: '#a3a3a3' },
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
        {/* 标题设置 */}
        <label htmlFor="chart-title" className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            Chart Title
          </span>
          <Input
            id="chart-title"
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
            <div className="flex flex-wrap gap-3">
              {THEME_COLORS.map((c) => (
                <button
                  type="button"
                  key={c.value}
                  onClick={() => updateSetting('color1', c.value)}
                  title={c.label}
                  className={`size-7 rounded-full border-2 transition-transform hover:scale-110 ${
                    settings.color1 === c.value
                      ? 'border-[#171717] ring-2 ring-transparent ring-offset-2 ring-offset-white'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
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
            <div className="flex flex-wrap gap-3">
              {THEME_COLORS.map((c) => (
                <button
                  type="button"
                  key={c.value}
                  onClick={() => updateSetting('color2', c.value)}
                  title={c.label}
                  className={`size-7 rounded-full border-2 transition-transform hover:scale-110 ${
                    settings.color2 === c.value
                      ? 'border-[#171717] ring-2 ring-transparent ring-offset-2 ring-offset-white'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 图表通用设置 */}
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
