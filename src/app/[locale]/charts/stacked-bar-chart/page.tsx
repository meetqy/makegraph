import type { Metadata } from 'next';
import Image from 'next/image';
import { StackedBarChartMaker } from './_components/stacked-bar-chart-maker';
import { ChartList } from '~/components/chart-list';
import { ChartHero } from '~/components/chart-hero';
import { Button } from '~/components/ui/button';
import { getBlogItemsByChartPath } from '~/config/blogs';
import { generateChartTitle, withChartLinks } from '~/lib/utils';

// 当前页面路径：用于在 withChartLinks 中跳过指向自身的链接
const currentPath = '/charts/stacked-bar-chart';

// 英雄区文案
const heroEyebrow = 'Online Stacked Bar Chart Tool';
const heroTitle = 'Free Online Stacked Bar Chart Maker.';
const heroDescription =
  'Free online stacked bar chart maker. Compare totals and composition at a glance, switch to 100% stacked, customize colors, and preview instantly for reports.';
const relatedBlogs = getBlogItemsByChartPath(currentPath);

export const metadata: Metadata = {
  title: generateChartTitle('Stacked Bar Chart'),
  description: heroDescription,
  openGraph: {
    images: ['/charts/stacked-bar-chart-og-image.png'],
  },
  twitter: {
    images: ['/charts/stacked-bar-chart-og-image.png'],
  },
};

const comparisonPoints = [
  'Show both the total for every category and the parts that make it up in a single chart.',
  'Spot how composition shifts between months, regions, products, or channels without losing the total.',
  'Toggle to 100% stacked to focus on share instead of absolute values when the comparison calls for it.',
];

const featureHighlights = [
  {
    title: 'Edit three data series directly',
    description:
      'Update category names and three values in a built-in table without leaving the chart workflow.',
  },
  {
    title: 'Preview changes instantly',
    description:
      'Adjust data and immediately see how the stacked bar chart responds in the preview panel.',
  },
  {
    title: 'Customize all three series',
    description:
      'Control the chart title, labels for every series, theme colors, legend visibility, grid, and the 100% stacked mode.',
  },
  {
    title: 'Work well on desktop and mobile',
    description:
      'Use the three-column editor on larger screens or the bottom sheet controls on smaller devices.',
  },
];

const useCases = [
  'Show monthly revenue broken down by product line while keeping the total in view.',
  'Visualize survey results where each response can be split by segment or region.',
  'Compare traffic sources across channels while preserving the total visit count.',
  'Track energy mix over time, with each period showing the full breakdown.',
  'Present budget allocation across departments and see how totals change.',
  'Summarize resource usage by project, with both the share and the absolute amount.',
];

const decisionGuide = [
  {
    title: 'Use a stacked bar chart when',
    items: [
      'Each category has a meaningful total made up of multiple sub-parts.',
      'You want to compare both the totals and the composition across categories.',
      'The number of sub-parts stays small (typically 2 to 5) and remains easy to read.',
    ],
  },
  {
    title: 'Choose another chart when',
    items: [
      'You need to compare independent series side by side (use a double bar chart).',
      'You only care about share of the total and absolute values do not matter (use 100% stacked or a pie chart).',
      'You have many sub-parts, or values include negatives (use a grouped bar chart or a waterfall chart).',
    ],
  },
];

