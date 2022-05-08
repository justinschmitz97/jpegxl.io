import { defineDocumentType } from "contentlayer/source-files";
import { abstractDocumentFrontMatter } from "./AbstractFrontMatter";

export const Tutorials = defineDocumentType(() => ({
  name: "Tutorials",
  filePathPattern: `tutorials/*.mdx`,
  contentType: "mdx",
  fields: {
    ...abstractDocumentFrontMatter,
    subcategory: {
      type: "string",
      required: true,
    },
    support: {
      type: "enum",
      options: ["full", "partial", "no"],
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath,
    },
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
    category: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").shift(),
    },
  },
}));
