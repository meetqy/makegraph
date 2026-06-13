'use client';

import { useState, type RefObject } from 'react';
import { Download } from 'lucide-react';
import { domToPng } from 'modern-screenshot';

import { Button } from '~/components/ui/button';

type ChartExporterProps = {
  /**
   * 图表内容容器的 ref。导出会序列化该容器的 DOM 并以 PNG 形式下载。
   */
  targetRef: RefObject<HTMLElement | null>;
  /** 下载文件名前缀（不含扩展名） */
  filename?: string;
  exportLabel?: string;
  exportingLabel?: string;
  exportAriaLabel?: string;
  missingContainerError?: string;
  exportFailedError?: string;
};

// 通用文件下载辅助
function triggerDownload(href: string, filename: string) {
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

// 用 modern-screenshot 导出 PNG（光栅化）
async function exportPng(container: HTMLElement, filename: string) {
  const dataUrl = await domToPng(container, {
    scale: 2,
    backgroundColor: '#ffffff',
  });
  triggerDownload(dataUrl, `${filename}.png`);
}

export function ChartExporter({
  targetRef,
  filename = 'chart',
  exportLabel = 'Export',
  exportingLabel = 'Exporting...',
  exportAriaLabel = 'Export chart as PNG',
  missingContainerError = 'Chart container not found.',
  exportFailedError = 'Export failed.',
}: ChartExporterProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    const target = targetRef.current;
    if (!target) {
      setError(missingContainerError);
      return;
    }
    setIsExporting(true);
    setError(null);
    try {
      await exportPng(target, filename);
    } catch (err) {
      setError(err instanceof Error ? err.message : exportFailedError);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleClick}
      disabled={isExporting}
      className="h-8 shadow-none border-[#ebebeb]"
      aria-label={error ?? exportAriaLabel}
    >
      <Download className="mr-2 size-3.5" />
      {isExporting ? exportingLabel : exportLabel}
    </Button>
  );
}
