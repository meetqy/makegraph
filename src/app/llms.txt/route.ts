// 提供 /llms.txt：给大模型抓取用的站点索引（llmstxt.org 规范）
// 站点主要产品为在线图表工具，按 chart 类型聚合链接，便于 LLM 一次性获取完整结构

import { siteDescription, siteName, siteUrl } from '~/lib/site';

const llmsBody = `# ${siteName}

> ${siteDescription}

MakeGraph is a free online chart maker that turns spreadsheet data into clear, presentation-ready charts in about a minute. No signup is required for the core experience.

## Charts

- [Bar Chart Maker](${siteUrl}/charts/bar-chart): Compare values across categories. Edit data in a built-in table, customize labels, colors, legend, and grid, and export PNG or SVG.
- [Double Bar Chart Maker](${siteUrl}/charts/double-bar-chart): Place two data series side by side within each category. Useful for year-over-year, plan vs actual, or A/B comparisons.
- [Stacked Bar Chart Maker](${siteUrl}/charts/stacked-bar-chart): Show both the total and the parts of that total in a single view. Supports 100% stacked mode to focus on share instead of absolute values.

## Pages

- [Home](${siteUrl}/): Landing page that lists every available chart maker.
- [Privacy Policy](${siteUrl}/privacy-policy): How MakeGraph collects, uses, and protects information.
- [Terms of Service](${siteUrl}/terms-of-service): The rules and conditions for using MakeGraph.

## Contact

- Email: support@makegraph.org
- Domain: ${siteUrl.replace('https://', '')}
`;

export function GET() {
  return new Response(llmsBody, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
