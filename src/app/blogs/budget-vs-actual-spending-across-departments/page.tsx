import type { Metadata } from 'next';
import Link from 'next/link';

import { ChartList } from '~/components/chart-list';
import { Button } from '~/components/ui/button';
import { blogItems } from '~/config/blogs';
import { getChartItemsByPaths } from '~/config/charts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { boxContainerClassName } from '~/lib/layout';
import { siteUrl } from '~/lib/site';

// 页面元信息：围绕用户真实任务来写，保持自然，不堆砌关键词
const heroEyebrow = 'Blog';
const heroTitle = 'Budget vs. Actual Spending Across Departments.';
const heroDescription =
  'Learn how to compare department budgets with actual spending, spot over-budget teams, and pick the right chart for clear reporting.';
const currentBlogHref = '/blogs/budget-vs-actual-spending-across-departments';
const currentBlog = blogItems.find((item) => item.href === currentBlogHref);
const currentBlogImage = currentBlog?.image ?? '/og.png';

export const metadata: Metadata = {
  title: 'Budget vs. Actual Spending Across Departments | MakeGraph',
  description: heroDescription,
  alternates: {
    canonical: `${siteUrl}/blogs/budget-vs-actual-spending-across-departments`,
  },
  openGraph: {
    title: 'Budget vs. Actual Spending Across Departments | MakeGraph',
    description: heroDescription,
    url: `${siteUrl}/blogs/budget-vs-actual-spending-across-departments`,
    images: [currentBlogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Budget vs. Actual Spending Across Departments | MakeGraph',
    description: heroDescription,
    images: [currentBlogImage],
  },
};

const lastUpdated = 'June 10, 2026';
const recommendedCharts = getChartItemsByPaths(
  currentBlog?.mentionedChartPaths ?? []
);

type ContentSection = {
  id: string;
  title: string;
};

type BudgetRow = {
  department: string;
  budget: string;
  actual: string;
  variance: string;
  status: 'Over Budget' | 'Under Budget';
};

type ChoiceItem = {
  title: string;
  description: string;
  bestFor: string[];
};

const contents: ContentSection[] = [
  { id: 'overview', title: 'Why this comparison matters' },
  { id: 'example', title: 'Example by department' },
  { id: 'best-chart', title: 'Best chart for this task' },
  { id: 'other-options', title: 'When to use other charts' },
  { id: 'how-to-build', title: 'How to build it in MakeGraph' },
  { id: 'final', title: 'Create your chart' },
];

const sampleRows: BudgetRow[] = [
  {
    department: 'Marketing',
    budget: '$50,000',
    actual: '$62,000',
    variance: '+$12,000',
    status: 'Over Budget',
  },
  {
    department: 'Sales',
    budget: '$80,000',
    actual: '$75,000',
    variance: '-$5,000',
    status: 'Under Budget',
  },
  {
    department: 'HR',
    budget: '$30,000',
    actual: '$28,000',
    variance: '-$2,000',
    status: 'Under Budget',
  },
  {
    department: 'IT',
    budget: '$100,000',
    actual: '$120,000',
    variance: '+$20,000',
    status: 'Over Budget',
  },
];

const userQuestions = [
  'Which departments are over budget?',
  'Which teams stayed below plan?',
  'How large is the overspend or savings for each department?',
  'Is overall budget execution on track or drifting?',
];

const groupedBarReasons = [
  'It places budget and actual side by side for every department, so the gap is immediately visible.',
  'It works well in finance reviews, cost control meetings, and annual budget retrospectives.',
  'It stays readable even when multiple departments are shown together in one chart.',
  'It helps non-analysts understand the situation without reading a detailed spreadsheet first.',
];

const chartChoices: ChoiceItem[] = [
  {
    title: 'Grouped Bar Chart',
    description:
      'The most common choice when you want to compare budget and actual values side by side across departments.',
    bestFor: [
      'Department-by-department comparison',
      'Budget vs. actual dashboards',
      'Management slides and monthly reviews',
    ],
  },
  {
    title: 'Variance Chart',
    description:
      'A stronger option when the audience already knows the planned numbers and only needs to focus on the deviation.',
    bestFor: [
      'Highlighting overspend or savings',
      'Budget variance analysis',
      'Fast exception reporting',
    ],
  },
  {
    title: 'Combo Chart',
    description:
      'Useful when you want bars for actual spending and a line for budget, especially in executive reporting.',
    bestFor: [
      'Management reports',
      'Presenting plan vs. actual in one view',
      'Mixed dashboard layouts',
    ],
  },
];

const buildSteps = [
  'Open the double bar chart editor.',
  'Add one row per department.',
  'Use one series for Budget and the second series for Actual Spending.',
  'Rename the categories to department names such as Marketing, Sales, HR, and IT.',
  'Adjust colors so Budget and Actual are easy to distinguish at a glance.',
  'Export the chart for your report, presentation, or dashboard.',
];

export default function BudgetVsActualSpendingAcrossDepartmentsPage() {
  return (
    <div className="flex flex-col bg-transparent">
      {/* 英雄区：直接聚焦用户任务与图表动作 */}
      <div className="relative isolate px-6 py-16 sm:py-20 lg:px-8">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
            {heroEyebrow}
          </p>
          <h1 className="mt-4 text-balance font-semibold text-4xl leading-tight tracking-[-1.28px] text-[#171717] sm:text-[48px] sm:leading-[48px] sm:tracking-[-2.4px]">
            {heroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-[24px] text-[#4d4d4d] sm:text-[18px] sm:leading-[28px]">
            {heroDescription}
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
            Last updated · {lastUpdated}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              className="h-11 rounded-full bg-[#171717] px-5 text-white hover:bg-[#171717]/90"
              size="lg"
            >
              <Link href="/charts/double-bar-chart">Create This Chart</Link>
            </Button>
            <Button
              asChild
              className="h-11 rounded-full border border-[#ebebeb] bg-white px-5 text-[#171717] hover:bg-[#fafafa]"
              size="lg"
              variant="secondary"
            >
              <Link href="#best-chart">See The Recommended Chart</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* 正文区域：使用目录 + 分节排版，避免堆叠厚重卡片 */}
      <div className="relative border-t border-[#ebebeb] bg-white">
        <section
          className={`${boxContainerClassName} grid gap-12 py-16 sm:py-20 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16`}
        >
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
              Contents
            </p>
            <nav className="mt-5">
              <ul className="flex flex-col gap-3">
                {contents.map((section) => (
                  <li key={section.id}>
                    <Link
                      href={`#${section.id}`}
                      className="text-sm text-[#4d4d4d] transition-colors hover:text-[#171717]"
                    >
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="flex flex-col divide-y divide-[#ebebeb]">
            <section id="overview" className="scroll-mt-24 py-12 first:pt-0">
              <h2 className="text-2xl font-semibold tracking-[-0.6px] text-[#171717] sm:text-3xl sm:tracking-[-0.96px]">
                Why budget vs. actual spending matters across departments
              </h2>
              <p className="mt-5 text-base leading-7 text-[#4d4d4d] sm:text-[18px] sm:leading-[28px]">
                If you manage a department budget, prepare a finance review, or
                present a monthly management report, one question shows up again
                and again: did each team spend according to plan?
              </p>
              <p className="mt-5 text-base leading-7 text-[#4d4d4d] sm:text-[18px] sm:leading-[28px]">
                A budget vs. actual spending chart helps you compare planned
                cost with real spending across departments such as Marketing,
                Sales, HR, and IT. It turns a spreadsheet into a fast visual
                check, so you can quickly identify overspending, savings, and
                execution patterns.
              </p>
              <p className="mt-5 text-base leading-7 text-[#4d4d4d] sm:text-[18px] sm:leading-[28px]">
                From a user point of view, the goal is rarely just to show two
                columns of numbers. The real goal is to answer a few operational
                questions quickly.
              </p>
              <ul className="mt-6 flex flex-col gap-3 pl-5">
                {userQuestions.map((question) => (
                  <li
                    key={question}
                    className="list-disc text-base leading-7 text-[#4d4d4d] sm:text-[18px] sm:leading-[28px]"
                  >
                    {question}
                  </li>
                ))}
              </ul>
            </section>

            <section id="example" className="scroll-mt-24 py-12">
              <h2 className="text-2xl font-semibold tracking-[-0.6px] text-[#171717] sm:text-3xl sm:tracking-[-0.96px]">
                Example: budget vs. actual by department
              </h2>
              <p className="mt-5 text-base leading-7 text-[#4d4d4d] sm:text-[18px] sm:leading-[28px]">
                Here is a simple example that reflects a typical business
                analysis workflow. Each department has a budgeted amount and an
                actual spending amount. Once you place them side by side, the
                variance becomes much easier to read than in a plain sheet.
              </p>
              <div className="mt-8 overflow-hidden rounded-2xl border border-[#ebebeb] bg-[#fafafa]">
                <Table className="bg-white">
                  <TableHeader>
                    <TableRow className="border-[#ebebeb] hover:bg-white">
                      <TableHead className="px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
                        Department
                      </TableHead>
                      <TableHead className="px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
                        Budget
                      </TableHead>
                      <TableHead className="px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
                        Actual
                      </TableHead>
                      <TableHead className="px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
                        Variance
                      </TableHead>
                      <TableHead className="px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleRows.map((row) => (
                      <TableRow
                        key={row.department}
                        className="border-[#ebebeb] hover:bg-[#fafafa]"
                      >
                        <TableCell className="px-4 py-3 font-medium text-[#171717]">
                          {row.department}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-[#4d4d4d]">
                          {row.budget}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-[#4d4d4d]">
                          {row.actual}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-[#171717]">
                          {row.variance}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                              row.status === 'Over Budget'
                                ? 'bg-[#f7d4d6] text-[#c50000]'
                                : 'bg-[#d3e5ff] text-[#0761d1]'
                            }`}
                          >
                            {row.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.6px] text-[#171717]">
                    What this tells you immediately
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3 pl-5">
                    <li className="list-disc text-base leading-7 text-[#4d4d4d]">
                      Marketing is over budget by $12,000.
                    </li>
                    <li className="list-disc text-base leading-7 text-[#4d4d4d]">
                      IT is over budget by $20,000.
                    </li>
                    <li className="list-disc text-base leading-7 text-[#4d4d4d]">
                      Sales is under budget by $5,000.
                    </li>
                    <li className="list-disc text-base leading-7 text-[#4d4d4d]">
                      HR is under budget by $2,000.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.6px] text-[#171717]">
                    Common business situations
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3 pl-5">
                    <li className="list-disc text-base leading-7 text-[#4d4d4d]">
                      Enterprise finance analysis
                    </li>
                    <li className="list-disc text-base leading-7 text-[#4d4d4d]">
                      Department expense management
                    </li>
                    <li className="list-disc text-base leading-7 text-[#4d4d4d]">
                      Annual budget reviews
                    </li>
                    <li className="list-disc text-base leading-7 text-[#4d4d4d]">
                      Project cost control and management reporting
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="best-chart" className="scroll-mt-24 py-12">
              <h2 className="text-2xl font-semibold tracking-[-0.6px] text-[#171717] sm:text-3xl sm:tracking-[-0.96px]">
                The best chart for this use case is usually a grouped bar chart
              </h2>
              <p className="mt-5 text-base leading-7 text-[#4d4d4d] sm:text-[18px] sm:leading-[28px]">
                In most cases, the clearest answer is a grouped bar chart,
                sometimes also called a double bar chart. Each department gets
                two bars: one for Budget and one for Actual Spending. That makes
                it very easy to compare planned and real values in a single
                glance.
              </p>
              <div className="mt-8 rounded-2xl border border-[#ebebeb] bg-[#fafafa] p-6 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
                  Why it works
                </p>
                <ul className="mt-5 flex flex-col gap-3 pl-5">
                  {groupedBarReasons.map((reason) => (
                    <li
                      key={reason}
                      className="list-disc text-base leading-7 text-[#4d4d4d] sm:text-[18px] sm:leading-[28px]"
                    >
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-8 text-base leading-7 text-[#4d4d4d] sm:text-[18px] sm:leading-[28px]">
                For MakeGraph users, this is one of the most natural use cases
                for the{' '}
                <Link
                  href="/charts/double-bar-chart"
                  className="text-[#0070f3] underline underline-offset-4 hover:text-[#0761d1]"
                >
                  Double Bar Chart Maker
                </Link>
                . If your goal is to compare department budget against actual
                spending, this is typically the first chart to try.
              </p>
            </section>

            <section id="other-options" className="scroll-mt-24 py-12">
              <h2 className="text-2xl font-semibold tracking-[-0.6px] text-[#171717] sm:text-3xl sm:tracking-[-0.96px]">
                When a variance chart or combo chart is a better fit
              </h2>
              <p className="mt-5 text-base leading-7 text-[#4d4d4d] sm:text-[18px] sm:leading-[28px]">
                The grouped bar chart is the default choice, but it is not the
                only useful one. If your audience already knows the budget
                baseline, you may want to emphasize the difference instead of
                repeating both values.
              </p>
              <div className="mt-8 grid gap-8 lg:grid-cols-3">
                {chartChoices.map((item) => (
                  <div
                    key={item.title}
                    className="border-t border-[#ebebeb] pt-6"
                  >
                    <h3 className="text-xl font-semibold tracking-[-0.6px] text-[#171717]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#4d4d4d] sm:text-base">
                      {item.description}
                    </p>
                    <ul className="mt-4 flex flex-col gap-2 pl-5">
                      {item.bestFor.map((entry) => (
                        <li
                          key={entry}
                          className="list-disc text-sm leading-6 text-[#4d4d4d] sm:text-base"
                        >
                          {entry}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-base leading-7 text-[#4d4d4d] sm:text-[18px] sm:leading-[28px]">
                A simple rule: use a grouped bar chart when you need to compare
                both values, a variance chart when you need to stress the gap,
                and a combo chart when you want a more executive-style
                presentation.
              </p>
            </section>

            <section id="how-to-build" className="scroll-mt-24 py-12">
              <h2 className="text-2xl font-semibold tracking-[-0.6px] text-[#171717] sm:text-3xl sm:tracking-[-0.96px]">
                How to build a budget vs. actual spending chart in MakeGraph
              </h2>
              <p className="mt-5 text-base leading-7 text-[#4d4d4d] sm:text-[18px] sm:leading-[28px]">
                You do not need a complicated dashboard setup to create this
                comparison. If your data already contains a department name, a
                budget value, and an actual value, you can turn it into a chart
                in a few quick steps.
              </p>
              <ul className="mt-6 flex flex-col gap-3 pl-5">
                {buildSteps.map((step) => (
                  <li
                    key={step}
                    className="list-disc text-base leading-7 text-[#4d4d4d] sm:text-[18px] sm:leading-[28px]"
                  >
                    {step}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-base leading-7 text-[#4d4d4d] sm:text-[18px] sm:leading-[28px]">
                If you are building a management report, label the series
                clearly as Budget and Actual Spending, keep the departments in a
                meaningful order, and use contrasting colors so over-budget
                areas stand out during presentation.
              </p>
            </section>

            <section id="final" className="scroll-mt-24 py-12">
              <ChartList
                items={recommendedCharts.map((item) => ({
                  title: item.name,
                  description: item.description,
                  href: item.href,
                  image: item.image,
                  icon: item.icon,
                }))}
                eyebrow="Recommended charts"
                title="Build this analysis with the right chart templates."
                description="Start with the double bar chart for budget vs. actual comparison, then explore other chart types that help present totals, structure, or supporting comparisons."
              />
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
