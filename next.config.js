const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withContentlayer(nextConfig);
