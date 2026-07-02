import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ChartLandingPage } from '~/components/chart-landing-page';
import { getMetadataAlternates, withChartLinks } from '~/lib/utils';
import { ParetoChartMaker } from './_components/pareto-chart-maker';

const currentPath = '/charts/pareto-chart';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ParetoChart' });

  return {
    title: t('heroTitle').replace(/[.!。]+$/u, ''),
    description: t('heroDescription'),
    alternates: getMetadataAlternates(currentPath, locale),
    openGraph: {
      images: ['/charts/pareto-chart-og-image.png'],
    },
    twitter: {
      images: ['/charts/pareto-chart-og-image.png'],
    },
  };
}

export default async function ParetoChartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ParetoChart' });

  const comparisonPoints = [1, 2, 3].map((index) => ({
    key: `comparison-${index}`,
    content: withChartLinks(
      t(`comparisonPoint${index}`),
      `comparison-${index}`,
      currentPath
    ),
  }));

  const featureHighlights = [1, 2, 3, 4].map((index) => ({
    key: `feature-${index}`,
    title: t(`feature${index}Title`),
    description: t(`feature${index}Description`),
  }));

  const useCases = [1, 2, 3, 4, 5, 6].map((index) => ({
    key: `use-case-${index}`,
    content: withChartLinks(
      t(`useCase${index}`),
      `use-case-${index}`,
      currentPath
    ),
  }));

  const decisionGuide = [1, 2].map((groupIndex) => ({
    key: `decision-guide-${groupIndex}`,
    title: t(`decisionGuide${groupIndex}Title`),
    items: [1, 2, 3, 4].map((itemIndex) => ({
      key: `decision-guide-${groupIndex}-${itemIndex}`,
      content: withChartLinks(
        t(`decisionGuide${groupIndex}Point${itemIndex}`),
        `decision-guide-${groupIndex}-${itemIndex}`,
        currentPath
      ),
    })),
  }));

  const faqs = [1, 2, 3, 4, 5, 6].map((index) => ({
    key: `faq-${index}`,
    question: withChartLinks(
      t(`faq${index}Question`),
      `faq-${index}-question`,
      currentPath
    ),
    answer: withChartLinks(
      t(`faq${index}Answer`),
      `faq-${index}-answer`,
      currentPath
    ),
  }));

  return (
    <ChartLandingPage
      hero={{
        eyebrow: t('heroEyebrow'),
        title: t('heroTitle'),
        description: t('heroDescription'),
      }}
      editor={<ParetoChartMaker />}
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
        src: '/charts/pareto-chart-og-image.png',
        alt: 'Pareto Chart Example',
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
        items: faqs,
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
    />
  );
}
