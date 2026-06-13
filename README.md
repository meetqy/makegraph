# MakeGraph

MakeGraph is the codebase for [makegraph.org](https://makegraph.org), a chart-focused web app built with Next.js, TypeScript, and React.

The repository includes:

- Interactive chart editors with live preview and PNG export
- Localized chart landing pages and chart-specific copy
- Blog and template pages connected to chart pages
- Shared UI components, chart utilities, and data table editing
- Database and auth scaffolding for future product features

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

- Bar Chart
- Bar Chart Race
- Double Bar Chart
- Line Chart
- Radar Chart
- Scatter Chart
- Stacked Bar Chart
- Tree Map Chart

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

## Contributing

1. Install dependencies with `pnpm install`
2. Copy `.env.example` to `.env`
3. Make your changes
4. Run `pnpm check:write`
5. Open a pull request

## License

No license file is included in this repository yet.
