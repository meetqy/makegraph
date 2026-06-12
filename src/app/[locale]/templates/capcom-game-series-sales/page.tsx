import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import {
  BarChartMaker,
  type ChartDataRow,
  type ChartSettings,
} from '~/app/[locale]/charts/bar-chart/_components/bar-chart-maker';
import { ChartHero } from '~/components/chart-hero';
import { ChartList } from '~/components/chart-list';
import { generateChartTitle, getMetadataAlternates } from '~/lib/utils';
import { getChartItemsByPaths } from '~/config/charts';

const heroDescription =
  'A ready-to-use bar chart template with fixed Capcom franchises. Fill in the sales units over time to animate the history of Resident Evil, Monster Hunter, Street Fighter, and more.';

export const metadata: Metadata = {
  title: generateChartTitle('Capcom Game Series Sales'),
  description: heroDescription,
  alternates: getMetadataAlternates('/templates/capcom-game-series-sales'),
  openGraph: {
    images: ['/templates/capcom-game-series-sales-og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/templates/capcom-game-series-sales-og-image.png'],
  },
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
  const t = useTranslations('TemplateCapcom');
  const tBarChartRace = useTranslations('BarChartRace');
  const tBarChart = useTranslations('BarChart');

  const getTranslation = (href: string) => {
    switch (href) {
      case '/charts/bar-chart':
        return tBarChart;
      case '/charts/bar-chart-race':
        return tBarChartRace;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col bg-transparent">
      <ChartHero
        eyebrow={t('heroEyebrow')}
        title={t('heroTitle')}
        description={t('heroDescription')}
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
        <section className={`container-box py-16 sm:py-20`}>
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
              {t('aboutEyebrow')}
            </p>
            <h2 className="mt-4 text-balance font-semibold text-3xl tracking-[-0.96px] text-[#171717] sm:text-4xl sm:tracking-[-1.28px]">
              {t('aboutTitle')}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-[#4d4d4d] sm:text-[18px] sm:leading-[28px]">
              <p>
                {t('aboutP1')}
                <a
                  href="https://www.reddit.com/r/breathoffire/comments/1t3in7o/in_case_youve_ever_wondered_how_breath_of_fire/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-[#171717] underline underline-offset-4 hover:text-blue-600 transition-colors ml-1"
                >
                  {t('aboutLink1')}
                </a>
              </p>
              <p>
                {t('aboutP2')}
                <a
                  href="https://www.capcom.co.jp/ir/english/business/salesdata.html"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-[#171717] underline underline-offset-4 hover:text-blue-600 transition-colors ml-1"
                >
                  {t('aboutLink2')}
                </a>
              </p>
              <p dangerouslySetInnerHTML={{ __html: t.raw('aboutP3') }} />
            </div>
          </div>
        </section>
      </div>

      <div className="relative border-t border-[#ebebeb] bg-white">
        <section className={`container-box py-16 sm:py-20`}>
          <ChartList
            items={getChartItemsByPaths([
              '/charts/bar-chart',
              '/charts/bar-chart-race',
            ]).map((chart) => {
              const ct = getTranslation(chart.href);
              return {
                title: ct ? ct('heroTitle') : chart.name,
                description: ct ? ct('heroDescription') : chart.description,
                href: chart.href,
                image: chart.image,
                icon: chart.icon,
              };
            })}
            eyebrow={t('otherChartsEyebrow')}
            title={t('otherChartsTitle')}
            description={t('otherChartsDescription')}
          />
        </section>
      </div>
    </div>
  );
}
