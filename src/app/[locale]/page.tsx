import type { Metadata } from 'next';
import { getMetadataAlternates } from '~/lib/utils';
import { HomeHero } from './_components/home-hero';

export const metadata: Metadata = {
  alternates: getMetadataAlternates('/'),
};

export default function HomePage() {
  return <HomeHero />;
}
