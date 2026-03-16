/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  experimental: { images: { allowFutureImage: true } },
  async redirects() {
    return [
      {
        source: '/ocr-scaner',
        destination: 'https://www.palantiri.pl/narzedzia/rozpoznawanie-ocr',
        permanent: true,
      },
      {
        source: '/:path((?!_next|images|favicon.png|manifest.json).+)',
        destination: 'https://palantiri.pl/blog/:path',
        permanent: true,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};

module.exports = nextConfig;
