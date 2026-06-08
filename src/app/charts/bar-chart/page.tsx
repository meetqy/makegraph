import type { Metadata } from 'next';
import Image from 'next/image';
import { BarChartMaker } from './_components/bar-chart-maker';
import { ChartHero } from '~/components/chart-hero';
import { Button } from '~/components/ui/button';
import { generateChartTitle } from '~/lib/utils';
import { boxContainerClassName } from '~/lib/layout';

const heroEyebrow = 'Online Bar Chart Tool';
const heroTitle = 'Free Online Bar Chart Maker.';
const heroDescription =
  'Free online bar chart maker. Easily compare category data, customize labels and colors, and preview results instantly for reports and presentations.';

export const metadata: Metadata = {
  title: generateChartTitle('Bar Chart'),
  description: heroDescription,
  openGraph: {
    images: ['/charts/bar-graph-og-image.png'],
  },
  twitter: {
    images: ['/charts/bar-graph-og-image.png'],
  },
};

const comparisonPoints = [
  'See which category leads, trails, or changes rank at a glance.',
  'Turn grouped counts, sums, averages, or percentages into a chart people can read fast.',
  'Create clean visuals for sales, survey, traffic, performance, and reporting workflows.',
];

const featureHighlights = [
  {
    title: 'Edit data directly',
    description:
      'Update category names and values in a built-in table without leaving the chart workflow.',
  },
  {
    title: 'Preview changes instantly',
    description:
      'Adjust data and immediately see how the bar chart responds in the preview panel.',
  },
  {
    title: 'Customize the presentation',
    description:
      'Control the chart title, legend name, color theme, legend visibility, and background grid.',
  },
  {
    title: 'Work well on desktop and mobile',
    description:
      'Use the three-column editor on larger screens or the bottom sheet controls on smaller devices.',
  },
];

const useCases = [
  'Compare product sales across categories or regions.',
  'Summarize survey responses by answer option.',
  'Show traffic, users, or conversions by channel.',
  'Review monthly or quarterly performance by team, market, or campaign.',
  'Present average scores, completion rates, or category-based percentages.',
  'Highlight top and bottom performers in a ranked comparison.',
];

const decisionGuide = [
  {
    title: 'Use a bar chart when',
    items: [
      'Your data is organized into clear categories.',
      'Your main goal is to compare values across groups.',
      'Readers need to spot the highest, lowest, or ranked items quickly.',
      'You are charting grouped metrics like count, sum, average, or percentage.',
    ],
  },
  {
    title: 'Choose another chart when',
    items: [
      'You want to show change over continuous time and a line chart fits better.',
      'You want to show the distribution of continuous values and need a histogram.',
      'You only care about part-to-whole share and a pie chart or 100% stacked bar chart is clearer.',
      'You have too many categories and labels become crowded or hard to scan.',
    ],
  },
];

const faqs = [
  {
    question: 'What is a bar chart best for?',
    answer:
      'A bar chart is best for comparing values across categories. It helps people quickly understand which group is larger, smaller, or more important in a ranked comparison.',
  },
  {
    question: 'What kind of data works well in a bar chart?',
    answer:
      'Bar charts work best with grouped or categorical data such as products, countries, channels, months, devices, or survey answers.',
  },
  {
    question: 'Can I use a bar chart for percentages?',
    answer:
      'Yes. If percentages are grouped by category, a bar chart is often a clear way to compare them side by side.',
  },
  {
    question: 'When should I use a horizontal bar chart instead?',
    answer:
      'A horizontal layout is usually easier to read when labels are long or when you need to compare many categories in one chart.',
  },
  {
    question: 'How is a bar chart different from a line chart?',
    answer:
      'A bar chart focuses on category comparison, while a line chart is usually better for showing continuous trends over time.',
  },
  {
    question: 'Why not just use a more complex spreadsheet chart?',
    answer:
      'A lightweight online bar chart maker is faster when your goal is to enter data, preview changes instantly, and create a clean chart without a heavier spreadsheet workflow.',
  },
];

