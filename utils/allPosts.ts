import { allArticles, allReleases, allTutorials } from "contentlayer/generated";

type Raw = {
  sourceFilePath: string;
  sourceFileName: string;
  sourceFileDir: string;
  contentType: string;
  flattenedPath: string;
};

function searchForPost(
  postName: string,
  slug?: string,
  id?: string,
  raw?: Raw
) {
  let result;

  if (!result)
    result = allArticles.find((post) => {
      if (
        post._raw.sourceFileName.split(".")[0] == postName ||
        post.slug == slug ||
        post._id == id ||
        post._raw == raw
      )
        return true;
    });
  if (!result)
    result = allReleases.find((post) => {
      if (
        post._raw.sourceFileName.split(".")[0] == postName ||
        post.slug == slug ||
        post._id == id ||
        post._raw == raw
      )
        return true;
    });
  if (!result)
    result = allTutorials.find((post) => {
      if (
        post._raw.sourceFileName.split(".")[0] == postName ||
        post.slug == slug ||
        post._id == id ||
        post._raw == raw
      )
        return true;
    });

  return result;
}

export function getPost(
  postName: string,
  slug?: string,
  id?: string,
  raw?: Raw
): any | undefined {
  const result = searchForPost(postName, slug, id, raw);
  let post;

  if (result) {
    const { body, ...data } = result;
    post = data;
    return post;
  }

  return post;
}
