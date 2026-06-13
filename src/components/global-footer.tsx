import { useTranslations } from 'next-intl';
import { Button } from '~/components/ui/button';
import { Link } from '~/i18n/routing';

import { chartTypeItems, type ChartTypeItem } from '~/config/charts';
import { GithubIcon } from './icons';

// 友情链接配置列表（支持直接传入 HTML 代码）
export const friendLinks: string[] = [
  '<a href="https://twelve.tools" target="_blank"><img src="https://twelve.tools/badge3-light.svg" alt="Featured on Twelve Tools" width="200" height="54"></a>',
  `<a href="https://starterbest.com" target="_blank" rel="noopener noreferrer"><img src="https://starterbest.com/badages-awards.svg" alt="Featured on Starter Best" style="height: 54px; width: auto;"/></a>`,
  `<a href="https://submitaitools.org" target="_blank" ><img src="https://submitaitools.org/static_submitaitools/images/submitaitools.png" alt="Submit AI Tools" style="border-radius: 10px; width: 200px; height: 60px;" /></a>`,
  `<a href="https://navfolders.com" target="_blank"><img src="https://navfolders.com/badge/nav_light.svg" alt="NavFolders" width="200" height="54" /></a>`,
  `<a href="https://showmebest.ai" target="_blank"><img src="https://showmebest.ai/badge/feature-badge-white.webp" alt="Featured on ShowMeBestAI" width="220" height="60"></a>`,
  `<a href="https://www.tooluck.org/item/makegraph" target="_blank" rel="noopener noreferrer"><img src="https://www.tooluck.org/badges/tooluck-badge-light.svg" alt="Featured on Tooluck.org" width="210" height="55" /></a>`,
  `<a href="https://startupfa.st" target="_blank" title="Powered by Startup Fast"><img src="https://startupfa.st/images/badges/powered-by-light.svg" alt="Powered by Startup Fast" width="150" height="44"/></a>`,
  `<a href="https://huntifyai.com/tools/makegraph" target="_blank" rel="noopener noreferrer"><img src="https://huntifyai.com/api/badge?theme=light" alt="Featured on HuntifyAI" width="220" height="54" /></a>`,
  `<a href="https://aitoolfame.com/item/makegraph" target="_blank" rel="noopener noreferrer"><img src="https://aitoolfame.com/badge-light.svg" alt="Featured on aitoolfame.com" style="height: 54px; width: auto;" /></a>`,
  `<a href="https://domainrank.app" target="_blank"><img src="https://domainrank.app/api/badge/makegraph.org" alt="makegraph.org Domain Rating" width="360" height="80" /></a>`,
  `<a href="https://www.direct2app.com" target="_blank" rel="noopener"><img src="https://www.direct2app.com/featured-light.svg" alt="Featured On Direct2App" style="height: 54px; width: auto;" /></a>`,
  `<a href="https://findly.tools/make-graph?utm_source=make-graph" target="_blank" rel="noopener noreferrer"><img src="https://findly.tools/badges/findly-tools-badge-light.svg" alt="Featured on Findly.tools" width="175" height="55" /></a>`,
  `<a href="https://fwfw.app/item/makegraph" target="_blank"><img src="https://fwfw.app/badge-white.svg" width="250" height="54" alt="Featured on FWFW" /></a>`,
  `<a href="https://mydirs.com" target="_blank"><img src="https://mydirs.com/badges/light.svg" alt="Featured on Mydirs" width="200" height="54"></a>`,
  `<a href="https://newtool.site/item/makegraph" target="_blank" rel="noopener noreferrer"><img src="https://newtool.site/badges/newtool-light.svg" alt="Featured on NewTool.site" height = "54px" width = "auto" /></a>`,
  `<a href="https://saasfame.com/item/makegraph" target="_blank" rel="noopener noreferrer"><img src="https://saasfame.com/badge-light.svg" alt="Featured on saasfame.com" style="height: 54px; width: auto;" /></a>`,
  `<a href="https://saastool.site/item/makegraph" target="_blank" rel="noopener noreferrer"><img src="https://saastool.site/badges/saastool-light.svg" alt="Featured on SaaSTool.site" height = "54px" width = "auto" /></a>`,
  `<a href="https://toolfame.com/item/makegraph" target="_blank" rel="noopener noreferrer"><img src="https://toolfame.com/badge-light.svg" alt="Featured on toolfame.com" style="height: 54px; width: auto;" /></a>`,
  `<a href="https://turbo0.com/item/makegraph" target="_blank" rel="noopener noreferrer"><img src="https://img.turbo0.com/badge-listed-light.svg" alt="Listed on Turbo0" style="height: 54px; width: auto;" /></a>`,
  `<a href="https://drchecker.net/item/makegraph.org" target="_blank" rel="noopener noreferrer"> <img src="https://drchecker.net/api/badge?domain=makegraph.org" alt="Monitor your Domain Rating with DRChecker " style="height: 54px; width: auto;"/></a>`,
  `<a href="https://agentwork.tools" target="_blank"><img src="https://agentwork.tools/badge/badge_light.svg" alt="Featured on AgentWork.Tools" width="200" height="54" /></a>`,
  `<a href="https://fazier.com/launches/makegraph.org" target="_blank"><img src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=featured&theme=light" width=250 alt="Fazier badge" /></a>`,
];

