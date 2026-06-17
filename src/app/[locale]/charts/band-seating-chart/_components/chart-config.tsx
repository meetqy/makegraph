import { useId } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import type { ChartSettings } from './band-seating-chart-maker';
import { getStageShortcutRotation, normalizeRotation } from './layout-utils';

type ChartConfigPanelProps = {
  settings: ChartSettings;
  onChange: (settings: ChartSettings) => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ChartConfigPanel({
  settings,
  onChange,
}: ChartConfigPanelProps) {
  const t = useTranslations('BandSeatingChart');
  const showLegendId = useId();
  const showValuesId = useId();
  const chartTitleId = useId();
  const normalizedRotation = normalizeRotation(settings.rotation);

  const updateSetting = <K extends keyof ChartSettings>(
    key: K,
    value: ChartSettings[K]
  ) => {
    onChange({ ...settings, [key]: value });
  };

  const shortcutOptions = [
    {
      key: 'top',
      label: t('editorShortcutTop'),
      value: getStageShortcutRotation('top'),
    },
    {
      key: 'bottom',
      label: t('editorShortcutBottom'),
      value: getStageShortcutRotation('bottom'),
    },
  ] as const;

  const selectedShortcut =
    shortcutOptions.find((option) => option.value === normalizedRotation)
      ?.key ?? 'bottom';

  return (
    <div className="flex flex-col overflow-hidden bg-white pb-8">
      <div className="flex h-14 shrink-0 items-center border-b border-[#ebebeb] px-5">
        <h2 className="font-medium text-[#171717] text-sm uppercase tracking-wide">
          {t('editorCustomizeTitle')}
        </h2>
      </div>

      <div className="flex flex-col gap-6 overflow-y-auto p-5">
        <div className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            {t('editorDirectionShortcutsLabel')}
          </span>
          <Select
            value={selectedShortcut}
            onValueChange={(value) => {
              const selectedOption = shortcutOptions.find(
                (option) => option.key === value
              );
              if (selectedOption) {
                updateSetting('rotation', selectedOption.value);
              }
            }}
          >
            <SelectTrigger className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 text-sm shadow-none focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {shortcutOptions.map((option) => (
                <SelectItem key={option.key} value={option.key}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <label htmlFor="row-gap" className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            {t('editorRowGapLabel')}
          </span>
          <Input
            id="row-gap"
            type="number"
            min={24}
            max={96}
            step={1}
            value={settings.rowGap}
            onChange={(event) =>
              updateSetting(
                'rowGap',
                clamp(Number(event.target.value) || 24, 24, 96)
              )
            }
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
          />
        </label>

        <label htmlFor="seat-size" className="flex flex-col gap-2">
          <span className="font-medium text-[#4d4d4d] text-xs">
            {t('editorSeatSizeLabel')}
          </span>
          <Input
            id="seat-size"
            type="number"
            min={8}
            max={28}
            step={1}
            value={settings.seatSize}
            onChange={(event) =>
              updateSetting(
                'seatSize',
                clamp(Number(event.target.value) || 8, 8, 28)
              )
            }
            className="h-9 w-full rounded-md border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-[#171717] focus-visible:bg-white focus-visible:ring-0"
          />
        </label>
      </div>
    </div>
  );
}
