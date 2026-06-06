import Link from 'next/link';

import { chartTypeItems } from '~/config/charts';

export function GlobalFooter() {
  return (
    <footer className="border-t border-[#ebebeb] bg-white text-[#4d4d4d]">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 xl:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link
              href="/"
              className="font-mono text-[#171717] text-sm uppercase tracking-[0.12em]"
            >
              NekoChart
            </Link>
            <p className="text-[#888888] text-sm leading-6">
              A fast online chart maker. Upload your data, get automatic chart
              suggestions, and export PNG or SVG instantly, free with no signup.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="font-medium text-[#171717] text-sm">Use Cases</h3>
              <ul className="mt-6 space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-sm leading-6 hover:text-[#171717]"
                  >
                    Weekly Reports
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm leading-6 hover:text-[#171717]"
                  >
                    Presentations
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm leading-6 hover:text-[#171717]"
                  >
                    Social Media
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-[#171717] text-sm">Resources</h3>
              <ul className="mt-6 space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-sm leading-6 hover:text-[#171717]"
                  >
                    Templates
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm leading-6 hover:text-[#171717]"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm leading-6 hover:text-[#171717]"
                  >
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-[#171717] text-sm">Legal</h3>
              <ul className="mt-6 space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-sm leading-6 hover:text-[#171717]"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm leading-6 hover:text-[#171717]"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 border-[#ebebeb] border-t pt-8 sm:mt-20 lg:mt-24">
          <div className="mb-8">
            <h3 className="font-medium text-[#171717] text-sm mb-4">
              Chart Makers (Tools)
            </h3>
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border-[#ebebeb] border-t pt-8">
            <p className="text-[#888888] text-xs leading-5 relative">
              &copy; {new Date().getFullYear()} NekoChart. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
