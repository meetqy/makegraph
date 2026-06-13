import { useTranslations } from 'next-intl';
import { ChartList } from '~/components/chart-list';
import { chartTypeItems } from '~/config/charts';

type HomeChartListProps = {
  className: string;
};

export function HomeChartList({ className }: HomeChartListProps) {
  const tLine = useTranslations('LineChart');
  const tScatter = useTranslations('ScatterChart');
  const tRadar = useTranslations('RadarChart');
  const tTreeMap = useTranslations('TreeMapChart');
  const tBar = useTranslations('BarChart');
  const tBarRace = useTranslations('BarChartRace');
  const tDoubleBar = useTranslations('DoubleBarChart');
  const tStackedBar = useTranslations('StackedBarChart');
  const tWaterfallBar = useTranslations('WaterfallBarChart');

  const getTranslation = (href: string) => {
    switch (href) {
      case '/charts/line-chart':
        return tLine;
      case '/charts/scatter-chart':
        return tScatter;
      case '/charts/radar-chart':
        return tRadar;
      case '/charts/tree-map-chart':
        return tTreeMap;
      case '/charts/bar-chart':
        return tBar;
      case '/charts/bar-chart-race':
        return tBarRace;
      case '/charts/double-bar-chart':
        return tDoubleBar;
      case '/charts/stacked-bar-chart':
        return tStackedBar;
      case '/charts/waterfall-bar-chart':
        return tWaterfallBar;
      default:
        return null;
    }
  };

  return (
    <ChartList
      id="charts"
      className={`${className} pb-24 lg:pb-28`}
      items={chartTypeItems.map((item) => {
        const t = getTranslation(item.href);
        return {
          title: t ? t('chartName') : item.name,
          description: t ? t('heroDescription') : item.description,
          href: item.href,
          image: item.image,
          icon: item.icon,
        };
      })}
    />
  );
}
