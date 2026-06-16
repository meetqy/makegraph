import type { MetadataRoute } from 'next';

import { siteUrl } from '~/lib/site';

// 自动生成 /robots.txt：声明爬虫规则并指向站点 sitemap
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
