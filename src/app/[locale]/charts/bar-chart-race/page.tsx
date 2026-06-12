import type { Metadata } from 'next';
import Image from 'next/image';
import { BarChartRaceMaker } from './_components/bar-chart-race-maker';
import { ChartList } from '~/components/chart-list';
import { ChartHero } from '~/components/chart-hero';
import { getBlogItemsByChartPath } from '~/config/blogs';
import { getTranslations } from 'next-intl/server';
import { generateChartTitle, withChartLinks } from '~/lib/utils';

const currentPath = '/charts/bar-chart-race';

const heroEyebrow = 'Online Bar Chart Race Tool';
const heroTitle = 'Free Online Bar Chart Race Maker.';
const heroDescription =
  'Free online bar chart race maker. Animate rankings over time, edit data in a table, and preview a smooth racing chart instantly.';
const relatedBlogs = getBlogItemsByChartPath(currentPath);

export const metadata: Metadata = {
  title: generateChartTitle('Bar Chart Race'),
  description: heroDescription,
  openGraph: {
    images: [{ url: '/charts/bar-chart-race-og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/charts/bar-chart-race-og-image.png'],
  },
};

const comparisonPoints = [
  'Show how leaders rise, fall, and switch positions across time periods.',
  'Turn historical rankings into an animated story people can follow quickly.',
  'Present business, social, sports, and market data in a more engaging format.',
];

const featureHighlights = [
  {
    title: 'Edit time-series data directly',
    description:
      'Update the time, category, and value columns in one table without leaving the chart workflow.',
  },
  {
    title: 'Play the race instantly',
    description:
      'Preview the animated ranking changes immediately and restart playback at any time.',
  },
  {
    title: 'Control playback',
    description:
      'Adjust the visible bar count, playback speed, labels, and loop behavior for the final presentation.',
  },
  {
    title: 'Use it on desktop and mobile',
    description:
      'Keep the same full-screen chart editor with side panels on desktop and bottom sheets on mobile.',
  },
];

const useCases = [
  'Track company market cap leadership over multiple years.',
  'Show country GDP rankings or population rankings over time.',
  'Animate top channels, apps, creators, or products by growth.',
  'Visualize sports standings, medal tables, or season point races.',
  'Present historical rankings in education, research, or media content.',
];

const decisionGuide = [
  {
    title: 'Use a bar chart race when',
    items: [
      'Your main message is how ranking changes over time.',
      'You want viewers to compare leaders and movement between periods.',
      'Your data has repeated time steps such as years, quarters, or months.',
      'You only need to show the top part of the ranking, not every category at once.',
    ],
  },
  {
    title: 'Choose another chart when',
    items: [
      'You need precise trend reading for one series and a line chart is clearer.',
      'You only have one time point and a regular bar chart is enough.',
      'You want to compare composition and a stacked bar chart fits better.',
      'Your ranking changes too little to justify animation.',
    ],
  },
];

const faqs = [
  {
    question: 'What is a bar chart race?',
    answer:
      'A bar chart race is an animated horizontal bar chart that shows how values and rankings change over time.',
  },
  {
    question: 'What data format do I need?',
    answer:
      'Use three columns: time, category, and value. Each row represents one category at one point in time.',
  },
  {
    question: 'How many bars should I show?',
    answer:
      'Top 5 to Top 10 is usually the clearest range because it keeps the animation readable without overcrowding the screen.',
  },
  {
    question: 'When should I avoid a bar chart race?',
    answer:
      'Avoid it when you need exact trend analysis, have only one snapshot, or your data is better explained by a line chart or regular bar chart.',
  },
  {
    question: 'Can I reuse the same data for other chart types?',
    answer:
      'Yes. The same grouped time-series data can often be transformed into a line chart, a regular bar chart, or a stacked bar chart depending on your story.',
  },
];

export default async function BarChartRacePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BarChartRace' });
  return (
    <div className="flex flex-col bg-transparent">
      <ChartHero
        eyebrow={t('heroEyebrow')}
        title={t('heroTitle')}
        description={t('heroDescription')}
      />

      <div className="relative w-full bg-white p-4">
        <div className="h-[calc(100svh-12rem)] w-full overflow-hidden rounded-md border border-[#ebebeb] bg-white">
          <BarChartRaceMaker />
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
                  {t('whyItWorksEyebrow')}
                </p>
                <h2 className="mt-4 max-w-3xl text-balance font-semibold text-3xl tracking-[-0.96px] text-[#171717] sm:text-4xl sm:tracking-[-1.28px]">
                  Turn changing rankings into a visual story people can follow.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[#4d4d4d] sm:text-[18px]">
                  A bar chart race is strongest when the ranking matters as much
                  as the value itself. Instead of showing isolated snapshots, it
                  lets viewers watch movement, momentum, and leadership changes
                  across time.
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
                  src="/charts/bar-chart-race-og-image.png"
                  alt="Bar Chart Race Example"
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
                Built for quick data editing and animated ranking playback.
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
                  Use it for historical rankings, market movement, and trend-led
                  storytelling.
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
                FAQ
              </p>
              <h2 className="mt-4 text-balance font-semibold text-3xl tracking-[-0.96px] text-[#171717] sm:text-4xl sm:tracking-[-1.28px]">
                Common questions before making a bar chart race.
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
                title="Explore a guide connected to this chart type."
                description="Open the related article to see the use case, data shape, and reporting context behind this chart."
              />
            </section>
          )}
        </section>
      </div>
    </div>
  );
}
