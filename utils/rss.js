/* eslint-disable @typescript-eslint/no-var-requires */
const RSS = require("rss");
const fs = require("fs");
const path = require("path");
const frontMatter = require("front-matter");

const articles = path.resolve(__dirname, "../data", "articles");
const portfolio = path.resolve(__dirname, "../data", "portfolio");

const feed = new RSS({
  title: `jpegxl.io RSS Feed`,
  description: "Your description",
  feed_url: `https://jpegxl.io/rss.xml`,
  site_url: `https://jpegxl.io`,
  managingEditor: "justin@justinschmitz.de (Justin Schmitz)",
  webMaster: "justin@justinschmitz.de (Justin Schmitz)",
  copyright: `2021 Justin Schmitz`,
  language: "en",
  pubDate: new Date().toLocaleString(),
  ttl: "60",
});

fs.readdirSync(articles)
  .map((fileName) => {
    const fullPath = path.join(articles, fileName);
    const file = fs.readFileSync(fullPath, "utf8");
    const { attributes } = frontMatter(file);
    return { ...attributes, fileName };
  })
  .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  .forEach(({ title, description, fileName, datePublished }) => {
    datePublished = datePublished.split(".");
    datePublished =
      "20" + datePublished[2] + "-" + datePublished[1] + "-" + datePublished[0];
    feed.item({
      title,
      description,
      url: `https://justinschmitz.de/articles/${fileName.replace(".mdx", "")}/`,
      date: datePublished,
    });
  });

fs.readdirSync(portfolio)
  .map((fileName) => {
    const fullPath = path.join(portfolio, fileName);
    const file = fs.readFileSync(fullPath, "utf8");
    const { attributes } = frontMatter(file);
    return { ...attributes, fileName };
  })
  .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  .forEach(({ title, description, datePublished, fileName }) => {
    datePublished = datePublished.split(".");
    datePublished =
      "20" + datePublished[2] + "-" + datePublished[1] + "-" + datePublished[0];
    feed.item({
      title,
      description,
      url: `https://justinschmitz.de/portfolio/${fileName.replace(
        ".mdx",
        ""
      )}/`,
      date: datePublished,
    });
  });

const xml = feed.xml();

fs.writeFileSync(path.resolve(__dirname, "../public") + "/rss.xml", xml);
