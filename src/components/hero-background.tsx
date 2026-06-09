'use client';

import { useEffect, useState } from 'react';

type HeroBackgroundProps = {
  gridWidth?: number;
  gridHeight?: number;
  bleedTop?: boolean;
};

type HeroBlockState = {
  x: number;
  y: number;
  lightColor: string;
  darkColor: string;
  color: string;
  opacity: number;
};

type HeroBlockPalette = {
  light: string;
  dark: string;
};

const heroBlockPalette: HeroBlockPalette[] = [
  { light: '#f8f2f1', dark: '#d96c5f' },
  { light: '#f4eddc', dark: '#c7912d' },
  { light: '#edf2f8', dark: '#5d82bf' },
  { light: '#edf4ee', dark: '#5f9a69' },
  { light: '#f3f0f8', dark: '#8770b8' },
];

const heroBackgroundRows = 5;
const heroBackgroundBleedTop = 64;
const heroBackgroundColumns = 10;
const heroBackgroundBlockCount = 3;
const heroBlockHiddenOpacity = 0;
const heroBlockLightOpacity = 0.28;
const heroBlockActiveOpacity = 0.72;
const heroBlockStartDelay = 70;
const heroBlockFadeInDuration = 900;
const heroBlockFadeOutDuration = 900;
const heroBlockMoveDelay = 180;
const heroBlockCyclePauseMin = 900;
const heroBlockCyclePauseRange = 1400;

function getRandomPalette() {
  return (
    heroBlockPalette[Math.floor(Math.random() * heroBlockPalette.length)] ??
    heroBlockPalette[0]
  );
}

function getRandomPalettes(count: number): HeroBlockPalette[] {
  const shuffledPalettes = [...heroBlockPalette].sort(
    () => Math.random() - 0.5
  );

  return shuffledPalettes.slice(0, count);
}

function getRandomBlockPosition(gridWidth: number, gridHeight: number) {
  const column = Math.floor(Math.random() * heroBackgroundColumns) - 4;
  const row = Math.floor(Math.random() * heroBackgroundRows);

  return {
    x: column * gridWidth,
    y: row * gridHeight,
  };
}

function getInitialBlockState(
  index: number,
  gridWidth: number,
  gridHeight: number
): HeroBlockState {
  const palette =
    heroBlockPalette[index % heroBlockPalette.length] ?? heroBlockPalette[0];
  const column = index * 2 - 2;
  const row = index % heroBackgroundRows;

  return {
    x: column * gridWidth,
    y: row * gridHeight,
    lightColor: palette!.light,
    darkColor: palette!.dark,
    color: palette!.light,
    opacity: heroBlockHiddenOpacity,
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
    Array.from({ length: heroBackgroundBlockCount }, (_, index) =>
      getInitialBlockState(index, gridWidth, gridHeight)
    )
  );

  useEffect(() => {
    let isDisposed = false;
    const timeoutIds: number[] = [];

    const scheduleTimeout = (callback: () => void, delay: number) => {
      const timeoutId = window.setTimeout(callback, delay);
      timeoutIds.push(timeoutId);
    };

    const runCycle = () => {
      if (isDisposed) {
        return;
      }

      const activeCount =
        1 + Math.floor(Math.random() * heroBackgroundBlockCount);
      const activeIndexes = Array.from(
        { length: heroBackgroundBlockCount },
        (_, index) => index
      )
        .sort(() => Math.random() - 0.5)
        .slice(0, activeCount);
      const activeIndexSet = new Set(activeIndexes);
      const activePalettes = getRandomPalettes(activeCount);
      const nextStatesByIndex = new Map<number, HeroBlockState>();

      activeIndexes.forEach((blockIndex, paletteIndex) => {
        const palette = activePalettes[paletteIndex] ?? getRandomPalette();
        const position = getRandomBlockPosition(gridWidth, gridHeight);

        nextStatesByIndex.set(blockIndex, {
          ...position,
          lightColor: palette!.light,
          darkColor: palette!.dark,
          color: palette!.light,
          opacity: heroBlockLightOpacity,
        });
      });

      setBlockStates((previousStates) =>
        previousStates.map((blockState, index) => {
          if (!activeIndexSet.has(index)) {
            return {
              ...blockState,
              color: blockState.lightColor,
              opacity: heroBlockHiddenOpacity,
            };
          }

          return nextStatesByIndex.get(index) ?? blockState;
        })
      );

      scheduleTimeout(() => {
        if (isDisposed) {
          return;
        }

        setBlockStates((previousStates) =>
          previousStates.map((blockState, index) => {
            if (!activeIndexSet.has(index)) {
              return blockState;
            }

            return {
              ...blockState,
              color: blockState.darkColor,
              opacity: heroBlockActiveOpacity,
            };
          })
        );
      }, heroBlockStartDelay);

      scheduleTimeout(() => {
        if (isDisposed) {
          return;
        }

        setBlockStates((previousStates) =>
          previousStates.map((blockState, index) => {
            if (!activeIndexSet.has(index)) {
              return blockState;
            }

            return {
              ...blockState,
              color: blockState.lightColor,
              opacity: heroBlockLightOpacity,
            };
          })
        );
      }, heroBlockStartDelay + heroBlockFadeInDuration);

      scheduleTimeout(
        () => {
          if (isDisposed) {
            return;
          }

          setBlockStates((previousStates) =>
            previousStates.map((blockState, index) => {
              if (!activeIndexSet.has(index)) {
                return blockState;
              }

              return {
                ...blockState,
                opacity: heroBlockHiddenOpacity,
              };
            })
          );
        },
        heroBlockStartDelay +
          heroBlockFadeInDuration +
          heroBlockFadeOutDuration +
          heroBlockMoveDelay
      );

      scheduleTimeout(
        runCycle,
        heroBlockStartDelay +
          heroBlockFadeInDuration +
          heroBlockFadeOutDuration +
          heroBlockMoveDelay +
          heroBlockCyclePauseMin +
          Math.round(Math.random() * heroBlockCyclePauseRange)
      );
    };

    scheduleTimeout(runCycle, 1200);

    return () => {
      isDisposed = true;
      timeoutIds.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    };
  }, [gridHeight, gridWidth]);

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
          {blockStates.map((blockState, index) => (
            <rect
              key={`${index}-${blockState.x}-${blockState.y}`}
              x={blockState.x}
              y={blockState.y}
              width={gridWidth + 1}
              height={gridHeight + 1}
              fill={blockState.color}
              fillOpacity={blockState.opacity}
              className="hero-grid-block"
            />
          ))}
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
