/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // Wenn nötig, hier deine Domains freigeben:
      allowedOrigins: ["https://saimor.world", "https://www.saimor.world"]
    },
  },
};
module.exports = nextConfig;
