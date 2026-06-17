import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { CompactPicker } from 'react-color';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import type { ChartSettings } from './marimekko-chart-maker';

type ChartConfigPanelProps = {
  settings: ChartSettings;
  onChange: (settings: ChartSettings) => void;
};

export function ChartConfigPanel({
  settings,
  onChange,
}: ChartConfigPanelProps) {
  const t = useTranslations('MarimekkoChart');
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

        <div className="flex flex-col gap-4 border-t border-[#ebebeb] pt-5">
          <span className="font-medium text-[#171717] text-sm">
            {t('editorSeries1Title')}
          </span>
          <label htmlFor="series-1-label" className="flex flex-col gap-2">
            <span className="font-medium text-[#4d4d4d] text-xs">
              {t('editorLegendLabel')}
            </span>
            <Input
              id="series-1-label"
              type="text"
              value={settings.seriesLabel1}
              onChange={(e) => updateSetting('seriesLabel1', e.target.value)}
              placeholder={t('editorSeries1Placeholder')}
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
                  color={settings.color1}
                  onChange={(color) => updateSetting('color1', color.hex)}
                />
              </div>
            ) : (
              <div className="h-[90px]" />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#ebebeb] pt-5">
          <span className="font-medium text-[#171717] text-sm">
            {t('editorSeries2Title')}
          </span>
          <label htmlFor="series-2-label" className="flex flex-col gap-2">
            <span className="font-medium text-[#4d4d4d] text-xs">
              {t('editorLegendLabel')}
            </span>
            <Input
              id="series-2-label"
              type="text"
              value={settings.seriesLabel2}
              onChange={(e) => updateSetting('seriesLabel2', e.target.value)}
              placeholder={t('editorSeries2Placeholder')}
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
                  color={settings.color2}
                  onChange={(color) => updateSetting('color2', color.hex)}
                />
              </div>
            ) : (
              <div className="h-[90px]" />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#ebebeb] pt-5">
          <span className="font-medium text-[#171717] text-sm">
            {t('editorSeries3Title')}
          </span>
          <label htmlFor="series-3-label" className="flex flex-col gap-2">
            <span className="font-medium text-[#4d4d4d] text-xs">
              {t('editorLegendLabel')}
            </span>
            <Input
              id="series-3-label"
              type="text"
              value={settings.seriesLabel3}
              onChange={(e) => updateSetting('seriesLabel3', e.target.value)}
              placeholder={t('editorSeries3Placeholder')}
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
                  color={settings.color3}
                  onChange={(color) => updateSetting('color3', color.hex)}
                />
              </div>
            ) : (
              <div className="h-[90px]" />
            )}
          </div>
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
              <span className="text-[#4d4d4d] text-sm">
                {t('editorShowLegend')}
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
          </div>
        </div>
      </div>
    </div>
  );
}
