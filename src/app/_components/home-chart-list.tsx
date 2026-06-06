import Link from 'next/link';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { chartTypeItems } from '~/config/charts';

type HomeChartListProps = {
  className: string;
};

export function HomeChartList({ className }: HomeChartListProps) {
  return (
    <section className={`${className} pb-24 lg:pb-28`}>
      <div className="grid gap-4 pt-6 sm:grid-cols-2 lg:pt-8 xl:grid-cols-3">
        {chartTypeItems.map((item) => (
          <Link key={item.name} href={item.href} className="group outline-none">
            <Card className="h-full border-[#ebebeb] shadow-none transition-colors group-hover:bg-[#fafafa] group-focus-visible:ring-2 group-focus-visible:ring-[#171717]">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-base text-[#171717]">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-[#fafafa] text-[#171717] ring-1 ring-[#ebebeb]">
                    <item.icon className="size-4" />
                  </span>
                  <span>{item.name}</span>
                </CardTitle>
                <CardDescription className="text-sm text-[#4d4d4d]">
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
