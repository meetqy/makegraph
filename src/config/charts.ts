import { BarChart3, type LucideIcon } from 'lucide-react';

export type ChartTypeItem = {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  image?: string;
};

export const chartTypeItems: ChartTypeItem[] = [
  {
    name: 'Line Chart',
    description:
      'Free online line chart maker. Plot trends over time, customize labels and colors, and preview results instantly for reports and presentations.',
    href: '/charts/line-chart',
    icon: BarChart3,
    image: '/charts/line-chart-og-image.png',
  },
  {
    name: 'Scatter Chart',
    description:
      'Free online scatter chart maker. Plot relationships between two numeric variables, edit x and y values in a table, and preview the result instantly.',
    href: '/charts/scatter-chart',
    icon: BarChart3,
    image: '/charts/scatter-chart-og-image.png',
  },
  {
    name: 'Radar Chart',
    description:
      'Free online radar chart maker. Compare strengths across multiple dimensions, customize labels and colors, and preview results instantly for reports and presentations.',
    href: '/charts/radar-chart',
    icon: BarChart3,
    image: '/charts/radar-chart-og-image.png',
  },
  {
    name: 'Tree Map Chart',
    description:
      'Free online tree map chart maker. Compare part-to-whole values with nested rectangles, customize labels and color, and preview the layout instantly.',
    href: '/charts/tree-map-chart',
    icon: BarChart3,
    image: '/charts/tree-map-chart-og-image.png',
  },
  {
    name: 'Bar Chart',
    description:
      'Free online bar chart maker. Easily compare category data, customize labels and colors, and preview results instantly for reports and presentations.',
    href: '/charts/bar-chart',
    icon: BarChart3,
    image: '/charts/bar-graph-og-image.png',
  },
  {
    name: 'Bar Chart Race',
    description:
      'Free online bar chart race maker. Animate rankings over time, edit data in a table, and preview a smooth racing chart instantly.',
    href: '/charts/bar-chart-race',
    icon: BarChart3,
    image: '/charts/bar-chart-race-og-image.png',
  },
  {
    name: 'Double Bar Chart',
    description:
      'Free online double bar chart maker. Compare two data sets side by side, customize colors, and preview instantly for dashboards and presentations.',
    href: '/charts/double-bar-chart',
    icon: BarChart3,
    image: '/charts/double-bar-chart-og-image.png',
  },
  {
    name: 'Stacked Bar Chart',
    description:
      'Free online stacked bar chart maker. Compare totals and composition at a glance, switch to 100% stacked, customize colors, and preview instantly for reports.',
    href: '/charts/stacked-bar-chart',
    icon: BarChart3,
    image: '/charts/stacked-bar-chart-og-image.png',
  },
  {
    name: 'Waterfall Bar Chart',
    description:
      'Free online waterfall bar chart maker. Show how positive and negative changes build to a final total, customize colors, and preview the bridge instantly.',
    href: '/charts/waterfall-bar-chart',
    icon: BarChart3,
    image: '/charts/waterfall-bar-chart-og-image.png',
  },
];

export function getChartItemsByPaths(paths: string[]) {
  return paths
    .map((path) => chartTypeItems.find((item) => item.href === path))
    .filter((item): item is ChartTypeItem => Boolean(item));
}
