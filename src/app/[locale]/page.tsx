import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { getMetadataAlternates } from '~/lib/utils';
import { HomeHero } from './_components/home-hero';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'Home' });

  return {
    title: t('heroTitle'),
    description: t('heroDescription'),
    alternates: getMetadataAlternates('/', locale),
  };
}

export default function HomePage() {
  return <HomeHero />;
}
