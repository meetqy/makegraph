import { BookOpen, type LucideIcon } from 'lucide-react';

export type BlogItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  date: string;
  image: string;
  mentionedChartPaths: string[];
};

export const blogItems: BlogItem[] = [
  {
    title: 'Budget vs. Actual Spending Across Departments',
    description:
      'Learn how to compare department budgets with actual spending, spot over-budget teams, and pick the right chart for clear reporting.',
    href: '/blogs/budget-vs-actual-spending-across-departments',
    icon: BookOpen,
    date: 'June 10, 2026',
    image: '/blogs/budget-vs-actual-spending-across-departments.png',
    mentionedChartPaths: ['/charts/double-bar-chart'],
  },
];

export function getBlogItemsByChartPath(chartPath: string) {
  return blogItems.filter((item) =>
    item.mentionedChartPaths.includes(chartPath)
  );
}
