import { useEffect, useState, useId } from 'react';
import { useTranslations } from 'next-intl';
import { CompactPicker } from 'react-color';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import type { ChartSettings } from './marimekko-chart-maker';

type ChartConfigPanelProps = {
  settings: ChartSettings;
  onChange: (settings: ChartSettings) => void;
  columns?: any[];
};

export function ChartConfigPanel({
  settings,
  onChange,
  columns,
}: ChartConfigPanelProps) {
  const t = useTranslations('MarimekkoChart');
  const [mounted, setMounted] = useState(false);
  const showValuesId = useId();
  const chartTitleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateSetting = <K extends keyof ChartSettings>(
    key: K,
    value: ChartSettings[K]
  ) => {
    onChange({ ...settings, [key]: value });
  };

  const dataColumns = columns
    ? columns.filter((col) => col.key !== 'name')
    : [];

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

        {dataColumns.map((col, index) => {
          const defaultColors = [
            '#171717',
            '#525252',
            '#a3a3a3',
            '#d4d4d4',
            '#e5e5e5',
          ];
          const colorValue =
            settings.colors?.[index] ??
            defaultColors[index % defaultColors.length] ??
            '#171717';

          return (
            <div
              key={col.key}
              className="flex flex-col gap-4 border-t border-[#ebebeb] pt-5"
            >
              <div className="flex flex-col gap-3">
                <span className="font-medium text-[#4d4d4d] text-xs">
                  {t('editorThemeColor')} ({col.title || `Series ${index + 1}`})
                </span>
                {mounted ? (
                  <div className="compact-picker-container rounded-md border border-[#ebebeb] bg-white p-2">
                    <CompactPicker
                      color={colorValue}
                      onChange={(color) => {
                        const newColors = [...(settings.colors || [])];
                        newColors[index] = color.hex;
                        updateSetting('colors', newColors);
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-[90px]" />
                )}
              </div>
            </div>
          );
        })}

        <div className="border-t border-[#ebebeb] pt-5">
          <div className="flex flex-col gap-4">
            <label
              htmlFor={showValuesId}
              className="flex cursor-pointer items-center gap-3"
            >
              <Checkbox
                id={showValuesId}
                checked={settings.showValues}
                onCheckedChange={(checked) =>
                  updateSetting('showValues', !!checked)
                }
              />
              <span className="text-[#4d4d4d] text-sm">
                {t('editorShowValues')}
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
