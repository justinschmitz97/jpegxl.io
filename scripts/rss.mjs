import { writeFileSync } from "fs";
import RSS from "rss";
import { allDocuments } from "../.contentlayer/generated/index.mjs";

async function generate() {
  const feed = new RSS({
    title: `jpegxl.io RSS Feed`,
    feed_url: `https://jpegxl.io/rss.xml`,
    site_url: `https://jpegxl.io`,
    language: "en",
  });

  allDocuments.map((post) => {
    feed.item({
      title: post.title,
      url: `https://jpegxl.io/${post.url}/`,
      date: post.datePublished,
      description: post.description,
    });
  });

  writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
}

generate();

console.log("✅ RSS Feed created");
