/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import createNextIntlPlugin from 'next-intl/plugin';
import './src/env.js';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import("next").NextConfig} */
const config = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/charts/correlation-chart',
        destination: '/charts/correlation-matrix-chart',
        permanent: true,
      },
      {
        source: '/:locale(en|zh)/charts/correlation-chart',
        destination: '/:locale/charts/correlation-matrix-chart',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(config);
