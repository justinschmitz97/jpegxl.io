import Tooltip from "@components/Home/Tooltip";
import ReactCompareImage from "react-compare-image";
import Advantages from "@components/Home/Advantages";
import { useState } from "react";
import DropArea from "@components/DropArea";
import FilesList from "@components/FilesList";
import JXLConverter from "@components/JXLConverter";
import { Options } from "@components/OptionsBox";
import fs from "fs";
import path from "path";
import * as React from "react";
import { InferGetStaticPropsType, NextPage } from "next";
import matter from "gray-matter";
import { postFilePaths, BLOG_POSTS_PATH } from "@utils/mdx";
import Post from "@components/Blog/Post";
import Layout from "@components/Layout";

import cog from "@assets/settings.svg";

function Glow() {
  return (
    <section className="hidden overflow-hidden px-3 mt-12 mb-4 max-w-screen-lg md:block">
      <div
        className="absolute top-0 right-0 bottom-0 left-0 mx-auto w-3/5 rounded-full ease-in-out -z-1 bg-gradient blur-100"
        data-transition-style="glow"
      ></div>
    </section>
  );
}

export interface FileInfo {
  name: string;
  buffer: any;
  converted: any;
}

const meta = {
  title: "JPEG XL Converter - unlimited free conversions",
  description:
    "Fastest converter online. Supports bulk. Privacy protected. Convert all image types to Jpeg XL for free.🚀 Compress your images now!⏱",
  url: "",
  image: "/logo_draft.png",
  datePublished: "31.10.21",
  dateModified: "31.10.21",
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
  const [image, setImage] = React.useState("frog");

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

  const [files, setFiles] = useState<FileInfo[]>([]);
  const [options, setOptions] = useState<Options | null>(null);

  const [settingsBoxOpen, setSettingsBoxOpen] = useState(false);

  const fileConverted = (name: string, converted: any) => {
    setFiles((prev) => {
      const index = prev.findIndex((e) => {
        return e.name === name;
      });

      const result = [...prev];
      if (index !== -1) {
        result[index].buffer = null;
        result[index].converted = converted;
      }

      return result;
    });
  };

  const addFiles = (f: File[]) => {
    for (let i = 0; i < f.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(reader.result as ArrayBuffer);
        setFiles((prev) => {
          const index = prev.findIndex((e) => {
            return e.name === f[i].name;
          });

          if (index !== -1) {
            const result = [...prev];
            result[index].converted = null;
            result[index].buffer = data;
            return result;
          } else {
            return [
              ...prev,
              { name: f[i].name, buffer: data, converted: null },
            ];
          }
        });
      };
      reader.readAsArrayBuffer(f[i]);
    }
  };

  return (
    <Layout meta={meta}>
      <section className="px-2 mt-12 text-center md:px-3">
        <div className="flex items-center justify-center my-3">
          <h1 className="m-0">Convert all images to JXL for free.</h1>{" "}
          <div className="inline-block relative px-2 py-1 mx-2 text-center text-white rounded-md min-w-4 tooltip bg-bg-300 group text-tiny">
            beta
          </div>
        </div>
        <div className="block justify-center mb-6 md:flex">
          <h2 className="mt-0 mb-0 text-base font-normal">
            No data is sent. The magic happens in your browser.
          </h2>
          <Tooltip text="How?">
            We use C Libraries and WASM to convert your images clientside.
          </Tooltip>
        </div>
        <div className="app">
          <div
            style={{ width: 720 }}
            data-transition-style="bouncingIn"
            className={
              "relative mx-auto flex flex-col items-center justify-center max-w-full rounded-xl p-0 md:p-4 bg-white bg-opacity-5 z-50"
            }
          >
            <DropArea
              open={settingsBoxOpen}
              onDrop={addFiles.bind(this)}
              onOptionsChanged={(options: Options) => setOptions(options)}
            />
            <button
              aria-label="Conversion settings"
              className={`absolute top-4 right-4 z-50 block w-5 h-5 p-5 cursor-pointer transition-all transform ease-cog duration-300 bg-no-repeat bg-center invisible md:visible ${
                settingsBoxOpen ? " rotate-180" : "rotate-0"
              }`}
              style={{
                backgroundImage: `url(${cog})`,
                backgroundSize: 24,
                filter: `${
                  settingsBoxOpen
                    ? "invert(67%) sepia(18%) saturate(1445%) hue-rotate(130deg) brightness(84%) contrast(82%)"
                    : "none"
                }`,
              }}
              onClick={() => setSettingsBoxOpen(!settingsBoxOpen)}
            ></button>
            <JXLConverter
              options={options}
              files={files}
              onFileConverted={fileConverted.bind(this)}
            />
            <FilesList files={files} />
          </div>
        </div>
      </section>
      <Glow />
      <Advantages />
      <section className="px-3 mx-auto max-w-screen-xl">
        <div className="flex mt-2 mb-2">
          <button
            style={{ backgroundImage: "url(/comparison/frog.jxl)" }}
            className={`mr-2 w-8 h-8 bg-center bg-cover bg-no-repeat ${
              image == "frog" ? "border-4 border-blue-400" : "opacity-50"
            }`}
            onClick={() => setImage("frog")}
          />
          <button
            style={{ backgroundImage: "url(/comparison/waterfalls.jxl" }}
            className={`mr-2 w-8 h-8 bg-center bg-cover bg-no-repeat ${
              image == "waterfalls" ? "border-4 border-blue-400" : "opacity-50"
            }`}
            onClick={() => setImage("waterfalls")}
          />
          <button
            style={{ backgroundImage: "url(/comparison/sunflower.jxl" }}
            className={`mr-2 w-8 h-8 bg-center bg-cover bg-no-repeat ${
              image == "sunflower" ? "border-4 border-blue-400" : "opacity-50"
            }`}
            onClick={() => setImage("sunflower")}
          />
          <button
            style={{ backgroundImage: "url(/comparison/drop.jxl" }}
            className={`mr-2 w-8 h-8 bg-center bg-cover bg-no-repeat ${
              image == "drop" ? "border-4 border-blue-400" : "opacity-50"
            }`}
            onClick={() => setImage("drop")}
          />
          <button
            style={{ backgroundImage: "url(/comparison/smoke.jxl" }}
            className={`mr-2 w-8 h-8 bg-center bg-cover bg-no-repeat ${
              image == "smoke" ? "border-4 border-blue-400" : "opacity-50"
            }`}
            onClick={() => setImage("smoke")}
          />
        </div>

        <div className="relative">
          <ReactCompareImage
            leftImage={`/comparison/${image}.jxl`}
            rightImage={`/comparison/${image}.jpg`}
            leftImageAlt="jxl image"
            rightImageAlt="jpg image"
            sliderLineWidth={4}
            handle={
              <div
                role="button"
                className="py-4 px-2 bg-blue-400 rounded-xl"
                tabIndex={0}
                id="handle"
              />
            }
            sliderLineColor="rgba(255,255,255,0.2)"
            sliderPositionPercentage={0.5}
          />
          <p
            className="absolute top-4 left-4 py-2 px-3 rounded-md bg-bg-400"
            id="jxl"
          >
            jxl ·{image == "frog" && " 30kb"}
            {image == "waterfalls" && " 116kb"}
            {image == "sunflower" && " 37kb"}
            {image == "drop" && " 16kb"}
            {image == "smoke" && " 58kb"}
          </p>
          <p
            className="absolute top-4 right-4 py-2 px-3 rounded-md bg-bg-400"
            id="jpg"
          >
            jpg ·{image == "frog" && " 30kb"}
            {image == "waterfalls" && " 116kb"}
            {image == "sunflower" && " 37kb"}
            {image == "drop" && " 16kb"}
            {image == "smoke" && " 58kb"}
          </p>
        </div>
      </section>
      <main className="p-2 md:p-4 archive blog">
        <div className="mt-12 text-center">
          <h1 id="blog">JPEG XL SUPPORT (WIP!)</h1>
          <h2 className="mb-8 text-base">Articles and Tutorials</h2>
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
