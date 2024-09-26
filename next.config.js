/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/oauth2/authorization/bob-works',
        destination:
          process.env.CLIENT_SERVICE_PATH + '/oauth2/authorization/bob-works',
      },
    ];
  },
  output: 'standalone',
};

module.exports = nextConfig;
