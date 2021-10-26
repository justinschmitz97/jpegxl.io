/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const withPlugins = require("next-compose-plugins");
const images = require("next-images");

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withPlugins(
  [
    images,
    [
      {
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
