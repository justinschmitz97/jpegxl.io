import fs from "fs";
import path from "path";
import * as React from "react";
import { InferGetStaticPropsType, NextPage } from "next";
import matter from "gray-matter";
import { postFilePaths, BLOG_POSTS_PATH } from "@utils/mdx";
import Post from "@components/Blog/Post";
import Layout from "@components/Layout";

const meta = {
  blog: {
    title: "AVIF Blog",
    description:
      "Read AVIF tutorials and get an overview of all supported software (caniuse-style)",
    url: "blog/",
    image: "/logo_draft.png",
    datePublished: "01.09.20",
    dateModified: "10.01.21",
  },
};

const generatePosts = (folderPath: string) =>
  postFilePaths(folderPath).map((filePath: string) => {
    const source = fs.readFileSync(path.join(folderPath, filePath));
    const { data } = matter(source);

    return {
      data,
      slug: filePath.replace(".mdx", ""),
    };
  });

export const getStaticProps = async () => {
  const articles = generatePosts(`${BLOG_POSTS_PATH}/articles`);
  const comparisons = generatePosts(`${BLOG_POSTS_PATH}/comparisons`);
  const releases = generatePosts(`${BLOG_POSTS_PATH}/releases`);
  const tutorials = generatePosts(`${BLOG_POSTS_PATH}/tutorials`);

  const listPostsByFolder = {
    articles,
    comparisons,
    releases,
    tutorials,
  };

  const defaultFilteredPost = [
    ...articles,
    ...comparisons,
    ...releases,
    ...tutorials,
  ];

  const listSubCategories = [
    ...new Set(defaultFilteredPost.map((post) => post.data.subcategory)),
  ].filter(Boolean);
  const listCategories = [
    ...new Set(defaultFilteredPost.map((post) => post.data.category)),
  ].filter(Boolean);
  const listSupport = [
    ...new Set(defaultFilteredPost.map((post) => post.data.support)),
  ].filter(Boolean);

  return {
    props: {
      articles,
      comparisons,
      releases,
      tutorials,
      defaultFilteredPost,
      listSubCategories,
      listCategories,
      listSupport,
      listAllCategories: [
        ...listCategories,
        ...listSubCategories,
        ...listSupport,
      ],

      posts: listPostsByFolder as any,
    },
  };
};

