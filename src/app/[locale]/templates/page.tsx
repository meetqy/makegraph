import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { BarChart3 } from 'lucide-react';
import { ChartList } from '~/components/chart-list';
import { HeroBackground } from '~/components/hero-background';
import { getMetadataAlternates } from '~/lib/utils';

export const metadata: Metadata = {
  title: 'Templates | MakeGraph',
  description:
    'Explore ready-to-use chart templates with pre-filled data and configurations.',
  alternates: getMetadataAlternates('/templates'),
};

export default function TemplatesPage() {
  const t = useTranslations('Templates');

  const templateItems = [
    {
      title: t('capcomGameSeriesSalesTitle'),
      description: t('capcomGameSeriesSalesDescription'),
      href: '/templates/capcom-game-series-sales',
      image: '/templates/capcom-game-series-sales-og-image.png',
      icon: BarChart3,
    },
  ];

  return (
    <main className="relative isolate min-h-screen text-[#171717]">
      <HeroBackground bleedTop />
      <section className="relative container-box z-10 flex flex-col items-center pt-24 pb-20 text-center sm:pt-28 lg:pt-36">
        <p className="mb-8 rounded-full border border-[#ebebeb] bg-white/90 px-4 py-1 font-mono text-[#4d4d4d] text-[12px] uppercase tracking-[0.12em] backdrop-blur">
          {t('heroEyebrow')}
        </p>

        <h1 className="max-w-5xl text-balance font-semibold text-5xl leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
          {t('heroTitle')}
        </h1>

        <p className="mt-7 max-w-2xl text-pretty text-[#4d4d4d] text-base leading-7 sm:text-lg sm:leading-8">
          {t('heroDescription')}
        </p>
      </section>

      <ChartList
        className="relative container-box pb-24 lg:pb-28"
        items={templateItems}
      />
    </main>
  );
}
