import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { getMetadataAlternates } from '~/lib/utils';
import { HomeHero } from './_components/home-hero';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    alternates: getMetadataAlternates('/', locale),
  };
}

export default function HomePage() {
  return <HomeHero />;
}
