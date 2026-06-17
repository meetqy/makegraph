# MakeGraph

[English](README.md) | [中文](README_ZH.md)

MakeGraph is the codebase for [makegraph.org](https://makegraph.org), a free online chart maker for Excel and CSV data built with Next.js, TypeScript, and React.

![MakeGraph preview](public/og.png)

## Overview

MakeGraph focuses on a narrow workflow: upload or paste spreadsheet data, generate clear charts in about 1 minute, and export them with as little setup friction as possible.

The repository includes:

- Interactive chart editors for spreadsheet-style data input and live preview
- Chart experiences built around common spreadsheet chart tasks and the currently supported chart types
- PNG and SVG-oriented chart output flows
- Localized chart landing pages, blog posts, and templates
- Shared UI components, chart utilities, and data table editing
- Database and auth scaffolding for future product features

## Features

- Upload or paste spreadsheet data from Excel and CSV workflows
- Full-screen chart editors with live preview
- Fast chart creation flow built for common spreadsheet chart needs
- PNG export for chart output, with SVG reflected in product positioning copy
- Localized chart pages powered by `next-intl`
- Reusable data table editing for chart inputs
- Chart-related blog and template linking
- Shared UI system for landing pages and editor panels

## Preview

The current chart OG images are listed below.

|                                                                                                                                                                                              |                                                                                                                                                                               |                                                                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [![Bar Chart](public/charts/bar-graph-og-image.png)](https://makegraph.org/charts/bar-chart)<br/>[Bar Chart](https://makegraph.org/charts/bar-chart)                                         | [![Bar Chart Race](public/charts/bar-chart-race-og-image.png)](https://makegraph.org/charts/bar-chart-race)<br/>[Bar Chart Race](https://makegraph.org/charts/bar-chart-race) | [![Double Bar Chart](public/charts/double-bar-chart-og-image.png)](https://makegraph.org/charts/double-bar-chart)<br/>[Double Bar Chart](https://makegraph.org/charts/double-bar-chart)                |
| [![Line Chart](public/charts/line-chart-og-image.png)](https://makegraph.org/charts/line-chart)<br/>[Line Chart](https://makegraph.org/charts/line-chart)                                    | [![Radar Chart](public/charts/radar-chart-og-image.png)](https://makegraph.org/charts/radar-chart)<br/>[Radar Chart](https://makegraph.org/charts/radar-chart)                | [![Scatter Chart](public/charts/scatter-chart-og-image.png)](https://makegraph.org/charts/scatter-chart)<br/>[Scatter Chart](https://makegraph.org/charts/scatter-chart)                               |
| [![Stacked Bar Chart](public/charts/stacked-bar-chart-og-image.png)](https://makegraph.org/charts/stacked-bar-chart)<br/>[Stacked Bar Chart](https://makegraph.org/charts/stacked-bar-chart) | [![Tree Map Chart](public/charts/tree-map-chart-og-image.png)](https://makegraph.org/charts/tree-map-chart)<br/>[Tree Map Chart](https://makegraph.org/charts/tree-map-chart) | [![Waterfall Bar Chart](public/charts/waterfall-bar-chart-og-image.png)](https://makegraph.org/charts/waterfall-bar-chart)<br/>[Waterfall Bar Chart](https://makegraph.org/charts/waterfall-bar-chart) |

`Correlation Matrix`, `Marimekko Chart`, `Sunburst Chart`, `Band Seating Chart`, and `Population Pyramid` are also available at `https://makegraph.org/charts/correlation-matrix-chart`, `https://makegraph.org/charts/marimekko-chart`, `https://makegraph.org/charts/sunburst-chart`, `https://makegraph.org/charts/band-seating-chart`, and `https://makegraph.org/charts/population-pyramid`. Their OG preview image paths are reserved in code and can be added later under `public/charts/`.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- ECharts and Recharts
- next-intl
- tRPC
- Drizzle ORM
- Better Auth
- PostgreSQL
- Biome

## Supported Chart Pages

The current app includes editors and landing pages for:

- Band Seating Chart
- Bar Chart
- Bar Chart Race
- Correlation Matrix
- Double Bar Chart
- Line Chart
- Marimekko Chart
- Negative Bar Chart
- Population Pyramid
- Radar Chart
- Scatter Chart
- Stacked Bar Chart
- Sunburst Chart
- Tree Map Chart
- Waterfall Bar Chart

## Environment Variables

Copy `.env.example` to `.env` and configure the following values:

- `DATABASE_URL`: PostgreSQL connection string
- `BETTER_AUTH_SECRET`: secret used by Better Auth
- `NEXT_PUBLIC_SITE_URL`: public site URL such as `http://localhost:3001`
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`: optional analytics ID

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Create your local environment file

```bash
cp .env.example .env
```

Update `.env` with valid local values. At minimum, this project expects:

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `NEXT_PUBLIC_SITE_URL`

### 3. Prepare the database

If you are running the app locally with PostgreSQL, push the current schema:

```bash
pnpm db:push
```

### 4. Start the development server

```bash
pnpm dev
```

The default local URL is `http://localhost:3001`.

## Deployment Notes

This project is a standard Next.js application with a PostgreSQL dependency.

- Provide the required environment variables in your deployment platform
- Ensure the target database is reachable
- Run `pnpm build` for production builds
- Set `NEXT_PUBLIC_SITE_URL` to the deployed domain

## Available Scripts

- `pnpm dev` - start the Next.js development server on port `3001`
- `pnpm build` - generate Drizzle artifacts and build the production app
- `pnpm start` - start the production server
- `pnpm preview` - build and run a production preview
- `pnpm check` - run Biome checks
- `pnpm check:write` - run Biome and apply safe fixes
- `pnpm typecheck` - run TypeScript type checks
- `pnpm db:generate` - generate Drizzle files
- `pnpm db:push` - push the schema to the configured database
- `pnpm db:migrate` - run database migrations
- `pnpm db:studio` - open Drizzle Studio

## Project Structure

```text
.
├── docs/                # product, SEO, and marketing documents
├── drizzle/             # database migration files
├── messages/            # shared locale messages
├── public/              # static assets
├── src/
│   ├── app/             # Next.js routes and page content
│   ├── components/      # shared UI and chart components
│   ├── config/          # chart and blog configuration
│   ├── i18n/            # locale routing and request helpers
│   ├── lib/             # shared utilities and site config
│   ├── server/          # auth, database, and tRPC server code
│   └── styles/          # global styles
├── .env.example
└── package.json
```

## Content Notes

- Chart-specific markdown lives next to each chart page under `src/app/[locale]/charts/*`
- Non-page planning, SEO, and marketing materials live under `docs/`
- The previous marketing-focused README content has been moved to:
  - `docs/marketing/README.md`
  - `docs/marketing/README_ZH.md`

## Roadmap

- Add more chart types while keeping editors lightweight
- Expand template coverage for reusable chart examples
- Continue improving chart page copy, SEO, and internal linking
- Reuse the existing auth and database foundation for future product workflows

## Contributing

1. Install dependencies with `pnpm install`
2. Copy `.env.example` to `.env`
3. Make your changes
4. Run `pnpm check:write`
5. Open a pull request

## License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
