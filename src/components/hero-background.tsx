type HeroBackgroundProps = {
  gridWidth?: number;
  gridHeight?: number;
  bleedTop?: boolean;
};

export function HeroBackground({
  gridWidth = 200,
  gridHeight = 200,
  bleedTop = false,
}: HeroBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 -z-10 overflow-hidden ${bleedTop ? '-top-16' : 'top-0'}`}
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
        <svg x="50%" y="-1" className="overflow-visible fill-[#fafafa]">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth="0"
          />
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
