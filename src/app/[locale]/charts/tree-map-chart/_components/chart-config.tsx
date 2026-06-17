import { useEffect, useState, useId } from 'react';
import { useTranslations } from 'next-intl';
import { CompactPicker } from 'react-color';
import { ChartColorModeToggle } from '~/components/chart-color-mode-toggle';
import { Input } from '~/components/ui/input';
import type { ChartSettings } from './tree-map-chart-maker';

type ChartConfigPanelProps = {
  settings: ChartSettings;
  onChange: (settings: ChartSettings) => void;
};

export function ChartConfigPanel({
  settings,
  onChange,
}: ChartConfigPanelProps) {
  const t = useTranslations('TreeMapChart');
  const showLegendId = useId();
  const showValuesId = useId();
  const chartTitleId = useId();
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
        <label htmlFor={chartTitleId} className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            {t('editorChartTitleLabel')}
          </span>
          <Input
            id={chartTitleId}
            type="text"
            value={settings.title}
            onChange={(e) => updateSetting('title', e.target.value)}
            placeholder={t('editorChartTitlePlaceholder')}
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
          />
        </label>

        <ChartColorModeToggle
          label={t('editorColorModeLabel')}
          colorful={settings.colorful}
          onChange={(value) => updateSetting('colorful', value)}
          singleLabel={t('editorSingleColor')}
          colorfulLabel={t('editorColorful')}
          singleDescription={t('editorSingleColorDescription')}
          colorfulDescription={t('editorColorfulDescription')}
        />

        <div className="flex flex-col gap-3">
          <span className="font-medium text-[#4d4d4d] text-xs">
            {t('editorThemeColorLabel')}
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
      </div>
    </div>
  );
}
