/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "https://saimor.world",
        "https://www.saimor.world",
        "https://saimor-site-improved.vercel.app"
      ]
    },
  },
  images: {
    domains: ['picsum.photos']
  },
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
