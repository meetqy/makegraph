type HeroBackgroundProps = {
  gridWidth?: number;
  gridHeight?: number;
};

export function HeroBackground({
  gridWidth = 200,
  gridHeight = 200,
}: HeroBackgroundProps) {
  return (
    <>
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 -top-16 -z-10 h-[calc(100%+4rem)] w-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      >
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

      <div
        aria-hidden="true"
        className="absolute top-10 left-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
          }}
          className="aspect-[1108/632] w-[69rem] bg-[linear-gradient(to_right,#50e3c2,#ff0080,#ff4d4d,#f9cb28)] opacity-20"
        />
      </div>
    </>
  );
}
