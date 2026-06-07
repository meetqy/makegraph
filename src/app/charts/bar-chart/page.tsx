import { BarChartMaker } from './_components/bar-chart-maker';
import { ChartHero } from '~/components/chart-hero';

export default function BarChartPage() {
  return (
    <div className="flex flex-col bg-transparent">
      <ChartHero
        eyebrow="Chart Maker"
        title="Bar Chart Maker."
        description="Edit data, customize appearance, and preview your bar chart."
      />
      <div className="w-full p-4">
        <div className="h-[calc(100svh-12rem)] rounded-md w-full overflow-hidden border border-[#ebebeb] bg-white">
          <BarChartMaker />
        </div>
      </div>
    </div>
  );
}
