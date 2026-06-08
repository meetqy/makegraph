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
      'Create a bar chart online, compare category data, customize labels and colors, and preview results instantly for reports, dashboards, presentations, and marketing visuals.',
    href: '/charts/bar-chart',
    icon: BarChart3,
    image: '/charts/bar-graph-og-image.png',
  },
  {
    name: 'Double Bar Chart',
    description:
      'Create a double bar chart online, compare two data sets side by side, customize labels and colors, and preview results instantly for reports, dashboards, and presentations.',
    href: '/charts/double-bar-chart',
    icon: BarChart3,
    image: '/charts/double-bar-chart-og-image.png',
  },
];
