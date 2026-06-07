import { BarChartMaker } from './_components/bar-chart-maker';

export default function BarChartPage() {
  return (
    <div className="flex flex-col bg-[#fafafa] h-svh">
      <div className="shrink-0 border-b border-[#ebebeb] bg-white px-6 py-4 lg:px-8">
        <h1 className="font-semibold text-2xl tracking-tight">
          Bar Chart Maker
        </h1>
        <p className="mt-1 text-[#888888] text-sm">
          Edit data, customize appearance, and preview your bar chart.
        </p>
      </div>
      <div className="flex-1 overflow-hidden bg-white">
        <BarChartMaker />
      </div>
    </div>
  );
}
