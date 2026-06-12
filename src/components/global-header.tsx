'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Link, usePathname, useRouter } from '~/i18n/routing';
import { Button } from '~/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useTranslations, useLocale } from 'next-intl';

export function GlobalHeader() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const t = useTranslations('Header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

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

  const handleLocaleChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

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
      <div className={`container-box flex h-16 items-center justify-between`}>
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
        </div>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/#charts"
              className="rounded-full px-3 py-2 text-sm text-[#4d4d4d] transition-colors hover:bg-[#f5f5f5] hover:text-[#171717]"
            >
              {t('charts')}
            </Link>
            <Link
              href="/templates"
              className="rounded-full px-3 py-2 text-sm text-[#4d4d4d] transition-colors hover:bg-[#f5f5f5] hover:text-[#171717]"
            >
              {t('templates')}
            </Link>
            {locale === 'en' && (
              <Link
                href="/blogs"
                className="rounded-full px-3 py-2 text-sm text-[#4d4d4d] transition-colors hover:bg-[#f5f5f5] hover:text-[#171717]"
              >
                {t('blogs')}
              </Link>
            )}
          </nav>
          <div className="flex items-center gap-2">
            <Select value={locale} onValueChange={handleLocaleChange}>
              <SelectTrigger className="h-8 border-none bg-transparent shadow-none hover:bg-[#f5f5f5] text-[#4d4d4d] focus:ring-0">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="hidden items-center gap-2">
            <Button asChild variant="secondary" size="sm" className="h-7 px-3">
              <Link href="/login">{t('login')}</Link>
            </Button>
            <Button asChild variant="default" size="sm" className="h-7 px-3">
              <Link href="/signup">{t('signup')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
