/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // {
      //   source: '/api/logout',
      //   destination: process.env.CLIENT_SERVICE_PATH + '/logout',
      // },
      {
        source: '/api/oauth2/authorization/bob-works',
        destination:
          process.env.CLIENT_SERVICE_PATH + '/oauth2/authorization/bob-works',
      },
    ];
  },
};

module.exports = nextConfig;
