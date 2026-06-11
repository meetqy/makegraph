import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import type { ReactNode } from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateChartTitle(chartName: string) {
  return `Free Online ${chartName} Maker | MakeGraph`;
}

// 已支持的统计图名称到对应页面的映射。
// 顺序很重要：更具体的短语必须放在更通用的短语之前，确保长匹配优先。
const CHART_LINK_PATTERNS: Array<[RegExp, string]> = [
  [/100% stacked bar chart/gi, '/charts/stacked-bar-chart'],
  [/stacked bar chart/gi, '/charts/stacked-bar-chart'],
  [/double bar chart/gi, '/charts/double-bar-chart'],
  [/line chart/gi, '/charts/line-chart'],
  [/bar chart race/gi, '/charts/bar-chart-race'],
  [/regular bar chart/gi, '/charts/bar-chart'],
  [/bar chart/gi, '/charts/bar-chart'],
];

// 页面内联快捷链接的统一样式
const chartLinkClassName =
  'text-[#171717] underline underline-offset-4 decoration-[#a3a3a3] hover:decoration-[#171717]';

/**
 * 在一段文本中识别已支持的统计图名称，并将其转换为指向对应图表页面的快捷链接。
 *
 * - 仅处理项目内已实现的图表，其他未实现的图表名称（如 pie chart）保持纯文本。
 * - 通过 currentPath 避免在当前页面链接到自身。
 * - 长匹配优先：例如 "stacked bar chart" 不会被拆成 "stacked" + "bar chart" 两个独立链接。
 */
export function withChartLinks(
  text: string,
  keyPrefix: string,
  currentPath?: string
): ReactNode {
  // 收集所有命中的位置信息
  const matches: Array<{
    start: number;
    end: number;
    href: string;
    matched: string;
  }> = [];
  for (const [pattern, href] of CHART_LINK_PATTERNS) {
    const flags = pattern.flags.includes('g')
      ? pattern.flags
      : `${pattern.flags}g`;
    const regex = new RegExp(pattern.source, flags);
    let m: RegExpExecArray | null = regex.exec(text);
    while (m !== null) {
      if (m[0].length === 0) {
        regex.lastIndex += 1;
        m = regex.exec(text);
        continue;
      }
      matches.push({
        start: m.index,
        end: m.index + m[0].length,
        href,
        matched: m[0],
      });
      m = regex.exec(text);
    }
  }

  // 起始位置升序；同位置时长匹配优先
  matches.sort((a, b) => a.start - b.start || b.end - a.end);

  // 过滤重叠的命中区间
  const filtered: typeof matches = [];
  let lastEnd = -1;
  for (const match of matches) {
    if (match.start >= lastEnd) {
      filtered.push(match);
      lastEnd = match.end;
    }
  }

  const parts: ReactNode[] = [];
  let cursor = 0;
  let linkKey = 0;
  for (const match of filtered) {
    if (match.start > cursor) {
      parts.push(text.slice(cursor, match.start));
    }
    // 命中当前页路径时退化为纯文本，避免出现指向自身的链接
    if (currentPath && match.href === currentPath) {
      parts.push(match.matched);
    } else {
      const key = `${keyPrefix}-link-${linkKey}`;
      linkKey += 1;
      parts.push(
        <Link key={key} href={match.href} className={chartLinkClassName}>
          {match.matched}
        </Link>
      );
    }
    cursor = match.end;
  }
  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }
  return <>{parts}</>;
}
