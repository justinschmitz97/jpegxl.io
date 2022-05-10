/** @type {import('next').NextConfig} */

const { withContentlayer } = require("next-contentlayer");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
};

module.exports = withContentlayer(nextConfig);
