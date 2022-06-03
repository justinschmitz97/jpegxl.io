// eslint-disable-next-line no-undef
module.exports = {
  siteUrl: "https://jpegxl.io",
  changefreq: null,
  generateIndexSitemap: false,
  priority: null,
  transform: async (config, path) => {
    var date = new Date().toISOString();
    return {
      loc: path + "/",
      changefreq: null,
      priority: null,
      lastmod: date,
    };
  },
};
