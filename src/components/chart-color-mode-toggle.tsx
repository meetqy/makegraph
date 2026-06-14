import { Palette } from 'lucide-react';
import { Button } from '~/components/ui/button';

type ChartColorModeToggleProps = {
  label: string;
  colorful: boolean;
  onChange: (colorful: boolean) => void;
  singleLabel: string;
  colorfulLabel: string;
  singleDescription: string;
  colorfulDescription: string;
};

export function ChartColorModeToggle({
  label,
  colorful,
  onChange,
  singleLabel,
  colorfulLabel,
  singleDescription,
  colorfulDescription,
}: ChartColorModeToggleProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-medium text-[#4d4d4d] text-xs">{label}</span>
      <div className="grid grid-cols-2 gap-2 rounded-lg border border-[#ebebeb] bg-[#fafafa] p-1">
        <Button
          type="button"
          variant={colorful ? 'ghost' : 'default'}
          onClick={() => onChange(false)}
          className={
            colorful
              ? 'h-10 border border-transparent bg-transparent text-[#4d4d4d] hover:bg-white hover:text-[#171717]'
              : 'h-10 bg-[#171717] text-white hover:bg-[#171717]/90'
          }
        >
          {singleLabel}
        </Button>
        <Button
          type="button"
          variant={colorful ? 'default' : 'ghost'}
          onClick={() => onChange(true)}
          className={
            colorful
              ? 'h-10 bg-[#171717] text-white hover:bg-[#171717]/90'
              : 'h-10 border border-transparent bg-transparent text-[#4d4d4d] hover:bg-white hover:text-[#171717]'
          }
        >
          <Palette className="mr-2 h-4 w-4" />
          {colorfulLabel}
        </Button>
      </div>
      <p className="text-xs leading-5 text-[#888888]">
        {colorful ? colorfulDescription : singleDescription}
      </p>
    </div>
  );
}
