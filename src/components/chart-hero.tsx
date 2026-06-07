import React from 'react';
import { HeroBackground } from '~/components/hero-background';

interface ChartHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function ChartHero({ eyebrow, title, description }: ChartHeroProps) {
  return (
    <div className="relative isolate px-6 py-16 sm:py-24 lg:px-8">
      <HeroBackground bleedTop />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-balance font-semibold text-4xl leading-tight tracking-[-1.28px] text-[#171717] sm:text-[48px] sm:leading-[48px] sm:tracking-[-2.4px]">
          {title}
        </h1>
        <p className="mt-6 text-pretty text-base leading-[24px] text-[#4d4d4d] sm:text-[18px] sm:leading-[28px]">
          {description}
        </p>
      </div>
    </div>
  );
}
