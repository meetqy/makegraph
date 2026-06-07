'use client';

import { useEffect, useState } from 'react';

type HeroBackgroundProps = {
  gridWidth?: number;
  gridHeight?: number;
  bleedTop?: boolean;
};

type HeroBlockState = {
  color: string;
  opacity: number;
};

const heroBlockPalette = [
  '#fafafa',
  '#f8e9e7',
  '#efe3cf',
  '#e4ebf5',
  '#e6efe7',
];

const heroBlockOffsets = [
  { x: -200, y: 0 },
  { x: 600, y: 0 },
  { x: -400, y: 600 },
  { x: 200, y: 800 },
  { x: 800, y: 400 },
  { x: 1000, y: 600 },
];

const heroBackgroundRows = 5;
const heroBackgroundBleedTop = 64;

function getRandomBlockState(): HeroBlockState {
  return {
    color:
      heroBlockPalette[Math.floor(Math.random() * heroBlockPalette.length)] ??
      heroBlockPalette[0],
    opacity: 0.35 + Math.random() * 0.45,
  };
}

export function HeroBackground({
  gridWidth = 200,
  gridHeight = 200,
  bleedTop = false,
}: HeroBackgroundProps) {
  const backgroundTop = bleedTop ? -heroBackgroundBleedTop : 0;
  const backgroundHeight =
    gridHeight * heroBackgroundRows + (bleedTop ? heroBackgroundBleedTop : 0);

  const [blockStates, setBlockStates] = useState<HeroBlockState[]>(() =>
    heroBlockOffsets.map((_, index) => ({
      color:
        heroBlockPalette[index % heroBlockPalette.length] ??
        heroBlockPalette[0],
      opacity: 0.24 + ((index % 3) + 1) * 0.12,
    }))
  );

  useEffect(() => {
    const intervalId = window.setInterval(
      () => {
        setBlockStates((previousStates) =>
          previousStates.map((state) => {
            if (Math.random() < 0.45) {
              return getRandomBlockState();
            }

            return state;
          })
        );
      },
      2800 + Math.round(Math.random() * 1800)
    );

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -z-10 overflow-hidden"
      style={{
        top: `${backgroundTop}px`,
        height: `${backgroundHeight}px`,
      }}
    >
      <svg className="absolute inset-0 h-full w-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)]">
        <defs>
          <pattern
            id="hero-grid-pattern"
            x="50%"
            y="-1"
            width={gridWidth}
            height={gridHeight}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M.5 ${gridHeight}V.5H${gridWidth}`}
              fill="none"
              className="stroke-[#ebebeb]"
            />
          </pattern>
        </defs>
        <svg x="50%" y="-1" className="overflow-visible">
          {heroBlockOffsets.map((offset, index) => {
            const blockState = blockStates[index];

            if (!blockState) {
              return null;
            }

            return (
              <rect
                key={`${offset.x}-${offset.y}`}
                x={offset.x}
                y={offset.y}
                width={gridWidth + 1}
                height={gridHeight + 1}
                fill={blockState.color}
                fillOpacity={blockState.opacity}
                className="hero-grid-block"
              />
            );
          })}
        </svg>
        <rect
          fill="url(#hero-grid-pattern)"
          width="100%"
          height="100%"
          strokeWidth="0"
        />
      </svg>
    </div>
  );
}
