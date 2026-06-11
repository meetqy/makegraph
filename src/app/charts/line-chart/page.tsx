import type { Metadata } from 'next';
import Image from 'next/image';
import { LineChartMaker } from './_components/line-chart-maker';
import { ChartList } from '~/components/chart-list';
import { ChartHero } from '~/components/chart-hero';
import { Button } from '~/components/ui/button';
import { getBlogItemsByChartPath } from '~/config/blogs';
import { generateChartTitle, withChartLinks } from '~/lib/utils';
import { boxContainerClassName } from '~/lib/layout';

const currentPath = '/charts/line-chart';

const heroEyebrow = 'Online Line Chart Tool';
const heroTitle = 'Free Online Line Chart Maker.';
const heroDescription =
  'Free online line chart maker. Plot trends over time, customize labels and colors, and preview results instantly for reports and presentations.';
const relatedBlogs = getBlogItemsByChartPath(currentPath);

export const metadata: Metadata = {
  title: generateChartTitle('Line Chart'),
  description: heroDescription,
  openGraph: {
    images: ['/charts/line-chart-og-image.png'],
  },
  twitter: {
    images: ['/charts/line-chart-og-image.png'],
  },
};

const comparisonPoints = [
  'Show whether a metric rises, falls, or stays flat across time periods.',
  'Make peaks, dips, and turning points easier to see than with a static table.',
  'Turn weekly, monthly, quarterly, or yearly metrics into a chart people can scan fast.',
];

const featureHighlights = [
  {
    title: 'Edit data directly',
    description:
      'Update labels and values in a built-in table without leaving the chart workflow.',
  },
  {
    title: 'Preview changes instantly',
    description:
      'Adjust data and immediately see how the line chart responds in the preview panel.',
  },
  {
    title: 'Customize the presentation',
    description:
      'Control the chart title, series label, color theme, legend visibility, and background grid.',
  },
  {
    title: 'Work well on desktop and mobile',
    description:
      'Use the three-column editor on larger screens or the bottom sheet controls on smaller devices.',
  },
];

const useCases = [
  'Track website traffic, conversions, or active users over time.',
  'Show monthly revenue, cost, or profit trends in business reporting.',
  'Visualize temperature, energy use, or sensor readings across a timeline.',
  'Present project progress, KPI movement, or retention changes.',
  'Compare how a metric behaves before and after a launch or campaign.',
  'Summarize year-over-year movement when the trend matters more than one snapshot.',
];

const decisionGuide = [
  {
    title: 'Use a line chart when',
    items: [
      'Your data follows a natural order, especially time.',
      'Your main goal is to show movement, trend, or volatility.',
      'Readers need to spot peaks, dips, and changes in direction quickly.',
      'You want to compare how one metric evolves across periods.',
    ],
  },
  {
    title: 'Choose another chart when',
    items: [
      'You want to compare independent categories and a bar chart fits better.',
      'You want to show part-to-whole share and a pie chart or stacked bar chart is clearer.',
      'Your labels have no meaningful sequence, so connecting them as a line would be misleading.',
      'You only need one or two isolated values and trend is not the story.',
    ],
  },
];

const faqs = [
  {
    question: 'What is a line chart best for?',
    answer:
      'A line chart is best for showing how values change over time or across another meaningful sequence. It helps people quickly read trend, direction, and volatility.',
  },
  {
    question: 'What kind of data works well in a line chart?',
    answer:
      'Line charts work best with ordered data such as days, weeks, months, quarters, years, steps, or stages where the sequence matters.',
  },
  {
    question: 'Can I use a line chart for percentages?',
    answer:
      'Yes. Percent-based metrics like conversion rate, retention rate, growth rate, or completion rate are often very clear in a line chart when they change over time.',
  },
  {
    question: 'How is a line chart different from a bar chart?',
    answer:
      'A line chart focuses on change across a sequence, while a bar chart is usually better for comparing values across separate categories.',
  },
  {
    question: 'When should I avoid using a line chart?',
    answer:
      'Avoid it when the X-axis is made of unrelated categories or when part-to-whole comparison is the main message. In those cases, a bar chart, pie chart, or stacked bar chart is often clearer.',
  },
  {
    question:
      'Why use an online line chart maker instead of a spreadsheet chart?',
    answer:
      'A lightweight online line chart maker is faster when your goal is to enter data, preview changes instantly, and create a clean chart without a heavier spreadsheet workflow.',
  },
];

export default function LineChartPage() {
  return (
    <div className="flex flex-col bg-transparent">
      <ChartHero
        eyebrow={heroEyebrow}
        title={heroTitle}
        description={heroDescription}
      />
      <div className="relative w-full bg-white p-4">
        <div className="h-[calc(100svh-12rem)] rounded-md w-full overflow-hidden border border-[#ebebeb] bg-white">
          <LineChartMaker />
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
                  Why Line Charts Work
                </p>
                <h2 className="mt-4 max-w-3xl text-balance font-semibold text-3xl tracking-[-0.96px] text-[#171717] sm:text-4xl sm:tracking-[-1.28px]">
                  Show change over time with less noise and more clarity.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[#4d4d4d] sm:text-[18px]">
                  Line charts make it easier to explain trend than almost any
                  other chart type. They connect each point in sequence so
                  readers can quickly see whether a metric is growing, falling,
                  flattening, or moving unpredictably.
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
                  src="/charts/line-chart-og-image.png"
                  alt="Line Chart Example"
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
                Built for fast editing, instant preview, and lightweight trend
                visualization.
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
                  Use it for KPI trends, reporting timelines, and ongoing metric
                  tracking.
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
                      {group.items.map((item, itemIndex) => (
                        <p
                          className="text-sm leading-6 text-[#4d4d4d] sm:text-base"
                          key={`${group.title}-${itemIndex}`}
                        >
                          {withChartLinks(item, `dg-${itemIndex}`, currentPath)}
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
                Everything people usually ask before making a line chart.
              </h2>
            </div>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {faqs.map((item, faqIndex) => (
                <div key={item.question}>
                  <h3 className="text-xl font-semibold tracking-[-0.6px] text-[#171717]">
                    {withChartLinks(
                      item.question,
                      `faq-q-${faqIndex}`,
                      currentPath
                    )}
                  </h3>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-[#4d4d4d] sm:text-base">
                    {withChartLinks(
                      item.answer,
                      `faq-a-${faqIndex}`,
                      currentPath
                    )}
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
                    Build a clean line chart in minutes.
                  </h2>
                  <p className="mt-4 text-base leading-7 text-white/70 sm:text-[18px]">
                    Enter your timeline, adjust the presentation, and use the
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

          {relatedBlogs.length > 0 && (
            <section className="py-16">
              <ChartList
                items={relatedBlogs.map((blog) => ({
                  title: blog.title,
                  description: blog.description,
                  href: blog.href,
                  image: blog.image,
                  icon: blog.icon,
                  meta: blog.date,
                }))}
                eyebrow="Related blog"
                title="See a business use case for this chart."
                description="Open the related guide to understand the scenario, the example data, and the reporting questions behind this chart choice."
              />
            </section>
          )}
        </section>
      </div>
    </div>
  );
}
