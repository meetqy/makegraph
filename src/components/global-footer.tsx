import Link from 'next/link';

import { chartTypeItems } from '~/config/charts';

export function GlobalFooter() {
  return (
    <footer className="border-t border-[#ebebeb] bg-white text-[#4d4d4d]">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 xl:py-16">
        <div className="mb-12 max-w-2xl">
          <Link
            href="/"
            className="font-mono text-[#171717] text-sm uppercase tracking-[0.12em]"
          >
            NekoChart
          </Link>
          <p className="mt-4 text-[#888888] text-sm leading-6">
            A fast online chart maker. Upload your data, get automatic chart
            suggestions, and export PNG or SVG instantly, free with no signup.
          </p>
        </div>

        <div className="mb-16">
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

        <div className="flex flex-col border-[#ebebeb] border-t pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[#888888] text-xs leading-5">
            &copy; {new Date().getFullYear()} NekoChart. All rights reserved.
          </p>
          <ul className="mt-4 flex flex-wrap items-center gap-6 md:mt-0">
            <li>
              <Link
                href="#"
                className="text-xs text-[#888888] hover:text-[#171717] transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="#"
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
