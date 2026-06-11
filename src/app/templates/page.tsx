import type { Metadata } from 'next';
import { BarChart3 } from 'lucide-react';
import { ChartList } from '~/components/chart-list';
import { HeroBackground } from '~/components/hero-background';
import { boxContainerClassName } from '~/lib/layout';

const sectionContainerClassName = `relative ${boxContainerClassName}`;

export const metadata: Metadata = {
  title: 'Templates | MakeGraph',
  description:
    'Explore ready-to-use chart templates with pre-filled data and configurations.',
};

const templateItems = [
  {
    title: 'Capcom Game Series Sales Units Bar Chart Maker',
    description:
      'A ready-to-use bar chart race template with fixed Capcom franchises. Fill in the sales units over time to animate the history of Resident Evil, Monster Hunter, Street Fighter, and more.',
    href: '/templates/capcom-game-series-sales',
    image: '/charts/bar-graph-og-image.png',
    icon: BarChart3,
  },
];

export default function TemplatesPage() {
  return (
    <main className="relative isolate min-h-screen text-[#171717]">
      <HeroBackground bleedTop />
      <section
        className={`${sectionContainerClassName} relative z-10 flex flex-col items-center pt-24 pb-20 text-center sm:pt-28 lg:pt-36`}
      >
        <p className="mb-8 rounded-full border border-[#ebebeb] bg-white/90 px-4 py-1 font-mono text-[#4d4d4d] text-[12px] uppercase tracking-[0.12em] backdrop-blur">
          MakeGraph • Chart Templates
        </p>

        <h1 className="max-w-5xl text-balance font-semibold text-5xl leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
          Ready-to-use chart templates
        </h1>

        <p className="mt-7 max-w-2xl text-pretty text-[#4d4d4d] text-base leading-7 sm:text-lg sm:leading-8">
          Explore data-driven stories with pre-filled structures and
          configurations. Just input your numbers to instantly generate
          beautiful, shareable charts.
        </p>
      </section>

      <ChartList
        className={`${sectionContainerClassName} pb-24 lg:pb-28`}
        items={templateItems}
      />
    </main>
  );
}
