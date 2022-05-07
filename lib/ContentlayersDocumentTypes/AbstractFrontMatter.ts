import { FieldDefs } from "contentlayer/source-files";

export const abstractDocumentFrontMatter: FieldDefs = {
  title: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  keyword: {
    type: "string",
  },
  datePublished: {
    type: "date",
  },
  dateModified: {
    type: "date",
  },
  sources: {
    type: "json",
  },
  tags: {
    type: "json",
  },
  questions: {
    type: "json",
  },
  relatedPosts: {
    type: "json",
  },
};
