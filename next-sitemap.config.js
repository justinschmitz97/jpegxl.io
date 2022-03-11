// eslint-disable-next-line no-undef
module.exports = {
  siteUrl: "https://jpegxl.io",
  changefreq: null,
  priority: null,
  transform: async (path) => {
    return {
      loc: path,
      changefreq: null,
      priority: null,
      lastmod: new Date().toISOString(),
    };
  },
};
