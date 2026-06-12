import type { Metadata } from 'next';
import Image from 'next/image';
import { RadarChartMaker } from './_components/radar-chart-maker';
import { ChartList } from '~/components/chart-list';
import { ChartHero } from '~/components/chart-hero';
import { Button } from '~/components/ui/button';
import { getBlogItemsByChartPath } from '~/config/blogs';
import { generateChartTitle, withChartLinks } from '~/lib/utils';

const currentPath = '/charts/radar-chart';

const heroEyebrow = 'Online Radar Chart Tool';
const heroTitle = 'Free Online Radar Chart Maker.';
const heroDescription =
  'Free online radar chart maker. Compare strengths across multiple dimensions, customize labels and colors, and preview results instantly for reports and presentations.';
const relatedBlogs = getBlogItemsByChartPath(currentPath);

export const metadata: Metadata = {
  title: generateChartTitle('Radar Chart'),
  description: heroDescription,
  openGraph: {
    images: ['/charts/radar-chart-og-image.png'],
  },
  twitter: {
    images: ['/charts/radar-chart-og-image.png'],
  },
};

const comparisonPoints = [
  'Show how one subject performs across several dimensions in a single shape.',
  'Make strengths, gaps, and balance easier to compare than with a plain table.',
  'Turn scorecards, capability reviews, and multi-factor assessments into a chart people can scan fast.',
];

const featureHighlights = [
  {
    title: 'Edit dimensions directly',
    description:
      'Update labels and values in a built-in table without leaving the chart workflow.',
  },
  {
    title: 'Preview the shape instantly',
    description:
      'Adjust data and immediately see how the radar chart expands, contracts, and rebalances in the preview panel.',
  },
  {
    title: 'Customize chart styling',
    description:
      'Control the chart title, legend label, color theme, fill opacity, legend visibility, and polar grid display.',
  },
  {
    title: 'Work well on desktop and mobile',
    description:
      'Use the three-column editor on larger screens or the bottom sheet controls on smaller devices.',
  },
];

const useCases = [
  'Compare team skills, candidate evaluations, or performance review categories.',
  'Visualize product scorecards across usability, reliability, pricing, and support.',
  'Show brand, vendor, or tool comparisons across several weighted criteria.',
  'Present self-assessments, maturity models, or capability benchmarks.',
  'Summarize survey results where each axis represents a separate dimension.',
  'Explain balance across factors when one total score would hide the real story.',
];

const decisionGuide = [
  {
    title: 'Use a radar chart when',
    items: [
      'You need to compare one item or a few items across multiple dimensions at once.',
      'Your main goal is to reveal strengths, weaknesses, and overall balance.',
      'Each axis represents a comparable score, rating, or level.',
      'Readers should see shape differences faster than scanning a table.',
    ],
  },
  {
    title: 'Choose another chart when',
    items: [
      'You want to compare many independent categories and a bar chart fits better.',
      'You need to show change over time and a line chart is clearer.',
      'You want precise value comparison across many items, where the radial layout becomes harder to read.',
      'Your data is part-to-whole, so a stacked bar chart may communicate the relationship more clearly.',
    ],
  },
];

const faqs = [
  {
    question: 'What is a radar chart best for?',
    answer:
      'A radar chart is best for comparing strengths, weaknesses, and overall balance across several dimensions at the same time. It is especially useful for scorecards and multi-criteria comparisons.',
  },
  {
    question: 'What kind of data works well in a radar chart?',
    answer:
      'Radar charts work best with comparable metrics such as scores, ratings, percentages, or maturity levels where each axis represents a different dimension of the same subject.',
  },
  {
    question: 'How many categories should a radar chart have?',
    answer:
      'A radar chart is usually easiest to read with around 5 to 8 axes. Too many dimensions can make labels crowded and the shape harder to interpret.',
  },
  {
    question: 'How is a radar chart different from a bar chart?',
    answer:
      'A radar chart emphasizes overall shape and balance across dimensions, while a bar chart is usually better when readers need precise comparisons between separate categories.',
  },
  {
    question: 'When should I avoid using a radar chart?',
    answer:
      'Avoid it when you have many categories, need exact value reading, or want to show change over time. In those cases, a bar chart or line chart is often more effective.',
  },
  {
    question:
      'Why use an online radar chart maker instead of a spreadsheet chart?',
    answer:
      'A lightweight online radar chart maker is faster when your goal is to enter data, preview the shape instantly, adjust styling quickly, and export a clean chart without a heavier spreadsheet workflow.',
  },
];

export default function RadarChartPage() {
  return (
    <div className="flex flex-col bg-transparent">
      <ChartHero
        eyebrow={heroEyebrow}
        title={heroTitle}
        description={heroDescription}
      />
      <div className="relative w-full bg-white p-4">
        <div className="h-[calc(100svh-12rem)] w-full overflow-hidden rounded-md border border-[#ebebeb] bg-white">
          <RadarChartMaker />
        </div>
      </div>
      <div className="relative border-t border-[#ebebeb] bg-white">
        <section
          className={`container-box flex flex-col divide-y divide-[#ebebeb] py-16 sm:py-20`}
        >
          <section className="py-16 first:pt-0">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
                  Why Radar Charts Work
                </p>
                <h2 className="mt-4 max-w-3xl text-balance font-semibold text-3xl tracking-[-0.96px] text-[#171717] sm:text-4xl sm:tracking-[-1.28px]">
                  Compare multiple dimensions in one balanced view.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[#4d4d4d] sm:text-[18px]">
                  Radar charts help readers understand how one subject performs
                  across several criteria at once. Instead of scanning one score
                  after another, people can quickly see where the shape
                  stretches, where it falls short, and whether the overall
                  profile looks balanced.
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
              <div className="flex w-full items-center justify-center overflow-hidden rounded-2xl border border-[#ebebeb] bg-[#fafafa]">
                <Image
                  src="/charts/radar-chart-og-image.png"
                  alt="Radar Chart Example"
                  width={1200}
                  height={630}
                  className="h-auto w-full object-cover"
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
                Built for fast editing, instant preview, and lightweight
                multi-factor comparison.
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
                  Use it for scorecards, capability reviews, and side-by-side
                  criteria comparison.
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
                Everything people usually ask before making a radar chart.
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
                    Build a clear radar chart in minutes.
                  </h2>
                  <p className="mt-4 text-base leading-7 text-white/70 sm:text-[18px]">
                    Enter your dimensions, adjust the styling, and use the live
                    preview above to turn raw scores into a chart that is easy
                    to present and easy to compare.
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
