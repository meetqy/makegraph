import '~/styles/globals.css';

import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Script from 'next/script';

import { GlobalBackground } from '~/components/global-background';
import { GlobalFooter } from '~/components/global-footer';
import { GlobalHeader } from '~/components/global-header';
import { googleAnalyticsId, siteUrl } from '~/lib/site';
import { GoogleAnalytics } from '@next/third-parties/google';
import { TRPCReactProvider } from '~/trpc/react';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl ?? 'http://localhost:3001'),
  title: {
    default: 'Free Online Chart Maker for Excel and CSV Data',
    template: '%s | MakeGraph',
  },
  description:
    'Upload or paste your spreadsheet, generate bar charts, line charts, and pie charts in 1 minute, then export PNG or SVG instantly. No signup, no registration, completely free.',
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
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "x89ea8i48v");`,
          }}
        />
      </head>
      <TRPCReactProvider>
        <NextIntlClientProvider messages={messages}>
          <body className="relative flex min-h-screen flex-col bg-white">
            <GlobalBackground />
            <GlobalHeader />
            <div className="flex-1">{children}</div>
            <GlobalFooter />
            <GoogleAnalytics gaId={googleAnalyticsId} />
            <NextTopLoader />
          </body>
        </NextIntlClientProvider>
      </TRPCReactProvider>
    </html>
  );
}
