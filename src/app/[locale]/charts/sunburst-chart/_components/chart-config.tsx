import { useEffect, useState, useId } from 'react';
import { useTranslations } from 'next-intl';
import { CompactPicker } from 'react-color';
import { ChartColorModeToggle } from '~/components/chart-color-mode-toggle';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import type { ChartSettings } from './sunburst-chart-maker';

type ChartConfigPanelProps = {
  settings: ChartSettings;
  onChange: (settings: ChartSettings) => void;
};

export function ChartConfigPanel({
  settings,
  onChange,
}: ChartConfigPanelProps) {
  const t = useTranslations('SunburstChart');
  const showLegendId = useId();
  const showLabelsId = useId();
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

        <label htmlFor="metric-label" className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            {t('editorMetricLabelLabel')}
          </span>
          <Input
            id="metric-label"
            type="text"
            value={settings.metricLabel}
            onChange={(e) => updateSetting('metricLabel', e.target.value)}
            placeholder={t('editorMetricLabelPlaceholder')}
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
          <label
            htmlFor={showLabelsId}
            className="flex cursor-pointer items-center gap-3"
          >
            <Checkbox
              id={showLabelsId}
              checked={settings.showLabels}
              onCheckedChange={(checked) =>
                updateSetting('showLabels', Boolean(checked))
              }
            />
            <span className="text-[#4d4d4d] text-sm">
              {t('editorShowLabelsLabel')}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
