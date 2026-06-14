import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import { ChartList } from '~/components/chart-list';
import { HeroBackground } from '~/components/hero-background';
import { blogItems } from '~/config/blogs';
import { getMetadataAlternates } from '~/lib/utils';

const heroTitle = 'Blog';
const heroDescription =
  'Practical guides to help you turn data into clear charts for reports, presentations, and dashboards.';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: 'Blog',
    description: heroDescription,
    alternates: getMetadataAlternates('/blogs', locale),
  };
}

export default function BlogsPage() {
  return (
    <div className="relative isolate flex flex-col bg-transparent text-[#171717]">
      <HeroBackground bleedTop />
      <section
        className={`container-box relative z-10 flex flex-col items-center pt-24 pb-20 text-center sm:pt-28 lg:pt-36`}
      >
        <p className="mb-8 rounded-full border border-[#ebebeb] bg-white/90 px-4 py-1 font-mono text-[#4d4d4d] text-[12px] uppercase tracking-[0.12em] backdrop-blur">
          MakeGraph • Chart Guides & Tutorials
        </p>
        <h1 className="max-w-5xl text-balance font-semibold text-5xl leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
          {heroTitle}
        </h1>
        <p className="mt-7 max-w-2xl text-pretty text-[#4d4d4d] text-base leading-7 sm:text-lg sm:leading-8">
          {heroDescription}
        </p>
        <p className="mt-5 font-mono text-[#888888] text-xs tracking-[0.06em] uppercase">
          Practical tutorials · Real examples · Recommended chart templates
        </p>
      </section>

      {/* 博客列表区域 */}
      <div className="relative bg-white">
        <section className={`container-box py-16 sm:py-20`}>
          <ChartList
            items={blogItems.map((blog) => ({
              title: blog.title,
              description: blog.description,
              href: blog.href,
              image: blog.image,
              icon: blog.icon,
              meta: blog.date,
            }))}
          />
        </section>
      </div>
    </div>
  );
}
