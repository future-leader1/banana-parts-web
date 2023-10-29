/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['react-ridge-state']);
const plugins = [withTM];

const nextConfig = {
  images: {
    domains: [
      'source.unsplash.com',
      'i.picsum.photos',
      'picsum.photos',
      's3.ap-northeast-2.amazonaws.com',
      'banana-parts-stage.s3.ap-northeast-2.amazonaws.com',
    ],
  },
  reactStrictMode: true,
  swcMinify: true,

  webpack(config) {
    config.module.rules.push({
      loader: '@svgr/webpack',
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: { removeViewBox: false },
              },
            },
          ],
        },
        titleProp: true,
      },
      test: /\.svg$/,
    });
    return config;
  },
};

module.exports = withPlugins(plugins, nextConfig);