function FooterChartLink({ item }: { item: ChartTypeItem }) {
  const nameMatch = item.href.match(/\/charts\/(.+)/);
  const translationKey = nameMatch?.[1]
    ? nameMatch[1]
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
    : 'LineChart';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itemT = useTranslations(translationKey as any);

  return (
    <li>
      <Link
        href={item.href}
        className="text-sm text-[#888888] hover:text-[#171717] transition-colors"
      >
        {itemT('heroEyebrow')}
      </Link>
    </li>
  );
}

export function GlobalFooter() {
  const t = useTranslations('Footer');
  const friendLinkListClassName =
    'flex w-max shrink-0 items-center pr-2 gap-2 text-xs text-[#888888] [&_a]:inline-flex [&_a]:shrink-0 [&_a]:items-center [&_a]:transition-colors hover:[&_a]:text-[#171717] [&_img]:block [&_img]:shrink-0 [&_img]:!h-9 [&_img]:!w-auto [&_img]:max-w-none [&_li]:shrink-0';

  return (
    <footer className="border-t border-[#ebebeb] bg-white text-[#4d4d4d]">
      <div className={`container-box pt-8 xl:pt-10`}>
        <div className="mb-8">
          <Link
            href="/"
            className="font-mono text-[#171717] text-sm uppercase tracking-[0.12em]"
          >
            MakeGraph
          </Link>
          <div className="mt-3 flex items-start justify-between gap-3">
            <p className="max-w-2xl text-[#888888] text-sm leading-6">
              {t('description')}
            </p>
            <Button
              asChild
              variant="ghost"
              size="icon-sm"
              className="shrink-0 rounded-full text-[#888888] hover:bg-[#f5f5f5] hover:text-[#171717]"
            >
              <a
                href="https://github.com/meetqy/makegraph"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('github')}
                title={t('github')}
              >
                <GithubIcon className="size-6" />
              </a>
            </Button>
          </div>
        </div>

        <div className="border-t py-4">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {chartTypeItems.map((item) => (
              <FooterChartLink key={item.name} item={item} />
            ))}
          </ul>
        </div>

        <div className="flex flex-col border-[#ebebeb] border-t py-4 md:flex-row md:items-center md:justify-between xl:pb-6">
          <p className="text-[#888888] text-xs leading-5">
            &copy; {new Date().getFullYear()} MakeGraph. All rights reserved.
          </p>
          <ul className="mt-2 flex flex-wrap items-center gap-6 md:mt-0">
            <li>
              <Link
                href="/privacy-policy"
                className="text-xs text-[#888888] hover:text-[#171717] transition-colors"
              >
                {t('privacyPolicy')}
              </Link>
            </li>
            <li>
              <Link
                href="/terms-of-service"
                className="text-xs text-[#888888] hover:text-[#171717] transition-colors"
              >
                {t('termsOfService')}
              </Link>
            </li>
          </ul>
        </div>

        {friendLinks.length > 0 && (
          <div className="group overflow-hidden border-t border-[#ebebeb] py-4">
            <div className="flex w-max shrink-0 animate-marquee items-center whitespace-nowrap group-hover:paused">
              <ul className={friendLinkListClassName}>
                {friendLinks.map((html, index) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: html }} />
                ))}
              </ul>
              <ul className={friendLinkListClassName} aria-hidden="true">
                {friendLinks.map((html, index) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: html }} />
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
