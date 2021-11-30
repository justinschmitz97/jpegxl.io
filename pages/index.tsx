import { useState } from "react";
import fs from "fs";
import path from "path";
import { InferGetStaticPropsType, NextPage } from "next";
import matter from "gray-matter";
import { postFilePaths, BLOG_POSTS_PATH } from "@utils/mdx";
import Post from "@components/Blog/Post";
import Layout from "@components/Layout";

const meta = {
  title: "JPEG XL Converter - unlimited free conversions",
  description:
    "Fastest converter online. Supports bulk. Privacy protected. Convert all image types to Jpeg XL for free.🚀 Compress your images now!⏱",
  url: "",
  datePublished: "31.10.21",
  dateModified: "31.10.21",
};

const generatePosts = (folderPath: string) =>
  postFilePaths(folderPath).map((filePath: string) => {
    const source = fs.readFileSync(path.join(folderPath, filePath));
    const { data } = matter(source);

    return {
      title: data.title,
      description: data.description,
      support: data.support ? data.support : "",
      category: data.category,
      subcategory: data.subcategory ? data.subcategory : "",
      keyword: data.keyword,
      slug: filePath.replace(".mdx", ""),
    };
  });

export const getStaticProps = async () => {
  const articles = generatePosts(`${BLOG_POSTS_PATH}/articles`);
  const portfolio = generatePosts(`${BLOG_POSTS_PATH}/portfolio`);

  const listPostsByFolder = {
    articles,
    portfolio,
  };

  const defaultFilteredPost = [...articles, ...portfolio];

  const listSubCategories = [
    ...new Set(defaultFilteredPost.map((post) => post.subcategory)),
  ].filter(Boolean);
  const listCategories = [
    ...new Set(defaultFilteredPost.map((post) => post.category)),
  ].filter(Boolean);
  const listSupport = [
    ...new Set(defaultFilteredPost.map((post) => post.support)),
  ].filter(Boolean);

  return {
    props: {
      articles,
      portfolio,
      defaultFilteredPost,
      listSubCategories,
      listCategories,
      listSupport,
      posts: listPostsByFolder as any,
    },
  };
};

type PostsPageProps = InferGetStaticPropsType<typeof getStaticProps>;
const BlogJxl: NextPage<PostsPageProps> = ({ articles, portfolio, listCategories }) => {
  const [selectedCategoryPill, setSelectedCategoryPill] = useState("");

  const handleSelectedPill = (category: string) => {
    if (category === selectedCategoryPill) {
      setSelectedCategoryPill("");
      return;
    }
    setSelectedCategoryPill(category);
  };

  return (
    <Layout meta={meta}>
      <main className="p-2 md:p-4 archive blog">
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
        <div className="grid grid-cols-1 gap-2 mt-2 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((post: any) => (
            <Post
              key={post.slug}
              title={post.title}
              description={post.description}
              support={post.support}
              category={post.category}
              subcategory={post.subcategory}
              keyword={post.keyword}
              slug={post.slug}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-2 mt-2 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((post: any) => (
            <Post
              key={post.slug}
              title={post.title}
              description={post.description}
              support={post.support}
              category={post.category}
              subcategory={post.subcategory}
              keyword={post.keyword}
              slug={post.slug}
            />
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default BlogJxl;
