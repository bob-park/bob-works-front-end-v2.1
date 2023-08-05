/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.CLIENT_SERVICE_PATH + '/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
