import { env } from '~/env';

// 站点全局基础配置：域名规范以 AGENTS.md 第 6 节为准，统一使用 makegraph.org
export const siteUrl = env.NEXT_PUBLIC_SITE_URL;
export const siteName = 'MakeGraph';
export const siteDescription =
  'Turn your Excel or CSV data into clear charts in 1 minute. Free online chart maker.';
export const googleAnalyticsId = env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? '';
