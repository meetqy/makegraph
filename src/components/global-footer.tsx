import Link from 'next/link';

import { chartTypeItems } from '~/config/charts';
import { boxContainerClassName } from '~/lib/layout';

// 友情链接配置列表（支持直接传入 HTML 代码）
export const friendLinks: string[] = [
  '<a href="https://twelve.tools" target="_blank"><img src="https://twelve.tools/badge3-light.svg" alt="Featured on Twelve Tools" width="200" height="54"></a>',
  `<a href="https://starterbest.com" target="_blank" rel="noopener noreferrer"><img src="https://starterbest.com/badages-awards.svg" alt="Featured on Starter Best" style="height: 54px; width: auto;"/></a>`,
  `<a href="https://submitaitools.org" target="_blank" ><img src="https://submitaitools.org/static_submitaitools/images/submitaitools.png" alt="Submit AI Tools" style="border-radius: 10px; width: 200px; height: 60px;" /></a>`,
  `<a href="https://navfolders.com" target="_blank"><img src="https://navfolders.com/badge/nav_light.svg" alt="NavFolders" width="200" height="54" /></a>`,
  `<a href="https://showmebest.ai" target="_blank"><img src="https://showmebest.ai/badge/feature-badge-white.webp" alt="Featured on ShowMeBestAI" width="220" height="60"></a>`,
];

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

        <div className="flex flex-col border-[#ebebeb] border-t pt-6 pb-6 md:flex-row md:items-center md:justify-between xl:pb-8">
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

        {friendLinks.length > 0 && (
          <div className="border-[#ebebeb] border-t pt-4 pb-8 flex flex-col md:flex-row md:items-center gap-4">
            <ul className="flex flex-wrap items-center gap-4 text-xs text-[#888888] [&_a]:transition-colors hover:[&_a]:text-[#171717]">
              {friendLinks.map((html, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: html }} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </footer>
  );
}
