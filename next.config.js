const withPlugins = require("next-compose-plugins");
const images = require("next-images");
const bundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withPlugins([
  images,
  [
    bundleAnalyzer,
    {
      trailingSlash: true,
      basePath: "",
      env: {
        baseUrl: "",
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
        {
          /*
        if (!dev && !isServer) {
          Object.assign(config.resolve.alias, {
            react: "preact/compat",
            "react-dom/test-utils": "preact/test-utils",
            "react-dom": "preact/compat",
          });
        }
      */
        }
        return config;
      },
    },
  ],
]);
