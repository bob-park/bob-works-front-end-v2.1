/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/logout',
        destination: process.env.CLIENT_SERVICE_PATH + '/logout',
      },
      {
        source: '/api/:path*',
        destination: `${process.env.CLIENT_SERVICE_PATH}/:path*`,
      },
      {
        source: '/api/oauth2/authorization/bob-works',
        destination: process.env.CLIENT_SERVICE_PATH + '/oauth2/authorization/bob-works',
      },
    ];
  },
  output: 'standalone',
};

module.exports = nextConfig;
