import { env } from '~/env';

// 站点全局基础配置：域名规范以 AGENTS.md 第 6 节为准，统一使用 makegraph.org
export const siteUrl = env.NEXT_PUBLIC_SITE_URL;
export const siteName = 'MakeGraph';
export const siteDescription =
  'Upload or paste your spreadsheet, generate bar charts, line charts, and pie charts in 1 minute, then export PNG or SVG instantly. No signup, no registration, completely free.';
export const googleAnalyticsId = env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? '';
