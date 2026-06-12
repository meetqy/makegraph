// 提供 /llms.txt：给大模型抓取用的站点索引（llmstxt.org 规范）
// 站点主要产品为在线图表工具，按 chart 类型聚合链接，便于 LLM 一次性获取完整结构

import { siteDescription, siteName, siteUrl } from '~/lib/site';

const llmsBody = `# ${siteName}

> ${siteDescription}

MakeGraph is a free online chart maker that turns spreadsheet data into clear, presentation-ready charts in about a minute. No signup is required for the core experience.

## Charts (English)

- [Line Chart Maker](${siteUrl}/charts/line-chart): Plot trends over time, customize labels and colors, and preview results instantly for reports and presentations.
- [Bar Chart Maker](${siteUrl}/charts/bar-chart): Compare values across categories. Edit data in a built-in table, customize labels, colors, legend, and grid, and export as PNG.
- [Bar Chart Race Maker](${siteUrl}/charts/bar-chart-race): Animate rankings over time, edit time-series data, and preview smooth race playback instantly.
- [Double Bar Chart Maker](${siteUrl}/charts/double-bar-chart): Place two data series side by side within each category. Useful for year-over-year, plan vs actual, or A/B comparisons.
- [Stacked Bar Chart Maker](${siteUrl}/charts/stacked-bar-chart): Show both the total and the parts of that total in a single view. Supports 100% stacked mode to focus on share instead of absolute values.
- [Radar Chart Maker](${siteUrl}/charts/radar-chart): Compare strengths across multiple dimensions, customize labels and colors, and preview the radar shape instantly.

## Charts (中文)

- [折线图制作工具](${siteUrl}/zh/charts/line-chart)
- [柱状图制作工具](${siteUrl}/zh/charts/bar-chart)
- [动态排序柱状图制作工具](${siteUrl}/zh/charts/bar-chart-race)
- [双柱状图制作工具](${siteUrl}/zh/charts/double-bar-chart)
- [堆叠柱状图制作工具](${siteUrl}/zh/charts/stacked-bar-chart)
- [雷达图制作工具](${siteUrl}/zh/charts/radar-chart)

## Pages

- [Home (English)](${siteUrl}/): Landing page that lists every available chart maker.
- [首页 (中文)](${siteUrl}/zh/): 首页。
- [Privacy Policy](${siteUrl}/privacy-policy)
- [隐私政策](${siteUrl}/zh/privacy-policy)
- [Terms of Service](${siteUrl}/terms-of-service)
- [服务条款](${siteUrl}/zh/terms-of-service)
- [Templates](${siteUrl}/templates)
- [模板](${siteUrl}/zh/templates)

## Blogs

- [Budget vs. Actual Spending Across Departments](${siteUrl}/blogs/budget-vs-actual-spending-across-departments)

## Contact

- Email: support@makegraph.org
- Domain: ${(siteUrl || '').replace('https://', '')}
`;

export function GET() {
  return new Response(llmsBody, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
