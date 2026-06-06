import {
  BarChart3,
  CircleDot,
  LineChart,
  type LucideIcon,
  PieChart,
} from 'lucide-react';

export type ChartTypeItem = {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export const chartTypeItems: ChartTypeItem[] = [
  {
    name: 'Bar Chart',
    description:
      'Compare values across categories with a clear vertical layout.',
    href: '/charts/bar-chart',
    icon: BarChart3,
  },
  {
    name: 'Bar Graph',
    description:
      'Present grouped comparisons for reports, dashboards, and summaries.',
    href: '/charts/bar-graph',
    icon: BarChart3,
  },
  {
    name: 'Line Chart',
    description: 'Show changes over time with a clean trend-focused view.',
    href: '/charts/line-chart',
    icon: LineChart,
  },
  {
    name: 'Line Graph',
    description: 'Track sequences, growth, and decline across time-based data.',
    href: '/charts/line-graph',
    icon: LineChart,
  },
  {
    name: 'Area Chart',
    description:
      'Highlight volume and trend together with a filled time series.',
    href: '/charts/area-chart',
    icon: LineChart,
  },
  {
    name: 'Pie Chart',
    description: 'Visualize part-to-whole relationships for proportional data.',
    href: '/charts/pie-chart',
    icon: PieChart,
  },
  {
    name: 'Donut Chart',
    description:
      'Use a ring layout to show composition with a lighter visual weight.',
    href: '/charts/donut-chart',
    icon: PieChart,
  },
  {
    name: 'Scatter Plot',
    description: 'Reveal correlation, clusters, and outliers in paired values.',
    href: '/charts/scatter-plot',
    icon: CircleDot,
  },
  {
    name: 'Histogram',
    description:
      'Understand frequency distribution by grouping values into bins.',
    href: '/charts/histogram',
    icon: BarChart3,
  },
  {
    name: 'Combo Chart',
    description: 'Combine multiple series types when one chart is not enough.',
    href: '/charts/combo-chart',
    icon: BarChart3,
  },
];
