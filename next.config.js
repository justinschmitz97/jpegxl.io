/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const withPlugins = require("next-compose-plugins");
const images = require("next-images");
const bundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const baseUrl = "";

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true
};

module.exports = withPlugins(
  [
    images,
    [
      bundleAnalyzer,
      {
        trailingSlash: true,
        basePath: baseUrl,
        env: {
          baseUrl: baseUrl,
        },
        webpack: (config, { dev, isServer }) => {
          config.module.rules.push({
            test: /\.svg$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 8192,
                },
              },
            ],
          });
          if (!dev && !isServer) {
            // Replace React with Preact only in client production build
            Object.assign(config.resolve.alias, {
              "react": "preact/compat",
              "react-dom": "preact/compat",
            });
          }
          return config;
        },
      },
    ],
  ],
  nextConfig
);
