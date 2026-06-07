import Link from 'next/link';

import { Button } from '~/components/ui/button';
import { boxContainerClassName } from '~/lib/layout';
import { HomeChartList } from './home-chart-list';

const sectionContainerClassName = `relative ${boxContainerClassName}`;

export function HomeHero() {
  return (
    <main className="relative isolate min-h-screen text-[#171717]">
      <section
        className={`${sectionContainerClassName} flex flex-col items-center pt-24 pb-20 text-center sm:pt-28 lg:pt-36`}
      >
        <p className="mb-8 rounded-full border border-[#ebebeb] bg-white/90 px-4 py-1 font-mono text-[#4d4d4d] text-[12px] uppercase tracking-[0.12em] backdrop-blur">
          NekoChart • Free Online Chart Maker
        </p>

        <h1 className="max-w-5xl text-balance font-semibold text-5xl leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
          Free online chart maker for Excel and CSV data
        </h1>

        <p className="mt-7 max-w-2xl text-pretty text-[#4d4d4d] text-base leading-7 sm:text-lg sm:leading-8">
          Upload or paste your spreadsheet, generate bar charts, line charts,
          and pie charts in 1 minute, then export PNG or SVG instantly. No
          signup, no registration, completely free.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="h-11 rounded-full px-6 text-sm" size="lg">
            <Link href="#">Create Chart Online</Link>
          </Button>
          <Button
            asChild
            className="h-11 rounded-full border-[#ebebeb] bg-white px-6 text-[#171717] text-sm hover:border-[#a1a1a1]"
            size="lg"
            variant="outline"
          >
            <Link href="#">View Bar, Line, Pie Examples</Link>
          </Button>
        </div>

        <p className="mt-5 font-mono text-[#888888] text-xs tracking-[0.06em] uppercase">
          Free chart maker · No signup · PNG/SVG export
        </p>
      </section>

      <HomeChartList className={sectionContainerClassName} />
    </main>
  );
}
