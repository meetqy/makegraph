export type ChartDataRow = {
  time: string;
  name: string;
  value: number;
};

export type ChartSettings = {
  title: string;
  seriesLabel: string;
  topCount: number;
  playbackMs: number;
  showGrid: boolean;
  showValues: boolean;
  loop: boolean;
};

// 名称到颜色的映射：用于在右侧让用户为每个柱状条目单独调整颜色
export type CategoryColorMap = Record<string, string>;

export type CategoryColorEntry = {
  name: string;
  color: string;
};
