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
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
              About this template
            </p>
            <h2 className="mt-4 text-balance font-semibold text-3xl tracking-[-0.96px] text-[#171717] sm:text-4xl sm:tracking-[-1.28px]">
              Data Source & Community Discussion
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-[#4d4d4d] sm:text-[18px] sm:leading-[28px]">
              <p>
                This template is inspired by a popular post in the
                r/breathoffire Reddit community:
                <a
                  href="https://www.reddit.com/r/breathoffire/comments/1t3in7o/in_case_youve_ever_wondered_how_breath_of_fire/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-[#171717] underline underline-offset-4 hover:text-blue-600 transition-colors ml-1"
                >
                  "In case you've ever wondered how Breath of Fire series' sales
                  historically stack up to other Capcom franchises, here's a bar
                  chart!"
                </a>
              </p>
              <p>
                The original official sales data is sourced from the Capcom
                Investor Relations page:
                <a
                  href="https://www.capcom.co.jp/ir/english/business/salesdata.html"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-[#171717] underline underline-offset-4 hover:text-blue-600 transition-colors ml-1"
                >
                  Capcom Sales Data
                </a>
              </p>
              <p>
                In the community discussions, many players expressed surprise at
                the relative position of the <em>Breath of Fire</em> series
                within Capcom's historical sales. Despite its loyal fanbase, the
                total sales volume remained lower than many expected. At the
                same time, fans passionately discussed the fate of other classic
                franchises like <em>Dino Crisis</em>, <em>Okami</em>, and{' '}
                <em>Final Fight</em>. This bar chart provides a clear visual
                comparison of the sales gaps between these classic IPs.
              </p>
            </div>
          </div>
        </section>
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