const faqs = [
  {
    question: 'What is a stacked bar chart?',
    answer:
      'A stacked bar chart is a bar chart in which multiple data series are stacked on top of each other within the same bar. The total height of each bar represents the sum of all series for that category, and each colored segment shows how much that series contributes to the total.',
  },
  {
    question: 'How is a stacked bar chart different from a regular bar chart?',
    answer:
      'A regular bar chart usually shows one data series. A stacked bar chart combines several series into a single bar so you can see both the total and the composition of that total in one view.',
  },
  {
    question: 'How is it different from a double bar chart?',
    answer:
      'A double bar chart places two or more series side by side inside each category so you can compare them as independent values. A stacked bar chart places the series on top of each other inside one bar so the focus is on the total and the share each series contributes.',
  },
  {
    question: 'What is a 100% stacked bar chart?',
    answer:
      'A 100% stacked bar chart (also called a percent stacked bar chart) normalizes every bar to the same total height of 100 percent. It removes the absolute total and shows only the share each series contributes, which is useful for comparing composition across categories.',
  },
  {
    question: 'What kind of data works well in a stacked bar chart?',
    answer:
      'Data where the sub-parts add up to a meaningful total works best. Examples include revenue split by product line, traffic by source, budget by category, and survey results by segment.',
  },
  {
    question: 'How many data series should a stacked bar chart have?',
    answer:
      'Two to three series usually look clean and stay readable. Up to five series can still work with strong colors and good legend placement. Beyond that, the segments become too thin and the chart gets hard to read.',
  },
  {
    question: 'Can a stacked bar chart show negative values?',
    answer:
      'It is not recommended. Stacking works because every segment adds to the segment below it. Negative values break that logic and make the chart confusing. Use a grouped bar chart or a waterfall chart when negatives are involved.',
  },
  {
    question: 'What colors should I use in a stacked bar chart?',
    answer:
      'Use colors with enough contrast to keep each segment easy to tell apart. A common approach is a single base color in different shades, or a small set of distinct accent colors. Avoid colors that are too similar, especially for segments that sit next to each other.',
  },
  {
    question: 'When should I use a stacked bar chart instead of a pie chart?',
    answer:
      'Use a stacked bar chart when you want to compare both totals and composition across several categories at once. A pie chart is usually better for showing the share of a single category, and it becomes hard to read when there are many slices or many pies to compare.',
  },
  {
    question: 'When should I use a stacked bar chart instead of a line chart?',
    answer:
      'Use a stacked bar chart when categories are discrete (months, regions, products) and you care about totals. Use a line chart when categories are continuous time points and the main goal is to show movement or trend.',
  },
  {
    question: 'How do I read a stacked bar chart?',
    answer:
      'Read the total height of each bar to compare totals across categories, and read the height of each colored segment to compare how much a single series contributes within or across categories. The legend tells you which color maps to which series.',
  },
  {
    question: 'Is a stacked bar chart useful for business analysis?',
    answer:
      'Yes. It is widely used in finance, sales, marketing, product, and operations reports because it shows both the total and the breakdown in the same view, which is often what decision makers want to see.',
  },
  {
    question: 'Is a stacked bar chart suitable for time series data?',
    answer:
      'Yes, for discrete time points such as months or quarters. If the focus is on long-term trend, a stacked area chart or a line chart is usually easier to read.',
  },
  {
    question: 'Is a stacked bar chart useful in academic research?',
    answer:
      'Yes. Researchers often use it to show how a sample is broken into sub-groups, how survey answers split by demographics, or how an experimental result is decomposed into contributing factors.',
  },
  {
    question: 'Can a stacked bar chart be used in AI or data analysis reports?',
    answer:
      'Yes. It is useful for showing prediction counts per class for different models, the share of each feature in a decomposition, or the composition of training and test sets across categories.',
  },
  {
    question:
      'What mistakes do people make most often with stacked bar charts?',
    answer:
      'Common mistakes include stacking series that do not actually add up to a meaningful total, using too many series so the segments become unreadable, picking colors that are too similar, forgetting to sort segments in a logical order, and forcing a stacked chart onto data that contains negative values.',
  },
];

export default function StackedBarChartPage() {
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
          <StackedBarChartMaker />
        </div>
      </div>
      {/* 详情介绍区域 */}
      <div className="relative border-t border-[#ebebeb] bg-white">
        <section
          className={`container-box flex flex-col divide-y divide-[#ebebeb] py-16 sm:py-20`}
        >
          <section className="py-16 first:pt-0">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
                  Why Stacked Bar Charts Work
                </p>
                <h2 className="mt-4 max-w-3xl text-balance font-semibold text-3xl tracking-[-0.96px] text-[#171717] sm:text-4xl sm:tracking-[-1.28px]">
                  Show the total and the parts of that total in one view.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[#4d4d4d] sm:text-[18px]">
                  Stacked bar charts combine two things that are usually shown
                  separately: the total for each category, and the share each
                  sub-group contributes to that total. This makes them a strong
                  default whenever the sub-parts add up to a meaningful whole.
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
                  src="/charts/stacked-bar-chart-og-image.png"
                  alt="Stacked Bar Chart Example"
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
                Built for part-to-whole comparison and instant preview.
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
                  Use it for revenue mix, traffic sources, budget breakdowns,
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
                Everything people usually ask before making a stacked bar chart.
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
                    Build a stacked bar chart in minutes.
                  </h2>
                  <p className="mt-4 text-base leading-7 text-white/70 sm:text-[18px]">
                    Enter your categories and up to three sub-series, adjust the
                    presentation, switch to 100% stacked when you need it, and
                    use the live preview above to turn raw numbers into a chart
                    that is easy to share and easy to understand.
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
                title="Read a guide that uses this chart in context."
                description="Jump to the related article to see the reporting scenario, the example data, and why this chart is a good fit."
              />
            </section>
          )}
        </section>
      </div>
    </div>
  );
}
