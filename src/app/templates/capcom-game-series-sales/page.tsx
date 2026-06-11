import type { Metadata } from 'next';
import {
  BarChartMaker,
  type ChartDataRow,
  type ChartSettings,
} from '~/app/charts/bar-chart/_components/bar-chart-maker';
import { ChartHero } from '~/components/chart-hero';
import { ChartList } from '~/components/chart-list';
import { generateChartTitle } from '~/lib/utils';
import { boxContainerClassName } from '~/lib/layout';
import { getChartItemsByPaths } from '~/config/charts';

const heroEyebrow = 'Capcom Franchise Sales Template';
const heroTitle = 'Capcom Game Series Sales Units Bar Chart Maker';
const heroDescription =
  'A ready-to-use bar chart race template with fixed Capcom franchises. Fill in the sales units over time to animate the history of Resident Evil, Monster Hunter, Street Fighter, and more.';

export const metadata: Metadata = {
  title: generateChartTitle('Capcom Game Series Sales Race'),
  description: heroDescription,
};

const initialData: ChartDataRow[] = [
  { name: 'Resident Evil', value: 183 },
  { name: 'Monster Hunter', value: 125 },
  { name: 'Street Fighter', value: 58 },
  { name: 'Mega Man', value: 44 },
  { name: 'Devil May Cry', value: 38 },
  { name: 'Dead Rising', value: 19 },
  { name: 'Ace Attorney', value: 14 },
  { name: "Dragon's Dogma", value: 13 },
  { name: 'Marvel vs. Capcom', value: 13 },
  { name: 'Onimusha', value: 9 },
  { name: 'Lost Planet', value: 6.9 },
  { name: 'Okami', value: 4.8 },
  { name: 'Dino Crisis', value: 4.6 },
  { name: "Ghosts 'n Goblins", value: 4.6 },
  { name: 'Sengoku BASARA', value: 4.1 },
  { name: 'Breath of Fire', value: 3.3 },
  { name: 'Final Fight', value: 3.2 },
  { name: '1942', value: 1.4 },
  { name: 'Commando', value: 1.2 },
];

const initialSettings: ChartSettings = {
  title: 'Capcom Game Series Sales Units',
  yAxisLabel: 'Sales (Millions)',
  color: '#171717',
  showLegend: false,
  showGrid: true,
  showValues: true,
};

export default function CapcomSalesTemplatePage() {
  return (
    <div className="flex flex-col bg-transparent">
      <ChartHero
        eyebrow={heroEyebrow}
        title={heroTitle}
        description={heroDescription}
      />

      <div className="relative w-full bg-white p-4">
        <div className="h-[calc(100svh-12rem)] w-full overflow-hidden rounded-md border border-[#ebebeb] bg-white">
          <BarChartMaker
            initialData={initialData}
            initialSettings={initialSettings}
          />
        </div>
      </div>

      <div className="relative border-t border-[#ebebeb] bg-white">
        <section className={`${boxContainerClassName} py-16 sm:py-20`}>
          <ChartList
            items={getChartItemsByPaths([
              '/charts/bar-chart',
              '/charts/bar-chart-race',
            ]).map((chart) => ({
              title: chart.name,
              description: chart.description,
              href: chart.href,
              image: chart.image,
              icon: chart.icon,
            }))}
            eyebrow="Other charts you might like"
            title="Explore more chart makers for your data."
            description="Try different chart types to find the best way to visualize and communicate your data story."
          />
        </section>
      </div>
    </div>
  );
}
