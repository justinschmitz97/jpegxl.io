// eslint-disable-next-line no-undef
module.exports = {
  siteUrl: "https://jpegxl.io",
  changefreq: null,
  priority: null,
  transform: async (config, path) => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    const newdate = year + "-" + month + "-" + day;
    return {
      loc: path,
      changefreq: null,
      priority: null,
      lastmod: newdate,
    };
  },
};
