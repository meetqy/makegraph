import { ChartList } from '~/components/chart-list';
import { chartTypeItems } from '~/config/charts';

type HomeChartListProps = {
  className: string;
};

export function HomeChartList({ className }: HomeChartListProps) {
  return (
    <ChartList
      id="charts"
      className={`${className} pb-24 lg:pb-28`}
      items={chartTypeItems.map((item) => ({
        title: item.name,
        description: item.description,
        href: item.href,
        image: item.image,
        icon: item.icon,
      }))}
    />
  );
}
