// Injected content via Sentry wizard below
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // === PERFORMANCE & STABILITY OPTIMIZATIONS ===
  productionBrowserSourceMaps: false, // Save memory/CPU during build

  // Compression
  compress: true,

  // PoweredBy header removal (security)
  poweredByHeader: false,

  // React Strict Mode (development only to avoid double renders)
  reactStrictMode: process.env.NODE_ENV === 'development',

  // === RESOURCE MANAGEMENT ===
  serverExternalPackages: ["@prisma/client"],
  experimental: {
    // Limit CPU threads to prevent system hanging
    cpus: 1,
    workerThreads: false,
    serverActions: {
      allowedOrigins: [
        "https://saimor.world",
        "https://www.saimor.world",
        "https://owner.saimor.world",
        "https://saimor-site-improved.vercel.app",
        "https://api.saimor.world"
      ]
    },
  },

  // === IMAGES ===
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // === ROUTING ===
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'frnt.saimor.world' }],
        destination: 'https://yori.saimor.world/:path*',
        permanent: true,
      },
      // Locale switcher / bookmark gaps → working unprefixed (or DE) routes
      { source: '/en/portal', destination: '/portal', permanent: false },
      { source: '/en/demo', destination: '/demo', permanent: false },
      { source: '/en/wall', destination: '/wall', permanent: false },
      { source: '/de/mora', destination: '/mora', permanent: false },
      { source: '/de/yori', destination: '/yori', permanent: false },
    ]
  },
};

const isExplicitVercelProduction = Boolean(
  process.env.VERCEL === '1' &&
  process.env.VERCEL_ENV === 'production' &&
  process.env.SENTRY_AUTH_TOKEN
);

// Sentry Configuration
const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: "saimor",
  project: "javascript-nextjs",

  // Upload source maps only for an explicit Vercel production deployment.
  // Preview branches and local builds must never publish build artifacts.
  dryRun: !isExplicitVercelProduction,

  // Hide source maps from Sentry
  hideSourceMaps: true,

  // Upload a larger set of source maps for prettier stack traces
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  tunnelRoute: "/monitoring",

  // Don't automatically instrument server (manual setup preferred for stability)
  webpack: {
    automaticVercelMonitors: true,
  },

  // Tree-shaking options for reducing bundle size
  treeshake: {
    removeDebugLogging: true,
  },
};

// Keep the upload plugin completely out of local and preview builds. Apart from
// being faster, this makes it impossible for those builds to publish artifacts.
module.exports = isExplicitVercelProduction
  ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
  : nextConfig;