type PostsPageProps = InferGetStaticPropsType<typeof getStaticProps>;
const BlogAvif: NextPage<PostsPageProps> = ({
  defaultFilteredPost,
  articles,
  comparisons,
  releases,
  tutorials,
  /*listAllCategories,*/
  listSupport,
  listSubCategories,
  listCategories,
}) => {
  const [filteredPost, setFilteredPost] = React.useState([]);
  const [filterKeyword, setFilterKeyword] = React.useState("");
  const [selectedCategoryPill, setSelectedCategoryPill] = React.useState("");

  const handleSelectedPill = (category: string) => {
    if (category === selectedCategoryPill) {
      setSelectedCategoryPill("");
      setFilteredPost([]);
      return;
    }

    setSelectedCategoryPill(category);
    const filteredPosts = defaultFilteredPost.filter((post) => {
      return (
        post.data.category === category ||
        post.data.subcategory === category ||
        post.data.support === category
      );
    });

    setFilteredPost(filteredPosts as any);
  };

  const handleFilterByKeyword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const keyword = event.target.value;
    const filtered = defaultFilteredPost.filter((post) =>
      post.data.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilterKeyword(keyword);
    setFilteredPost(filtered as any);
  };

  return (
    <Layout meta={meta.blog}>
      <main className="p-2 md:p-4 archive blog">
        <div className="mt-12 text-center">
          <h1>{meta.blog.title}</h1>
          <h2 className="mb-8 text-base">{meta.blog.description}</h2>
        </div>
        <div className="container max-w-screen-lg">
          <div className="relative mt-1 mb-3 rounded-md">
            <input
              type="text"
              placeholder="Search all posts"
              className="block py-3 px-3 pr-10 w-full text-white rounded-md border-2 outline-none focus:border-blue-400 bg-bg-400 border-bg-500"
              onChange={handleFilterByKeyword}
            />
            <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none group">
              🔎︎
            </div>
          </div>
          <div className="mb-2">
            {listCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleSelectedPill(category)}
                className={`inline-flex items-center px-2 py-0 mt-2 mr-2 py-0.5 rounded-sm font-normal cursor-pointer ${
                  selectedCategoryPill === category
                    ? "bg-green-1000 border-transparent text-blue-400 hover:bg-indigo-700"
                    : "bg-bg-500 text-gray-300"
                }`}
              >
                {selectedCategoryPill === category && (
                  <span className="mr-1">✓</span>
                )}
                {category}
              </button>
            ))}
          </div>
          <div className="mb-2">
            {listSubCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleSelectedPill(category)}
                className={`inline-flex items-center px-2 py-0 mt-2 mr-2 py-0.5 rounded-sm font-normal cursor-pointer ${
                  selectedCategoryPill === category
                    ? "bg-green-1000 border-transparent text-blue-400 hover:bg-indigo-700"
                    : "bg-bg-500 text-gray-300"
                }`}
              >
                {selectedCategoryPill === category && (
                  <span className="mr-1">✓</span>
                )}
                {category}
              </button>
            ))}
          </div>
          <div className="mb-2">
            {listSupport.map((category) => (
              <button
                key={category}
                onClick={() => handleSelectedPill(category)}
                className={`inline-flex items-center px-2 py-0 mt-2 mr-2 py-0.5 rounded-sm font-normal cursor-pointer ${
                  selectedCategoryPill === category
                    ? "bg-green-1000 border-transparent text-blue-400 hover:bg-indigo-700"
                    : "bg-bg-500 text-gray-300"
                }`}
              >
                {selectedCategoryPill === category && (
                  <span className="mr-1">✓</span>
                )}
                {category}
              </button>
            ))}
          </div>
          {filterKeyword.length > 0 || filteredPost.length ? (
            <div className="grid grid-cols-1 gap-2 mt-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPost.map((post: any) => (
                <Post key={post.slug} {...post.data} slug={post.slug} />
              ))}
            </div>
          ) : (
            <>
              <h3
                className="mt-8 mb-2 ml-3 text-xl font-bold capitalize"
                id={"articles"}
              >
                Articles
              </h3>
              <div className="grid grid-cols-1 gap-2 mt-2 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((post: any) => (
                  <Post key={post.slug} {...post.data} slug={post.slug} />
                ))}
              </div>
              <h3
                className="mt-8 mb-2 ml-3 text-xl font-bold capitalize"
                id={"tutorials"}
              >
                Tutorials
              </h3>
              <div className="grid grid-cols-1 gap-2 mt-2 md:grid-cols-2 lg:grid-cols-3">
                {tutorials.map((post: any) => (
                  <Post key={post.slug} {...post.data} slug={post.slug} />
                ))}
              </div>
              <h3
                className="mt-8 mb-2 ml-3 text-xl font-bold capitalize"
                id={"comparisons"}
              >
                Comparisons
              </h3>
              <div className="grid grid-cols-1 gap-2 mt-2 md:grid-cols-2 lg:grid-cols-3">
                {comparisons.map((post: any) => (
                  <Post key={post.slug} {...post.data} slug={post.slug} />
                ))}
              </div>
              <h3
                className="mt-8 mb-2 ml-3 text-xl font-bold capitalize"
                id={"articles"}
              >
                Changelog
              </h3>
              <div className="grid grid-cols-1 gap-2 mt-2 md:grid-cols-2 lg:grid-cols-3">
                {releases.map((post: any) => (
                  <Post key={post.slug} {...post.data} slug={post.slug} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default BlogAvif;
