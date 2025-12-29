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

module.exports = nextConfig;
