import type { ReactNode } from 'react';
import Image from 'next/image';
import { ChartHero } from '~/components/chart-hero';
import { ChartRelatedBlogs } from '~/components/chart-related-blogs';
import { Button } from '~/components/ui/button';

type LandingTextItem = {
  key: string;
  content: ReactNode;
};

type LandingFeature = {
  key: string;
  title: ReactNode;
  description: ReactNode;
};

type LandingDecisionGroup = {
  key: string;
  title: ReactNode;
  items: LandingTextItem[];
};

type LandingFaq = {
  key: string;
  question: ReactNode;
  answer: ReactNode;
};

type ChartLandingPageProps = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  editor: ReactNode;
  whyItWorks: {
    eyebrow: string;
    title: string;
    description: ReactNode;
    points: LandingTextItem[];
  };
  previewImage: {
    src: string;
    alt: string;
  };
  productHighlights: {
    eyebrow: string;
    title: string;
    features: LandingFeature[];
  };
  useCases: {
    eyebrow: string;
    title: string;
    items: LandingTextItem[];
  };
  decisionGuide: LandingDecisionGroup[];
  faq: {
    eyebrow: string;
    title: string;
    items: LandingFaq[];
  };
  cta: {
    eyebrow: string;
    title: string;
    description: ReactNode;
    buttonLabel: string;
    buttonHref: string;
  };
  chartPath: string;
  locale: string;
  children?: ReactNode;
};

export function ChartLandingPage({
  hero,
  editor,
  whyItWorks,
  previewImage,
  productHighlights,
  useCases,
  decisionGuide,
  faq,
  cta,
  chartPath,
  locale,
  children,
}: ChartLandingPageProps) {
  return (
    <div className="flex flex-col bg-transparent">
      <ChartHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
      />
      <div id="chart-editor" className="chart-editor-shell scroll-mt-24">
        <div className="chart-editor-frame">{editor}</div>
      </div>
      <div className="relative border-[#ebebeb] border-t bg-white">
        <section className="container-box flex flex-col divide-y divide-[#ebebeb] py-16 sm:py-20">
          <section className="py-16 first:pt-0">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <p className="font-mono text-[#888888] text-xs uppercase tracking-[0.12em]">
                  {whyItWorks.eyebrow}
                </p>
                <h2 className="mt-4 max-w-3xl text-balance font-semibold text-[#171717] text-3xl tracking-[-0.96px] sm:text-4xl sm:tracking-[-1.28px]">
                  {whyItWorks.title}
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[#4d4d4d] sm:text-[18px]">
                  {whyItWorks.description}
                </p>
              </div>
              <div className="space-y-5 lg:pl-8">
                {whyItWorks.points.map((point) => (
                  <p
                    className="text-[#4d4d4d] text-sm leading-6 sm:text-base"
                    key={point.key}
                  >
                    {point.content}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-12">
              <div className="flex w-full items-center justify-center overflow-hidden rounded-2xl border border-[#ebebeb] bg-[#fafafa]">
                <Image
                  src={previewImage.src}
                  alt={previewImage.alt}
                  width={1200}
                  height={630}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-3xl">
              <p className="font-mono text-[#888888] text-xs uppercase tracking-[0.12em]">
                {productHighlights.eyebrow}
              </p>
              <h2 className="mt-4 text-balance font-semibold text-[#171717] text-3xl tracking-[-0.96px] sm:text-4xl sm:tracking-[-1.28px]">
                {productHighlights.title}
              </h2>
            </div>
            <div className="mt-10 grid gap-x-8 gap-y-8 md:grid-cols-2">
              {productHighlights.features.map((feature) => (
                <div key={feature.key}>
                  <h3 className="font-semibold text-[#171717] text-xl tracking-[-0.6px]">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-[#4d4d4d] text-sm leading-6 sm:text-base">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-16">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <p className="font-mono text-[#888888] text-xs uppercase tracking-[0.12em]">
                  {useCases.eyebrow}
                </p>
                <h2 className="mt-4 text-balance font-semibold text-[#171717] text-3xl tracking-[-0.96px] sm:text-4xl sm:tracking-[-1.28px]">
                  {useCases.title}
                </h2>
                <div className="mt-6 space-y-3">
                  {useCases.items.map((item) => (
                    <p
                      className="text-[#4d4d4d] text-sm leading-6 sm:text-base"
                      key={item.key}
                    >
                      {item.content}
                    </p>
                  ))}
                </div>
              </div>

              <div className="grid gap-10 md:grid-cols-2">
                {decisionGuide.map((group) => (
                  <div key={group.key}>
                    <h3 className="font-semibold text-[#171717] text-xl tracking-[-0.6px]">
                      {group.title}
                    </h3>
                    <div className="mt-4 space-y-3">
                      {group.items.map((item) => (
                        <p
                          className="text-[#4d4d4d] text-sm leading-6 sm:text-base"
                          key={item.key}
                        >
                          {item.content}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {children}

          <section className="py-16">
            <div className="max-w-3xl">
              <p className="font-mono text-[#888888] text-xs uppercase tracking-[0.12em]">
                {faq.eyebrow}
              </p>
              <h2 className="mt-4 text-balance font-semibold text-[#171717] text-3xl tracking-[-0.96px] sm:text-4xl sm:tracking-[-1.28px]">
                {faq.title}
              </h2>
            </div>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {faq.items.map((item) => (
                <div key={item.key}>
                  <h3 className="font-semibold text-[#171717] text-xl tracking-[-0.6px]">
                    {item.question}
                  </h3>
                  <p className="mt-3 max-w-3xl text-[#4d4d4d] text-sm leading-6 sm:text-base">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-16">
            <div className="rounded-2xl bg-[#171717] px-6 py-8 text-white sm:px-8 sm:py-10">
              <p className="font-mono text-white/60 text-xs uppercase tracking-[0.12em]">
                {cta.eyebrow}
              </p>
              <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <h2 className="text-balance font-semibold text-3xl tracking-[-0.96px] sm:text-4xl sm:tracking-[-1.28px]">
                    {cta.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-white/70 sm:text-[18px]">
                    {cta.description}
                  </p>
                </div>
                <Button
                  asChild
                  className="h-11 rounded-full bg-white px-5 text-[#171717] hover:bg-white/90"
                  size="lg"
                >
                  <a href={cta.buttonHref}>{cta.buttonLabel}</a>
                </Button>
              </div>
            </div>
          </section>

          <ChartRelatedBlogs chartPath={chartPath} locale={locale} />
        </section>
      </div>
    </div>
  );
}
