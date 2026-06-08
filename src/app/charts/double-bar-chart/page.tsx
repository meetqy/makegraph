import type { Metadata } from 'next';
import { DoubleBarChartMaker } from './_components/double-bar-chart-maker';
import { boxContainerClassName } from '~/lib/layout';
import { ChartHero } from '~/components/chart-hero';
import { Button } from '~/components/ui/button';

// 英雄区文案
const heroEyebrow = 'Online Double Bar Chart Tool';
const heroTitle = 'Free Online Double Bar Chart Maker.';
const heroDescription =
  'Create a double bar chart online, compare two data sets side by side, customize labels and colors, and preview results instantly for reports, dashboards, and presentations.';

export const metadata: Metadata = {
  title: 'Free Online Double Bar Chart Maker',
  description: heroDescription,
};

const comparisonPoints = [
  'Compare two related datasets across multiple categories effortlessly.',
  'Highlight the differences, trends, and relationships between two metrics.',
  'Ideal for year-over-year, plan vs actual, or male vs female comparisons.',
];

const featureHighlights = [
  {
    title: 'Edit two data sets side by side',
    description:
      'Update category names and two values in a built-in table without leaving the chart workflow.',
  },
  {
    title: 'Preview changes instantly',
    description:
      'Adjust data and immediately see how the double bar chart responds in the preview panel.',
  },
  {
    title: 'Customize both series',
    description:
      'Control the chart title, labels for both series, theme colors, legend visibility, and grid.',
  },
  {
    title: 'Work well on desktop and mobile',
    description:
      'Use the three-column editor on larger screens or the bottom sheet controls on smaller devices.',
  },
];

const useCases = [
  "Compare this year's revenue vs last year's revenue by month.",
  'Show planned budget vs actual spending across departments.',
  'Compare survey responses between two different demographics.',
  'Analyze traffic from desktop vs mobile devices across channels.',
  'Present pre-test and post-test scores side by side.',
];

const decisionGuide = [
  {
    title: 'Use a double bar chart when',
    items: [
      'You need to compare two distinct metrics across the same categories.',
      'You want to emphasize the gap or difference between two values.',
      'Your data is grouped and consists of two related series.',
    ],
  },
  {
    title: 'Choose another chart when',
    items: [
      'You want to show the total sum of the two metrics (use a stacked bar chart).',
      'You are comparing more than 3-4 series (can become cluttered).',
      'You want to show continuous trends over time (use a multi-line chart).',
    ],
  },
];

const faqs = [
  {
    question: 'What is a double bar chart best for?',
    answer:
      'A double bar chart is best for comparing two related data sets side by side across different categories. It highlights the differences and relationships between two metrics effectively.',
  },
  {
    question: 'How is it different from a stacked bar chart?',
    answer:
      'A double bar chart places the bars side by side to emphasize the comparison between the two values, while a stacked bar chart places them on top of each other to emphasize the total sum.',
  },
  {
    question: 'Can I use it for more than two data sets?',
    answer:
      'While technically possible to have grouped bar charts with 3 or more bars, this tool is optimized for comparing exactly two series to keep the visualization clean and easy to read.',
  },
];

export default function DoubleBarChartPage() {
  return (
    <div className="flex flex-col bg-transparent">
      {/* 英雄区 */}
      <ChartHero
        eyebrow={heroEyebrow}
        title={heroTitle}
        description={heroDescription}
      />
      {/* 编辑器区域：遵循 w-full 和全宽原则 */}
      <div className="relative w-full bg-white p-4">
        <div className="h-[calc(100svh-12rem)] rounded-md w-full overflow-hidden border border-[#ebebeb] bg-white">
          <DoubleBarChartMaker />
        </div>
      </div>
      {/* 详情介绍区域 */}
      <div className="relative border-t border-[#ebebeb] bg-white">
        <section
          className={`${boxContainerClassName} flex flex-col divide-y divide-[#ebebeb] py-16 sm:py-20`}
        >
          <section className="py-16 first:pt-0">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
                  Why Double Bar Charts Work
                </p>
                <h2 className="mt-4 max-w-3xl text-balance font-semibold text-3xl tracking-[-0.96px] text-[#171717] sm:text-4xl sm:tracking-[-1.28px]">
                  Compare two datasets side by side effortlessly.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[#4d4d4d] sm:text-[18px]">
                  Double bar charts make it incredibly simple to compare two
                  related metrics across multiple categories. By placing the
                  bars side by side, viewers can immediately spot the
                  differences, gaps, and relative performance between the two
                  data sets.
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
              <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-[#d9d9d9] bg-[#fafafa] px-6 text-center">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
                    Image Placeholder
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#4d4d4d] sm:text-base">
                    Add a comparison or chart overview visual here.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
                Product Highlights
              </p>
              <h2 className="mt-4 text-balance font-semibold text-3xl tracking-[-0.96px] text-[#171717] sm:text-4xl sm:tracking-[-1.28px]">
                Built for side-by-side comparison and instant preview.
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
                  Use it for performance comparisons, year-over-year analysis,
                  and more.
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
                Everything people usually ask before making a double bar chart.
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
                    Build a double bar chart in minutes.
                  </h2>
                  <p className="mt-4 text-base leading-7 text-white/70 sm:text-[18px]">
                    Enter your categories and dual metrics, adjust the
                    presentation, and use the live preview above to turn raw
                    numbers into a chart that is easy to share and easy to
                    understand.
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
