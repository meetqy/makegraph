import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateChartTitle(chartName: string) {
  return `Make a ${chartName} graph | Create a ${chartName} chart for free.`;
}
