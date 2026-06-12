import Image from 'next/image';
import { Link } from '~/i18n/routing';
import type { LucideIcon } from 'lucide-react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

export type CardListItem = {
  title: string;
  description: string;
  href: string;
  image?: string;
  icon?: LucideIcon;
  meta?: string;
};

type ChartListProps = {
  items: CardListItem[];
  className?: string;
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function ChartList({
  items,
  className,
  id,
  eyebrow,
  title,
  description,
}: ChartListProps) {
  return (
    <section id={id} className={className}>
      {(eyebrow || title || description) && (
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="mt-4 text-balance font-semibold text-3xl tracking-[-0.96px] text-[#171717] sm:text-4xl sm:tracking-[-1.28px]">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#4d4d4d] sm:text-[18px] sm:leading-[28px]">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="grid gap-3 pt-6 sm:grid-cols-2 lg:pt-8 xl:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex outline-none"
          >
            <Card className="flex h-full w-full flex-col gap-0 overflow-hidden border-[#ebebeb] p-0 shadow-none transition-colors group-hover:bg-[#fafafa] group-focus-visible:ring-2 group-focus-visible:ring-[#171717]">
              {item.image && (
                <div className="relative aspect-2/1 w-full shrink-0 overflow-hidden border-b border-[#ebebeb] bg-[#fafafa]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <CardHeader className="flex-1 gap-1 p-3">
                {item.meta && (
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
                    {item.meta}
                  </p>
                )}
                <CardTitle className="text-base text-[#171717]">
                  <span className="truncate">{item.title}</span>
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm leading-snug text-[#4d4d4d]">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
