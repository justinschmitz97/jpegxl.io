import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import remarkSlug from "remark-slug";

// POSTS_PATH is useful when you want to get the path to a specific file
export const BLOG_POSTS_PATH = path.join(process.cwd(), "data/blog");
export const DATA_PATH = path.join(process.cwd(), "data");

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = (path: string) =>
  fs
    .readdirSync(path)
    // Only include md(x) files
    .filter((p) => /\.mdx?$/.test(p));

const fileLastUpdate = (path: string) => fs.statSync(path).mtime;

export const getDataByFilename = async (filename: string) => {
  const filePath = path.join(DATA_PATH, `${filename}.mdx`);
  const source = fs.readFileSync(filePath);

  const { data, content } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkSlug, require("remark-code-titles")],
    },
    scope: data,
  });

  return {
    frontMatter: {
      ...data,
      updatedAt: fileLastUpdate(filePath).getTime(),
    },
    source: mdxSource,
  };
};

export async function getHeadings(source: string) {
  const headingLines = source.split("\n").filter((line: string) => {
    return line.match(/^##\s/);
  });

  return headingLines.map((raw: string) => {
    const text = raw.replace(/^###*\s/, "");

    return { text, href: `#${text.replace(/\s/gi, "").toLowerCase()}` };
  });
}
