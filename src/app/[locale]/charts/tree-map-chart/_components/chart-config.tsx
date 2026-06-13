import { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CompactPicker } from 'react-color';
import { Button } from '~/components/ui/button';
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

        <div className="flex flex-col gap-3">
          <span className="font-medium text-[#4d4d4d] text-xs">
            {t('editorColorModeLabel')}
          </span>
          <div className="grid grid-cols-2 gap-2 rounded-lg border border-[#ebebeb] bg-[#fafafa] p-1">
            <Button
              type="button"
              variant={settings.colorful ? 'ghost' : 'default'}
              onClick={() => updateSetting('colorful', false)}
              className={
                settings.colorful
                  ? 'h-10 border border-transparent bg-transparent text-[#4d4d4d] hover:bg-white hover:text-[#171717]'
                  : 'h-10 bg-[#171717] text-white hover:bg-[#171717]/90'
              }
            >
              {t('editorSingleColor')}
            </Button>
            <Button
              type="button"
              variant={settings.colorful ? 'default' : 'ghost'}
              onClick={() => updateSetting('colorful', true)}
              className={
                settings.colorful
                  ? 'h-10 bg-[#171717] text-white hover:bg-[#171717]/90'
                  : 'h-10 border border-transparent bg-transparent text-[#4d4d4d] hover:bg-white hover:text-[#171717]'
              }
            >
              <Palette className="mr-2 h-4 w-4" />
              {t('editorColorful')}
            </Button>
          </div>
          <p className="text-xs leading-5 text-[#888888]">
            {settings.colorful
              ? t('editorColorfulDescription')
              : t('editorSingleColorDescription')}
          </p>
        </div>

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
