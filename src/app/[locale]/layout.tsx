import 'react-datasheet-grid/dist/style.css';
import '~/styles/globals.css';

import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import { GlobalBackground } from '~/components/global-background';
import { GlobalFooter } from '~/components/global-footer';
import { GlobalHeader } from '~/components/global-header';
import { googleAnalyticsId } from '~/lib/site';
import { GoogleAnalytics } from '@next/third-parties/google';
import { TRPCReactProvider } from '~/trpc/react';

export const metadata: Metadata = {
  metadataBase: new URL('https://makegraph.org'),
  title: 'MakeGraph - Free Online Chart Maker',
  description:
    'Turn your Excel or CSV data into clear charts in 1 minute. Free online chart maker.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  openGraph: {
    images: [{ url: '/og.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og.png'],
  },
};

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '~/i18n/routing';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html className={`${geist.variable}`} lang={locale}>
      <head>
        <meta name="stackscope-claim" content="aZyd5K4q" />
      </head>
      <TRPCReactProvider>
        <NextIntlClientProvider messages={messages}>
          <body className="relative flex min-h-screen flex-col bg-white">
            <GlobalBackground />
            <GlobalHeader />
            <div className="flex-1">{children}</div>
            <GlobalFooter />
            <GoogleAnalytics gaId={googleAnalyticsId} />
          </body>
        </NextIntlClientProvider>
      </TRPCReactProvider>
    </html>
  );
}
