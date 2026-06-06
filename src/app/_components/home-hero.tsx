import Link from 'next/link';

import { Button } from '~/components/ui/button';

export function HomeHero() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-white text-[#171717]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-12rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,124,240,0.4)_0%,rgba(0,124,240,0)_72%)] blur-2xl" />
        <div className="absolute top-[9rem] right-[8%] h-[24rem] w-sm rounded-full bg-[radial-gradient(circle,rgba(255,0,128,0.34)_0%,rgba(255,0,128,0)_70%)] blur-2xl" />
        <div className="absolute top-[15rem] left-[10%] h-[20rem] w-xs rounded-full bg-[radial-gradient(circle,rgba(80,227,194,0.32)_0%,rgba(80,227,194,0)_72%)] blur-2xl" />
        <div className="absolute bottom-[-10rem] left-[38%] h-[24rem] w-sm rounded-full bg-[radial-gradient(circle,rgba(249,203,40,0.24)_0%,rgba(249,203,40,0)_72%)] blur-2xl" />
      </div>

      <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-24 pb-20 text-center sm:pt-28 lg:px-8 lg:pt-36">
        <p className="mb-8 rounded-full border border-[#ebebeb] bg-white/90 px-4 py-1 font-mono text-[#4d4d4d] text-[12px] uppercase tracking-[0.12em] backdrop-blur">
          NekoChart • Online Chart Builder
        </p>

        <h1 className="max-w-5xl text-balance font-semibold text-5xl leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
          Build clear charts from raw data in minutes
        </h1>

        <p className="mt-7 max-w-2xl text-pretty text-[#4d4d4d] text-base leading-7 sm:text-lg sm:leading-8">
          Import your CSV, choose a visual style, and export publication-ready
          charts with consistent spacing, color, and typography.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="h-11 rounded-full px-6 text-sm" size="lg">
            <Link href="#">Start for free</Link>
          </Button>
          <Button
            asChild
            className="h-11 rounded-full border-[#ebebeb] bg-white px-6 text-[#171717] text-sm hover:border-[#a1a1a1]"
            size="lg"
            variant="outline"
          >
            <Link href="#">View templates</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
