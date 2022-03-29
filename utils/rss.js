/* eslint-disable @typescript-eslint/no-var-requires */
const RSS = require("rss");
const fs = require("fs");
const path = require("path");
const frontMatter = require("front-matter");

const blogTypes = ["articles", "releases", "tutorials"];

const feed = new RSS({
  title: `jpegxl.io RSS Feed`,
  description: `jpegxl.io RSS Feed`,
  feed_url: `https://jpegxl.io/rss.xml`,
  site_url: "https://jpegxl.io",
  managingEditor: `contact@jpegxl.io (Justin Schmitz)`,
  webMaster: `contact@jpegxl.io (Justin Schmitz)`,
  copyright: `2021 Justin Schmitz`,
  language: "en",
  pubDate: new Date().toLocaleString(),
  ttl: "60",
});

blogTypes.map((type) =>
  fs
    .readdirSync(path.resolve(__dirname, "../data", type))
    .map((fileName) => {
      const fullPath = path.join(
        path.resolve(__dirname, "../data", type),
        fileName
      );
      const file = fs.readFileSync(fullPath, "utf8");
      const { attributes } = frontMatter(file);
      return { ...attributes, fileName };
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .forEach(({ title, description, fileName, datePublished }) => {
      datePublished = new Date(datePublished);
      feed.item({
        title,
        description,
        url: `https://jpegxl.io/${type}/${fileName.replace(".mdx", "")}/`,
        date: datePublished,
      });
    })
);

const xml = feed.xml();

fs.writeFileSync(path.resolve(__dirname, "../public") + "/rss.xml", xml);
