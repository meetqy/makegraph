import 'react-datasheet-grid/dist/style.css';
import '~/styles/globals.css';

import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import { GlobalBackground } from '~/components/global-background';
import { GlobalFooter } from '~/components/global-footer';
import { GlobalHeader } from '~/components/global-header';
import { TRPCReactProvider } from '~/trpc/react';

export const metadata: Metadata = {
  title: 'MakeGraph - Free Online Chart Maker',
  description:
    'Turn your Excel or CSV data into clear charts in 1 minute. Free online chart maker.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${geist.variable}`} lang="en">
      <TRPCReactProvider>
        <body className="relative flex min-h-screen flex-col bg-white">
          <GlobalBackground />
          <GlobalHeader />
          <div className="flex-1">{children}</div>
          <GlobalFooter />
        </body>
      </TRPCReactProvider>
    </html>
  );
}
