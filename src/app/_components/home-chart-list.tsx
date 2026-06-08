import Link from 'next/link';
import Image from 'next/image';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from '~/components/ui/card';
import { chartTypeItems } from '~/config/charts';

type HomeChartListProps = {
  className: string;
};

export function HomeChartList({ className }: HomeChartListProps) {
  return (
    <section id="charts" className={`${className} pb-24 lg:pb-28`}>
      <div className="grid gap-3 pt-6 sm:grid-cols-2 lg:pt-8 xl:grid-cols-3">
        {chartTypeItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group outline-none flex"
          >
            <Card className="flex flex-col w-full h-full overflow-hidden border-[#ebebeb] shadow-none transition-colors group-hover:bg-[#fafafa] group-focus-visible:ring-2 group-focus-visible:ring-[#171717] p-0 gap-0">
              {item.image && (
                <div className="w-full aspect-[2/1] border-b border-[#ebebeb] bg-[#fafafa] overflow-hidden relative shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <CardHeader className="flex-1 p-3 gap-1">
                <CardTitle className="flex items-center gap-2.5 text-base text-[#171717]">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-[#fafafa] text-[#171717] ring-1 ring-[#ebebeb]">
                    <item.icon className="size-3.5" />
                  </span>
                  <span>{item.name}</span>
                </CardTitle>
                <CardDescription className="text-sm text-[#4d4d4d] leading-snug line-clamp-2">
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
