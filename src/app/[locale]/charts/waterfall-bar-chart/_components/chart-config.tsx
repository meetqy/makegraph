import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import { CompactPicker } from 'react-color';
import type { ChartSettings } from './waterfall-bar-chart-maker';

type ChartConfigPanelProps = {
  settings: ChartSettings;
  onChange: (settings: ChartSettings) => void;
};

export function ChartConfigPanel({
  settings,
  onChange,
}: ChartConfigPanelProps) {
  const t = useTranslations('WaterfallBarChart');
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
      <div className="flex h-14 shrink-0 items-center border-b border-[#ebebeb] px-5">
        <h2 className="font-medium text-[#171717] text-sm uppercase tracking-wide">
          {t('editorCustomizeTitle')}
        </h2>
      </div>

      <div className="flex flex-col gap-6 overflow-y-auto p-5">
        <label htmlFor="chart-title" className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            {t('editorChartTitleLabel')}
          </span>
          <Input
            id="chart-title"
            type="text"
            value={settings.title}
            onChange={(e) => updateSetting('title', e.target.value)}
            placeholder={t('editorChartTitlePlaceholder')}
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
          />
        </label>

        <label htmlFor="total-series-label" className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            {t('editorTotalLabel')}
          </span>
          <Input
            id="total-series-label"
            type="text"
            value={settings.totalSeriesLabel}
            onChange={(e) => updateSetting('totalSeriesLabel', e.target.value)}
            placeholder={t('editorTotalLabelPlaceholder')}
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
          />
        </label>

        <div className="flex flex-col gap-3">
          <span className="font-medium text-[#4d4d4d] text-xs">
            {t('editorThemeColor')}
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

        <div className="border-t border-[#ebebeb] pt-5">
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
              <span className="text-[#4d4d4d] text-sm">
                {t('editorShowValues')}
              </span>
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
                {t('editorShowGrid')}
              </span>
            </label>

            <label
              htmlFor="show-connector"
              className="flex cursor-pointer items-center gap-3"
            >
              <Checkbox
                id="show-connector"
                checked={settings.showConnector}
                onCheckedChange={(checked) =>
                  updateSetting('showConnector', !!checked)
                }
              />
              <span className="text-[#4d4d4d] text-sm">
                {t('editorShowConnector')}
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
