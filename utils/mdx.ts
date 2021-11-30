import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import remarkSlug from "remark-slug";

export const BLOG_POSTS_PATH = path.join(process.cwd(), "data");
export const DATA_PATH = path.join(process.cwd(), "data");

export const postFilePaths = (path: string) =>
  fs.readdirSync(path).filter((p) => /\.mdx?$/.test(p));

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
