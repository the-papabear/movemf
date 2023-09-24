/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/workouts',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