export default function BarChartPage() {
  return (
    <div className="flex flex-col bg-transparent">
      <ChartHero
        eyebrow={heroEyebrow}
        title={heroTitle}
        description={heroDescription}
      />
      <div className="relative w-full bg-white p-4">
        <div className="h-[calc(100svh-12rem)] rounded-md w-full overflow-hidden border border-[#ebebeb] bg-white">
          <BarChartMaker />
        </div>
      </div>
      <div className="relative border-t border-[#ebebeb] bg-white">
        <section
          className={`${boxContainerClassName} flex flex-col divide-y divide-[#ebebeb] py-16 sm:py-20`}
        >
          <section className="py-16 first:pt-0">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
                  Why Bar Charts Work
                </p>
                <h2 className="mt-4 max-w-3xl text-balance font-semibold text-3xl tracking-[-0.96px] text-[#171717] sm:text-4xl sm:tracking-[-1.28px]">
                  Compare categories with less effort and more clarity.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[#4d4d4d] sm:text-[18px]">
                  Bar charts are one of the simplest ways to explain
                  category-based differences. They make it easy to show ranking,
                  gaps, and relative size without forcing readers to decode a
                  complicated visual.
                </p>
              </div>
              <div className="space-y-5 lg:pl-8">
                {comparisonPoints.map((point) => (
                  <p
                    className="text-sm leading-6 text-[#4d4d4d] sm:text-base"
                    key={point}
                  >
                    {point}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-12">
              <div className="flex w-full items-center justify-center rounded-2xl border border-[#ebebeb] bg-[#fafafa] overflow-hidden">
                <Image
                  src="/charts/bar-graph-og-image.png"
                  alt="Bar Chart Example"
                  width={1200}
                  height={630}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
                Product Highlights
              </p>
              <h2 className="mt-4 text-balance font-semibold text-3xl tracking-[-0.96px] text-[#171717] sm:text-4xl sm:tracking-[-1.28px]">
                Built for fast editing, instant preview, and lightweight chart
                customization.
              </h2>
            </div>
            <div className="mt-10 grid gap-x-8 gap-y-8 md:grid-cols-2">
              {featureHighlights.map((feature) => (
                <div key={feature.title}>
                  <h3 className="text-xl font-semibold tracking-[-0.6px] text-[#171717]">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#4d4d4d] sm:text-base">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-16">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
                  Common Use Cases
                </p>
                <h2 className="mt-4 text-balance font-semibold text-3xl tracking-[-0.96px] text-[#171717] sm:text-4xl sm:tracking-[-1.28px]">
                  Use it for reports, dashboards, campaigns, and survey
                  summaries.
                </h2>
                <div className="mt-6 space-y-3">
                  {useCases.map((item) => (
                    <p
                      className="text-sm leading-6 text-[#4d4d4d] sm:text-base"
                      key={item}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <div className="grid gap-10 md:grid-cols-2">
                {decisionGuide.map((group) => (
                  <div key={group.title}>
                    <h3 className="text-xl font-semibold tracking-[-0.6px] text-[#171717]">
                      {group.title}
                    </h3>
                    <div className="mt-4 space-y-3">
                      {group.items.map((item) => (
                        <p
                          className="text-sm leading-6 text-[#4d4d4d] sm:text-base"
                          key={item}
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
                Frequently Asked Questions
              </p>
              <h2 className="mt-4 text-balance font-semibold text-3xl tracking-[-0.96px] text-[#171717] sm:text-4xl sm:tracking-[-1.28px]">
                Everything people usually ask before making a bar chart.
              </h2>
            </div>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {faqs.map((item) => (
                <div key={item.question}>
                  <h3 className="text-xl font-semibold tracking-[-0.6px] text-[#171717]">
                    {item.question}
                  </h3>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-[#4d4d4d] sm:text-base">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-16">
            <div className="rounded-2xl bg-[#171717] px-6 py-8 text-white sm:px-8 sm:py-10">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/60">
                Ready To Start
              </p>
              <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <h2 className="text-balance font-semibold text-3xl tracking-[-0.96px] sm:text-4xl sm:tracking-[-1.28px]">
                    Build a clean bar chart in minutes.
                  </h2>
                  <p className="mt-4 text-base leading-7 text-white/70 sm:text-[18px]">
                    Enter your categories, adjust the presentation, and use the
                    live preview above to turn raw numbers into a chart that is
                    easy to share and easy to understand.
                  </p>
                </div>
                <Button
                  asChild
                  className="h-11 rounded-full bg-white px-5 text-[#171717] hover:bg-white/90"
                  size="lg"
                >
                  <a href="#">Start With The Editor</a>
                </Button>
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
