// Injected content via Sentry wizard below
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // === PERFORMANCE & STABILITY OPTIMIZATIONS ===
  typescript: {
    ignoreBuildErrors: true, // Speeds up build significantly
  },
  eslint: {
    ignoreDuringBuilds: true, // Speeds up build significantly
  },
  swcMinify: true, // Faster minification
  productionBrowserSourceMaps: false, // Save memory/CPU during build

  // Compression
  compress: true,

  // PoweredBy header removal (security)
  poweredByHeader: false,

  // React Strict Mode (development only to avoid double renders)
  reactStrictMode: process.env.NODE_ENV === 'development',

  // === RESOURCE MANAGEMENT ===
  experimental: {
    // Limit CPU threads to prevent system hanging
    cpus: 1,
    workerThreads: false,
    serverActions: {
      allowedOrigins: [
        "https://saimor.world",
        "https://www.saimor.world",
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
        source: '/',
        destination: '/de',
        permanent: true,
      },
    ]
  },
};

// Sentry Configuration
const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: "saimor",
  project: "javascript-nextjs",

  // Only upload source maps in production
  dryRun: process.env.NODE_ENV !== 'production' || !process.env.SENTRY_AUTH_TOKEN,

  // Hide source maps from Sentry
  hideSourceMaps: true,

  // Upload a larger set of source maps for prettier stack traces
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  tunnelRoute: "/monitoring",

  // Don't automatically instrument server (manual setup preferred for stability)
  automaticVercelMonitors: true,

  // Tree-shaking options for reducing bundle size
  treeshake: {
    removeDebugLogging: true,
  },
};

// Export with Sentry configuration
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
