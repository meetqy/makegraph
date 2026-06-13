import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import {
  generateChartTitle,
  withChartLinks,
  getMetadataAlternates,
} from '~/lib/utils';
import { BarChartRaceMaker } from './_components/bar-chart-race-maker';
import { ChartRelatedBlogs } from '~/components/chart-related-blogs';
import { ChartHero } from '~/components/chart-hero';
import { Button } from '~/components/ui/button';

const currentPath = '/charts/bar-chart-race';

// 服务器端 metadata 生成
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BarChartRace' });

  return {
    title: generateChartTitle('Bar Chart Race'),
    description: t('heroDescription'),
    alternates: getMetadataAlternates('/charts/bar-chart-race', locale),
    openGraph: {
      images: ['/charts/bar-chart-race-og-image.png'],
    },
    twitter: {
      images: ['/charts/bar-chart-race-og-image.png'],
    },
  };
}

export default async function BarChartRacePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BarChartRace' });

  const heroEyebrow = t('heroEyebrow');
  const heroTitle = t('heroTitle');
  const heroDescription = t('heroDescription');

  const comparisonPoints = [
    t('comparisonPoint1'),
    t('comparisonPoint2'),
    t('comparisonPoint3'),
  ];

  const featureHighlights = [
    {
      title: t('feature1Title'),
      description: t('feature1Description'),
    },
    {
      title: t('feature2Title'),
      description: t('feature2Description'),
    },
    {
      title: t('feature3Title'),
      description: t('feature3Description'),
    },
    {
      title: t('feature4Title'),
      description: t('feature4Description'),
    },
  ];

  const useCases = [
    t('useCase1'),
    t('useCase2'),
    t('useCase3'),
    t('useCase4'),
    t('useCase5'),
    t('useCase6'),
  ];

  const decisionGuide = [
    {
      title: t('decisionGuide1Title'),
      items: [
        t('decisionGuide1Point1'),
        t('decisionGuide1Point2'),
        t('decisionGuide1Point3'),
        t('decisionGuide1Point4'),
      ],
    },
    {
      title: t('decisionGuide2Title'),
      items: [
        t('decisionGuide2Point1'),
        t('decisionGuide2Point2'),
        t('decisionGuide2Point3'),
        t('decisionGuide2Point4'),
      ],
    },
  ];

  const faqs = [
    {
      question: t('faq1Question'),
      answer: t('faq1Answer'),
    },
    {
      question: t('faq2Question'),
      answer: t('faq2Answer'),
    },
    {
      question: t('faq3Question'),
      answer: t('faq3Answer'),
    },
    {
      question: t('faq4Question'),
      answer: t('faq4Answer'),
    },
    {
      question: t('faq5Question'),
      answer: t('faq5Answer'),
    },
    {
      question: t('faq6Question'),
      answer: t('faq6Answer'),
    },
  ];

  return (
    <div className="flex flex-col bg-transparent">
      <ChartHero
        eyebrow={heroEyebrow}
        title={heroTitle}
        description={heroDescription}
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
                  {t('whyItWorksTitle')}
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[#4d4d4d] sm:text-[18px]">
                  {t('whyItWorksDescription')}
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
                  src="/charts/bar-chart-race-og-image.png"
                  alt="Bar Chart Race Example"
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
                {t('productHighlightsEyebrow')}
              </p>
              <h2 className="mt-4 text-balance font-semibold text-3xl tracking-[-0.96px] text-[#171717] sm:text-4xl sm:tracking-[-1.28px]">
                {t('productHighlightsTitle')}
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
                  {t('useCasesEyebrow')}
                </p>
                <h2 className="mt-4 text-balance font-semibold text-3xl tracking-[-0.96px] text-[#171717] sm:text-4xl sm:tracking-[-1.28px]">
                  {t('useCasesTitle')}
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
                {t('faqEyebrow')}
              </p>
              <h2 className="mt-4 text-balance font-semibold text-3xl tracking-[-0.96px] text-[#171717] sm:text-4xl sm:tracking-[-1.28px]">
                {t('faqTitle')}
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
                {t('ctaEyebrow')}
              </p>
              <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <h2 className="text-balance font-semibold text-3xl tracking-[-0.96px] sm:text-4xl sm:tracking-[-1.28px]">
                    {t('ctaTitle')}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-white/70 sm:text-[18px]">
                    {t('ctaDescription')}
                  </p>
                </div>
                <Button
                  asChild
                  className="h-11 rounded-full bg-white px-5 text-[#171717] hover:bg-white/90"
                  size="lg"
                >
                  <a href="#">{t('ctaButton')}</a>
                </Button>
              </div>
            </div>
          </section>

          <ChartRelatedBlogs chartPath={currentPath} locale={locale} />
        </section>
      </div>
    </div>
  );
}
