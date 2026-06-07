import '~/styles/globals.css';
import 'react-datasheet-grid/dist/style.css';

import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import { GlobalFooter } from '~/components/global-footer';

export const metadata: Metadata = {
  title: 'NekoChart - Free Online Chart Maker',
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
      <body className="flex min-h-screen flex-col bg-white">
        <div className="flex-1">{children}</div>
        <GlobalFooter />
      </body>
    </html>
  );
}
