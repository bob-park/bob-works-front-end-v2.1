/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/oauth2/authorization/bob-works',
        destination:
          process.env.CLIENT_SERVICE_PATH + '/oauth2/authorization/bob-works',
      },
    ];
  },
  experimental: {
    outputStandalone: true,
  },
};

module.exports = nextConfig;
