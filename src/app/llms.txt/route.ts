// 提供 /llms.txt：给大模型抓取用的站点索引（llmstxt.org 规范）
// 站点主要产品为在线图表工具，按 chart 类型聚合链接，便于 LLM 一次性获取完整结构

import { siteDescription, siteName, siteUrl } from '~/lib/site';

const llmsBody = `# ${siteName}

> ${siteDescription}

MakeGraph is a free online chart maker for Excel and CSV data. Users can upload or paste a spreadsheet, generate bar charts, line charts, and pie charts in about a minute, then export PNG or SVG instantly. No signup or registration is required.

## Charts (English)

- [Line Chart Maker](${siteUrl}/charts/line-chart): Plot trends over time, customize labels and colors, and preview results instantly for reports and presentations.
- [Correlation Matrix Maker](${siteUrl}/charts/correlation-matrix-chart): Build a correlation matrix heatmap, compare positive and negative relationships across metrics, and preview the strength of each pair instantly.
- [Marimekko Chart Maker](${siteUrl}/charts/marimekko-chart): Show category share and subcategory composition with variable-width stacked columns, customize labels and colors, and preview the layout instantly.
- [Tree Map Chart Maker](${siteUrl}/charts/tree-map-chart): Compare part-to-whole values with nested rectangles, adjust labels and color, and preview the treemap layout instantly.
- [Sunburst Chart Maker](${siteUrl}/charts/sunburst-chart): Visualize hierarchical part-to-whole data with concentric rings, customize labels and colors, and preview the structure instantly.
- [Bar Chart Maker](${siteUrl}/charts/bar-chart): Compare values across categories. Edit data in a built-in table, customize labels, colors, legend, and grid, and export as PNG.
- [Bar Chart Race Maker](${siteUrl}/charts/bar-chart-race): Animate rankings over time, edit time-series data, and preview smooth race playback instantly.
- [Double Bar Chart Maker](${siteUrl}/charts/double-bar-chart): Place two data series side by side within each category. Useful for year-over-year, plan vs actual, or A/B comparisons.
- [Stacked Bar Chart Maker](${siteUrl}/charts/stacked-bar-chart): Show both the total and the parts of that total in a single view. Supports 100% stacked mode to focus on share instead of absolute values.
- [Radar Chart Maker](${siteUrl}/charts/radar-chart): Compare strengths across multiple dimensions, customize labels and colors, and preview the radar shape instantly.
- [Waterfall Bar Chart Maker](${siteUrl}/charts/waterfall-bar-chart): Explain how positive and negative changes accumulate into a final total. Useful for budget bridges, variance analysis, and KPI walk charts.
- [Negative Bar Chart Maker](${siteUrl}/charts/negative-bar-chart): Display positive and negative values across categories. Useful for profit/loss, surplus/deficit, or sentiment analysis.

## Charts (中文)

- [折线图制作工具](${siteUrl}/zh/charts/line-chart)
- [相关矩阵制作工具](${siteUrl}/zh/charts/correlation-matrix-chart)
- [马里梅科图制作工具](${siteUrl}/zh/charts/marimekko-chart)
- [矩形树图生成器](${siteUrl}/zh/charts/tree-map-chart)
- [旭日图生成器](${siteUrl}/zh/charts/sunburst-chart)
- [柱状图制作工具](${siteUrl}/zh/charts/bar-chart)
- [动态排序柱状图制作工具](${siteUrl}/zh/charts/bar-chart-race)
- [双柱状图制作工具](${siteUrl}/zh/charts/double-bar-chart)
- [堆叠柱状图制作工具](${siteUrl}/zh/charts/stacked-bar-chart)
- [雷达图制作工具](${siteUrl}/zh/charts/radar-chart)
- [瀑布柱状图制作工具](${siteUrl}/zh/charts/waterfall-bar-chart)
- [交错正负轴标签柱状图制作工具](${siteUrl}/zh/charts/negative-bar-chart)

## Pages

- [Home (English)](${siteUrl}/): Free online chart maker for Excel and CSV data. Upload or paste a spreadsheet, generate charts in about a minute, and export PNG or SVG.
- [首页 (中文)](${siteUrl}/zh/): 适用于 Excel 和 CSV 数据的免费在线图表制作工具，支持上传或粘贴电子表格并导出 PNG 或 SVG。
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
