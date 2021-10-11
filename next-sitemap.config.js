// eslint-disable-next-line no-undef
module.exports = {
  siteUrl: "https://jpegxl.io",
  changefreq: null,
  priority: null,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: null,
      priority: null,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
