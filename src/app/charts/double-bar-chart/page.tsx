import type { Metadata } from 'next';
import Image from 'next/image';
import { DoubleBarChartMaker } from './_components/double-bar-chart-maker';
import { boxContainerClassName } from '~/lib/layout';
import { ChartList } from '~/components/chart-list';
import { ChartHero } from '~/components/chart-hero';
import { Button } from '~/components/ui/button';
import { getBlogItemsByChartPath } from '~/config/blogs';
import { generateChartTitle, withChartLinks } from '~/lib/utils';

// 当前页面路径：用于在 withChartLinks 中跳过指向自身的链接
const currentPath = '/charts/double-bar-chart';

// 英雄区文案
const heroEyebrow = 'Online Double Bar Chart Tool';
const heroTitle = 'Free Online Double Bar Chart Maker.';
const heroDescription =
  'Free online double bar chart maker. Compare two data sets side by side, customize colors, and preview instantly for dashboards and presentations.';
const relatedBlogs = getBlogItemsByChartPath(currentPath);

export const metadata: Metadata = {
  title: generateChartTitle('Double Bar Chart'),
  description: heroDescription,
  openGraph: {
    images: ['/charts/double-bar-chart-og-image.png'],
  },
  twitter: {
    images: ['/charts/double-bar-chart-og-image.png'],
  },
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
    question: 'What is a double bar chart?',
    answer:
      'A double bar chart displays two data series side by side within each category so people can compare two related metrics directly. Typical examples include this year vs last year, budget vs actual, or desktop vs mobile performance.',
  },
  {
    question: 'How is a double bar chart different from a regular bar chart?',
    answer:
      'A regular bar chart usually shows one data series. A double bar chart places two bars inside each category so viewers can compare two related values at the same time.',
  },
  {
    question: 'Is a double bar chart the same as a grouped bar chart?',
    answer:
      'Yes. Double bar chart is commonly used as another name for a grouped bar chart or clustered bar chart. The core idea is the same: multiple series are placed next to each other for comparison.',
  },
  {
    question: 'How is it different from a stacked bar chart?',
    answer:
      'A double bar chart emphasizes the difference between two values by placing them side by side. A stacked bar chart emphasizes the total and how each part contributes to that total.',
  },
  {
    question: 'What kind of data works well in a double bar chart?',
    answer:
      'It works well for comparing two related values across the same categories, such as revenue by month, planned vs actual spending, male vs female responses, or traffic by device type.',
  },
  {
    question: 'Can a double bar chart show more than two data series?',
    answer:
      'Yes. In practice, grouped bar charts can show three, four, or even more series. However, readability usually drops as more bars are added to each category, so two series is often the clearest choice.',
  },
  {
    question: 'When should I avoid using a double bar chart?',
    answer:
      'It is usually not the best choice when you have too many categories, too many data series, need to show a long-term trend, or want to emphasize part-to-whole relationships. In those cases, a line chart, stacked bar chart, or pie chart may work better.',
  },
  {
    question: 'Is a double bar chart suitable for time series data?',
    answer:
      'Yes, if you are comparing a limited number of time points such as monthly revenue this year vs last year. If the main goal is to show a longer trend over time, a line chart is usually easier to read.',
  },
  {
    question: 'What are the main advantages of a double bar chart?',
    answer:
      'It is easy to understand, strong for comparing two data sets, visually clear, useful in dashboards and business reports, and effective for spotting gaps or outliers quickly.',
  },
  {
    question: 'What are the drawbacks of a double bar chart?',
    answer:
      'It can become crowded when there are too many categories or too many series. It is also not ideal for showing cumulative totals or part-to-whole proportions.',
  },
  {
    question: 'What colors should I use in a double bar chart?',
    answer:
      'Use two clearly distinct colors or two tones from the same family with enough contrast. Avoid using too many colors because that makes comparison harder instead of easier.',
  },
  {
    question: 'How do I choose between a double bar chart and a line chart?',
    answer:
      'Use a double bar chart when you want to compare two data sets and emphasize value differences within categories. Use a line chart when you want to highlight movement, growth, or decline over time.',
  },
  {
    question: 'Is a double bar chart useful for business analysis?',
    answer:
      'Yes. It is widely used in finance, sales, marketing, budgeting, and HR reporting because it makes side-by-side comparisons easy to scan and explain.',
  },
  {
    question: 'Is a double bar chart suitable for academic research?',
    answer:
      'Yes. Researchers often use it to compare control vs experimental groups, different sample populations, or before-and-after results in a simple and readable way.',
  },
  {
    question: 'Can I use a double bar chart in AI or data analysis reports?',
    answer:
      'Yes. It is useful for comparing model A vs model B, precision vs recall, training vs test results, or the performance of different algorithms across the same benchmark categories.',
  },
  {
    question: 'What mistakes do people make most often with double bar charts?',
    answer:
      'Common mistakes include using too many categories, choosing colors that are too similar, using an inconsistent Y-axis scale, sorting data poorly, or making the legend unclear.',
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
              <div className="flex w-full items-center justify-center rounded-2xl border border-[#ebebeb] bg-[#fafafa] overflow-hidden">
                <Image
                  src="/charts/double-bar-chart-og-image.png"
                  alt="Double Bar Chart Example"
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
                Everything people usually ask before making a double bar chart.
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
                title="Learn when to use this chart in a real workflow."
                description="Read the guide connected to this chart template to see the business scenario, the data structure, and the reporting questions it helps answer."
              />
            </section>
          )}
        </section>
      </div>
    </div>
  );
}
