import type { MetadataRoute } from 'next';

import { siteUrl } from '~/lib/site';
import { routing } from '~/i18n/routing';

function getI18nAlternates(path: string) {
  const languages: Record<string, string> = {};

  routing.locales.forEach((locale) => {
    if (
      locale === routing.defaultLocale &&
      routing.localePrefix === 'as-needed'
    ) {
      languages[locale] = `${siteUrl || ''}${path}`;
    } else {
      languages[locale] = `${siteUrl || ''}/${locale}${path}`;
    }
  });

  return languages;
}

// 自动生成 /sitemap.xml：枚举所有可被索引的公开页面
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: getI18nAlternates(''),
      },
    },
    {
      url: `${siteUrl}/charts/line-chart`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: getI18nAlternates('/charts/line-chart'),
      },
    },
    {
      url: `${siteUrl}/charts/tree-map-chart`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: getI18nAlternates('/charts/tree-map-chart'),
      },
    },
    {
      url: `${siteUrl}/charts/sunburst-chart`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: getI18nAlternates('/charts/sunburst-chart'),
      },
    },
    {
      url: `${siteUrl}/charts/bar-chart`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: getI18nAlternates('/charts/bar-chart'),
      },
    },
    {
      url: `${siteUrl}/charts/bar-chart-race`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: getI18nAlternates('/charts/bar-chart-race'),
      },
    },
    {
      url: `${siteUrl}/charts/double-bar-chart`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: getI18nAlternates('/charts/double-bar-chart'),
      },
    },
    {
      url: `${siteUrl}/charts/stacked-bar-chart`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: getI18nAlternates('/charts/stacked-bar-chart'),
      },
    },
    {
      url: `${siteUrl}/charts/radar-chart`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: getI18nAlternates('/charts/radar-chart'),
      },
    },
    {
      url: `${siteUrl}/charts/waterfall-bar-chart`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: getI18nAlternates('/charts/waterfall-bar-chart'),
      },
    },
    {
      url: `${siteUrl}/charts/negative-bar-chart`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: getI18nAlternates('/charts/negative-bar-chart'),
      },
    },
    {
      url: `${siteUrl}/templates`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: getI18nAlternates('/templates'),
      },
    },
    {
      url: `${siteUrl}/templates/capcom-game-series-sales`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: getI18nAlternates('/templates/capcom-game-series-sales'),
      },
    },
    // blogs 只有英文，不需要 i18n alternates
    {
      url: `${siteUrl}/blogs/budget-vs-actual-spending-across-departments`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: getI18nAlternates('/privacy-policy'),
      },
    },
    {
      url: `${siteUrl}/terms-of-service`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: getI18nAlternates('/terms-of-service'),
      },
    },
  ];
}
