'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChartList } from '~/components/chart-list';
import { Button } from '~/components/ui/button';
import { chartTypeItems } from '~/config/charts';
import { usePathname, useRouter } from '~/i18n/routing';

const FILTER_QUERY_PARAM = 'tag';
const FILTER_OPTIONS: Array<{ tag: string; labelKey: string }> = [
  { tag: 'bar-chart', labelKey: 'chartFilterBar' },
  { tag: 'line-chart', labelKey: 'chartFilterLine' },
  { tag: 'scatter-chart', labelKey: 'chartFilterScatter' },
  { tag: 'radar-chart', labelKey: 'chartFilterRadar' },
  { tag: 'tree-map-chart', labelKey: 'chartFilterTreeMap' },
  { tag: 'sunburst-chart', labelKey: 'chartFilterSunburst' },
  { tag: 'band-seating-chart', labelKey: 'chartFilterBandSeating' },
] as const;
const FILTER_TAGS = new Set(FILTER_OPTIONS.map((option) => option.tag));

type HomeChartListProps = {
  className: string;
  showFilter?: boolean;
};

export function HomeChartList({
  className,
  showFilter = false,
}: HomeChartListProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tHome = useTranslations('Home');
  const tLine = useTranslations('LineChart');
  const tConfidenceIntervalArea = useTranslations(
    'ConfidenceIntervalAreaChart'
  );
  const tScatter = useTranslations('ScatterChart');
  const tCorrelation = useTranslations('CorrelationChart');
  const tMarimekko = useTranslations('MarimekkoChart');
  const tRadar = useTranslations('RadarChart');
  const tTreeMap = useTranslations('TreeMapChart');
  const tSunburst = useTranslations('SunburstChart');
  const tBar = useTranslations('BarChart');
  const tBandSeating = useTranslations('BandSeatingChart');
  const tBarRace = useTranslations('BarChartRace');
  const tDoubleBar = useTranslations('DoubleBarChart');
  const tStackedBar = useTranslations('StackedBarChart');
  const tWaterfallBar = useTranslations('WaterfallBarChart');
  const tNegativeBar = useTranslations('NegativeBarChart');
  const tPopulationPyramid = useTranslations('PopulationPyramid');

  const getTranslation = (href: string) => {
    switch (href) {
      case '/charts/line-chart':
        return tLine;
      case '/charts/confidence-interval-area-chart':
        return tConfidenceIntervalArea;
      case '/charts/scatter-chart':
        return tScatter;
      case '/charts/correlation-matrix-chart':
        return tCorrelation;
      case '/charts/marimekko-chart':
        return tMarimekko;
      case '/charts/radar-chart':
        return tRadar;
      case '/charts/tree-map-chart':
        return tTreeMap;
      case '/charts/sunburst-chart':
        return tSunburst;
      case '/charts/band-seating-chart':
        return tBandSeating;
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
      case '/charts/negative-bar-chart':
        return tNegativeBar;
      case '/charts/population-pyramid':
        return tPopulationPyramid;
      default:
        return null;
    }
  };

  const currentTag = searchParams.get(FILTER_QUERY_PARAM);
  const activeTag =
    currentTag && FILTER_TAGS.has(currentTag) ? currentTag : null;

  const items = useMemo(() => {
    return chartTypeItems
      .filter((item) => {
        if (!activeTag) {
          return true;
        }

        return item.tags?.includes(activeTag) ?? false;
      })
      .map((item) => {
        const t = getTranslation(item.href);
        return {
          title: t ? t('chartName') : item.name,
          description: t ? t('heroDescription') : item.description,
          href: item.href,
          image: item.image,
          icon: item.icon,
        };
      });
  }, [
    activeTag,
    tBar,
    tBandSeating,
    tConfidenceIntervalArea,
    tCorrelation,
    tBarRace,
    tDoubleBar,
    tLine,
    tMarimekko,
    tNegativeBar,
    tPopulationPyramid,
    tRadar,
    tScatter,
    tStackedBar,
    tSunburst,
    tTreeMap,
    tWaterfallBar,
  ]);

  const updateFilter = (nextTag: string | null) => {
    const nextSearchParams = new URLSearchParams(searchParams.toString());

    if (nextTag) {
      nextSearchParams.set(FILTER_QUERY_PARAM, nextTag);
    } else {
      nextSearchParams.delete(FILTER_QUERY_PARAM);
    }

    const queryString = nextSearchParams.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  return (
    <section id="charts" className={`${className} pb-24 lg:pb-28`}>
      {showFilter && (
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant={activeTag === null ? 'default' : 'outline'}
            aria-pressed={activeTag === null}
            onClick={() => updateFilter(null)}
          >
            {tHome('chartFilterAll')}
          </Button>
          {FILTER_OPTIONS.map((option) => (
            <Button
              key={option.tag}
              type="button"
              size="sm"
              variant={activeTag === option.tag ? 'default' : 'outline'}
              aria-pressed={activeTag === option.tag}
              onClick={() =>
                updateFilter(activeTag === option.tag ? null : option.tag)
              }
            >
              {tHome(option.labelKey)}
            </Button>
          ))}
        </div>
      )}

      <ChartList items={items} />
    </section>
  );
}
