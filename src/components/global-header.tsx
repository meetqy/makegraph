'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { boxContainerClassName } from '~/lib/layout';

export function GlobalHeader() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate progress between 0 and 100px of scroll
      const progress = Math.min(Math.max(window.scrollY / 100, 0), 1);
      setScrollProgress(progress);
    };

    handleScroll(); // Check initial scroll position
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: `rgba(255, 255, 255, ${scrollProgress * 0.88})`,
        borderBottom: `1px solid rgba(235, 235, 235, ${scrollProgress})`,
        backdropFilter: `blur(${scrollProgress * 12}px)`,
        WebkitBackdropFilter: `blur(${scrollProgress * 12}px)`,
      }}
    >
      <div
        className={`${boxContainerClassName} flex h-16 items-center justify-between`}
      >
        <div className="flex items-center gap-6">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/logo.png"
              alt="MakeGraph"
              width={48}
              height={48}
              priority
            />
            <span className="text-xl ml-2 font-mono lowercase">
              <span>Make</span>
              <span className="text-blue-600">Graph</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/#charts"
              className="rounded-full px-3 py-2 text-sm text-[#4d4d4d] transition-colors hover:bg-[#f5f5f5] hover:text-[#171717]"
            >
              Charts
            </Link>
            <Link
              href="/templates"
              className="rounded-full px-3 py-2 text-sm text-[#4d4d4d] transition-colors hover:bg-[#f5f5f5] hover:text-[#171717]"
            >
              Templates
            </Link>
            <Link
              href="/pricing"
              className="rounded-full px-3 py-2 text-sm text-[#4d4d4d] transition-colors hover:bg-[#f5f5f5] hover:text-[#171717]"
            >
              Pricing
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="secondary" size="sm" className="h-7 px-3">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild variant="default" size="sm" className="h-7 px-3">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
