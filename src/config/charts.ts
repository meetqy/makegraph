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
    name: 'Bar Chart',
    description:
      'Free online bar chart maker. Easily compare category data, customize labels and colors, and preview results instantly for reports and presentations.',
    href: '/charts/bar-chart',
    icon: BarChart3,
    image: '/charts/bar-graph-og-image.png',
  },
  {
    name: 'Double Bar Chart',
    description:
      'Free online double bar chart maker. Compare two data sets side by side, customize colors, and preview instantly for dashboards and presentations.',
    href: '/charts/double-bar-chart',
    icon: BarChart3,
    image: '/charts/double-bar-chart-og-image.png',
  },
];
