import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ChartLandingPage } from '~/components/chart-landing-page';
import { getMetadataAlternates, withChartLinks } from '~/lib/utils';
import { ConfidenceIntervalAreaChartMaker } from './_components/confidence-interval-area-chart-maker';

const currentPath = '/charts/confidence-interval-area-chart';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'ConfidenceIntervalAreaChart',
  });

  return {
    title: t('heroTitle').replace(/[.!。]+$/u, ''),
    description: t('heroDescription'),
    alternates: getMetadataAlternates(currentPath, locale),
    openGraph: {
      images: ['/charts/confidence-interval-area-chart-og-image.png'],
    },
    twitter: {
      images: ['/charts/confidence-interval-area-chart-og-image.png'],
    },
  };
}

export default async function ConfidenceIntervalAreaChartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'ConfidenceIntervalAreaChart',
  });

  const comparisonPoints = [
    {
      key: 'comparison-1',
      content: withChartLinks(
        t('comparisonPoint1'),
        'comparison-1',
        currentPath
      ),
    },
    {
      key: 'comparison-2',
      content: withChartLinks(
        t('comparisonPoint2'),
        'comparison-2',
        currentPath
      ),
    },
    {
      key: 'comparison-3',
      content: withChartLinks(
        t('comparisonPoint3'),
        'comparison-3',
        currentPath
      ),
    },
  ];

  const featureHighlights = [
    {
      key: 'feature-1',
      title: t('feature1Title'),
      description: t('feature1Description'),
    },
    {
      key: 'feature-2',
      title: t('feature2Title'),
      description: t('feature2Description'),
    },
    {
      key: 'feature-3',
      title: t('feature3Title'),
      description: t('feature3Description'),
    },
    {
      key: 'feature-4',
      title: t('feature4Title'),
      description: t('feature4Description'),
    },
  ];

  const useCases = [
    {
      key: 'use-case-1',
      content: withChartLinks(t('useCase1'), 'use-case-1', currentPath),
    },
    {
      key: 'use-case-2',
      content: withChartLinks(t('useCase2'), 'use-case-2', currentPath),
    },
    {
      key: 'use-case-3',
      content: withChartLinks(t('useCase3'), 'use-case-3', currentPath),
    },
    {
      key: 'use-case-4',
      content: withChartLinks(t('useCase4'), 'use-case-4', currentPath),
    },
    {
      key: 'use-case-5',
      content: withChartLinks(t('useCase5'), 'use-case-5', currentPath),
    },
    {
      key: 'use-case-6',
      content: withChartLinks(t('useCase6'), 'use-case-6', currentPath),
    },
  ];

  const decisionGuide = [
    {
      key: 'decision-guide-1',
      title: t('decisionGuide1Title'),
      items: [
        {
          key: 'decision-guide-1-1',
          content: withChartLinks(
            t('decisionGuide1Point1'),
            'decision-guide-1-1',
            currentPath
          ),
        },
        {
          key: 'decision-guide-1-2',
          content: withChartLinks(
            t('decisionGuide1Point2'),
            'decision-guide-1-2',
            currentPath
          ),
        },
        {
          key: 'decision-guide-1-3',
          content: withChartLinks(
            t('decisionGuide1Point3'),
            'decision-guide-1-3',
            currentPath
          ),
        },
        {
          key: 'decision-guide-1-4',
          content: withChartLinks(
            t('decisionGuide1Point4'),
            'decision-guide-1-4',
            currentPath
          ),
        },
      ],
    },
    {
      key: 'decision-guide-2',
      title: t('decisionGuide2Title'),
      items: [
        {
          key: 'decision-guide-2-1',
          content: withChartLinks(
            t('decisionGuide2Point1'),
            'decision-guide-2-1',
            currentPath
          ),
        },
        {
          key: 'decision-guide-2-2',
          content: withChartLinks(
            t('decisionGuide2Point2'),
            'decision-guide-2-2',
            currentPath
          ),
        },
        {
          key: 'decision-guide-2-3',
          content: withChartLinks(
            t('decisionGuide2Point3'),
            'decision-guide-2-3',
            currentPath
          ),
        },
        {
          key: 'decision-guide-2-4',
          content: withChartLinks(
            t('decisionGuide2Point4'),
            'decision-guide-2-4',
            currentPath
          ),
        },
      ],
    },
  ];

  const faqs = [
    {
      key: 'faq-1',
      question: t('faq1Question'),
      answer: t('faq1Answer'),
    },
    {
      key: 'faq-2',
      question: t('faq2Question'),
      answer: t('faq2Answer'),
    },
    {
      key: 'faq-3',
      question: t('faq3Question'),
      answer: t('faq3Answer'),
    },
    {
      key: 'faq-4',
      question: t('faq4Question'),
      answer: t('faq4Answer'),
    },
    {
      key: 'faq-5',
      question: t('faq5Question'),
      answer: t('faq5Answer'),
    },
    {
      key: 'faq-6',
      question: t('faq6Question'),
      answer: t('faq6Answer'),
    },
  ];

  return (
    <ChartLandingPage
      hero={{
        eyebrow: t('heroEyebrow'),
        title: t('heroTitle'),
        description: t('heroDescription'),
      }}
      editor={<ConfidenceIntervalAreaChartMaker />}
      whyItWorks={{
        eyebrow: t('whyItWorksEyebrow'),
        title: t('whyItWorksTitle'),
        description: withChartLinks(
          t('whyItWorksDescription'),
          'why-it-works-description',
          currentPath
        ),
        points: comparisonPoints,
      }}
      previewImage={{
        src: '/charts/confidence-interval-area-chart-og-image.png',
        alt: 'Confidence Interval Area Chart Example',
      }}
      productHighlights={{
        eyebrow: t('productHighlightsEyebrow'),
        title: t('productHighlightsTitle'),
        features: featureHighlights,
      }}
      useCases={{
        eyebrow: t('useCasesEyebrow'),
        title: t('useCasesTitle'),
        items: useCases,
      }}
      decisionGuide={decisionGuide}
      faq={{
        eyebrow: t('faqEyebrow'),
        title: t('faqTitle'),
        items: faqs.map((item) => ({
          key: item.key,
          question: withChartLinks(
            item.question,
            `${item.key}-question`,
            currentPath
          ),
          answer: withChartLinks(
            item.answer,
            `${item.key}-answer`,
            currentPath
          ),
        })),
      }}
      cta={{
        eyebrow: t('ctaEyebrow'),
        title: t('ctaTitle'),
        description: withChartLinks(
          t('ctaDescription'),
          'cta-description',
          currentPath
        ),
        buttonLabel: t('ctaButton'),
        buttonHref: '#chart-editor',
      }}
      chartPath={currentPath}
      locale={locale}
    >
      <section className="py-16">
        <div className="max-w-3xl">
          <p className="font-mono text-[#888888] text-xs uppercase tracking-[0.12em]">
            {t('quickDecisionEyebrow')}
          </p>
          <h2 className="mt-4 text-balance font-semibold text-[#171717] text-3xl tracking-[-0.96px] sm:text-4xl sm:tracking-[-1.28px]">
            {t('quickDecisionTitle')}
          </h2>
          <p className="mt-6 text-base leading-7 text-[#4d4d4d] sm:text-[18px]">
            {withChartLinks(
              t('quickDecisionDescription'),
              'quick-decision-description',
              currentPath
            )}
          </p>
        </div>

        <div className="mt-10 grid gap-10 border-[#ebebeb] border-y py-8 lg:grid-cols-2">
          <div className="lg:pr-8">
            <p className="font-mono text-[#888888] text-xs uppercase tracking-[0.12em]">
              {t('quickDecisionLineChartQuestion')}
            </p>
            <p className="mt-3 max-w-lg font-semibold text-[#171717] text-2xl tracking-[-0.72px] sm:text-[28px]">
              {withChartLinks(
                t('quickDecisionLineChartAnswer'),
                'quick-decision-line-answer',
                currentPath
              )}
            </p>
          </div>

          <div className="lg:border-[#ebebeb] lg:border-l lg:pl-8">
            <p className="font-mono text-[#888888] text-xs uppercase tracking-[0.12em]">
              {t('quickDecisionConfidenceQuestion')}
            </p>
            <p className="mt-3 max-w-lg font-semibold text-[#171717] text-2xl tracking-[-0.72px] sm:text-[28px]">
              {withChartLinks(
                t('quickDecisionConfidenceAnswer'),
                'quick-decision-confidence-answer',
                currentPath
              )}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="lg:pr-8">
            <h3 className="font-semibold text-[#171717] text-xl tracking-[-0.6px]">
              {t('quickDecisionChecklistLineTitle')}
            </h3>
            <div className="mt-4 space-y-3">
              {[1, 2, 3, 4].map((index) => (
                <p
                  className="text-[#4d4d4d] text-sm leading-6 sm:text-base"
                  key={`quick-line-${index}`}
                >
                  {withChartLinks(
                    t(`quickDecisionChecklistLineItem${index}`),
                    `quick-line-${index}`,
                    currentPath
                  )}
                </p>
              ))}
            </div>
          </div>

          <div className="lg:border-[#ebebeb] lg:border-l lg:pl-8">
            <h3 className="font-semibold text-[#171717] text-xl tracking-[-0.6px]">
              {t('quickDecisionChecklistConfidenceTitle')}
            </h3>
            <div className="mt-4 space-y-3">
              {[1, 2, 3, 4, 5].map((index) => (
                <p
                  className="text-[#4d4d4d] text-sm leading-6 sm:text-base"
                  key={`quick-confidence-${index}`}
                >
                  {withChartLinks(
                    t(`quickDecisionChecklistConfidenceItem${index}`),
                    `quick-confidence-${index}`,
                    currentPath
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ChartLandingPage>
  );
}
