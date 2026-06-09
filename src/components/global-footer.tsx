import Link from 'next/link';

import { chartTypeItems } from '~/config/charts';
import { boxContainerClassName } from '~/lib/layout';

export function GlobalFooter() {
  return (
    <footer className="border-t border-[#ebebeb] bg-white text-[#4d4d4d]">
      <div className={`${boxContainerClassName} pt-10 xl:pt-12`}>
        <div className="mb-10 max-w-2xl">
          <Link
            href="/"
            className="font-mono text-[#171717] text-sm uppercase tracking-[0.12em]"
          >
            MakeGraph
          </Link>
          <p className="mt-4 text-[#888888] text-sm leading-6">
            A fast online chart maker. Upload your data, get automatic chart
            suggestions, and export as PNG instantly, free with no signup.
          </p>
        </div>

        <div className="mb-12">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-4">
            {chartTypeItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm text-[#888888] hover:text-[#171717] transition-colors"
                >
                  {item.name} Maker
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col border-[#ebebeb] border-t pt-6 pb-1 md:flex-row md:items-center md:justify-between md:pb-6 xl:pb-8">
          <p className="text-[#888888] text-xs leading-5">
            &copy; {new Date().getFullYear()} MakeGraph. All rights reserved.
          </p>
          <ul className="mt-3 flex flex-wrap items-center gap-6 md:mt-0">
            <li>
              <Link
                href="/privacy-policy"
                className="text-xs text-[#888888] hover:text-[#171717] transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-of-service"
                className="text-xs text-[#888888] hover:text-[#171717] transition-colors"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
