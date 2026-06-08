import { Download } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Button } from '~/components/ui/button';
import type { ChartDataRow, ChartSettings } from './double-bar-chart-maker';

type ChartPreviewProps = {
  data: ChartDataRow[];
  settings: ChartSettings;
};

export function ChartPreview({ data, settings }: ChartPreviewProps) {
  // In a real application, export functionality would snapshot the DOM or SVG.
  // For MVP, just a placeholder action.
  const handleExport = () => {
    alert(
      'Export functionality will be implemented here (e.g. html-to-image).'
    );
  };

  return (
    <div className="flex flex-1 flex-col bg-white overflow-hidden">
      <div className="flex items-center justify-between border-[#ebebeb] border-b px-6 h-14 shrink-0">
        <h2 className="font-medium text-[#171717] text-sm uppercase tracking-wide">
          Graph
        </h2>
        <Button
          size="sm"
          variant="outline"
          onClick={handleExport}
          className="h-8 shadow-none border-[#ebebeb]"
        >
          <Download className="mr-2 size-3.5" /> Export
        </Button>
      </div>

      <div className="flex w-full flex-1 overflow-x-auto">
        <div className="flex flex-col items-center justify-center min-w-[700px] w-full h-full p-4 sm:p-6 mx-auto">
          {settings.title && (
            <h3 className="mb-6 font-medium text-[#171717] text-xl shrink-0">
              {settings.title}
            </h3>
          )}

          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
              >
                {settings.showGrid && (
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="#ebebeb"
                  />
                )}
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#888888', fontSize: 13 }}
                  dy={10}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#888888', fontSize: 13 }}
                  dx={-10}
                />
                <Tooltip
                  cursor={{ fill: '#fafafa' }}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #ebebeb',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                    fontSize: '13px',
                  }}
                  itemStyle={{ color: '#171717', fontWeight: 500 }}
                />
                {settings.showLegend && (
                  <Legend
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: '13px',
                      color: '#4d4d4d',
                      paddingTop: '20px',
                    }}
                  />
                )}
                <Bar
                  dataKey="value1"
                  name={settings.yAxisLabel1 || 'Series 1'}
                  fill={settings.color1}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="value2"
                  name={settings.yAxisLabel2 || 'Series 2'}
                  fill={settings.color2}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
