const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
});

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(
  withMDX({
    swcMinify: true,
    reactStrictMode: true,
    webpack: (config, { dev, isServer }) => {
      // Replace React with Preact only in client production build
      if (!dev && !isServer) {
        Object.assign(config.resolve.alias, {
          "react/jsx-runtime.js": "preact/compat/jsx-runtime",
          "react": "preact/compat",
          "react-dom/test-utils": "preact/test-utils",
          "react-dom": "preact/compat",
        });
      }
      return config;
    },
  })
);
