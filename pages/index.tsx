//React
import { ChangeEvent, useState } from "react";
import { InferGetStaticPropsType, NextPage } from "next";

// Contentlayers
import {
  allArticles,
  allReleases,
  allTutorials,
  AllTypes,
} from "contentlayer/generated";

//Converter
import DropArea from "@components/DropArea";
import FilesList from "@components/FilesList";
import JXLConverter from "@components/JXLConverter";
import { Options } from "@components/OptionsBox";

//Page Layout & Blog
import Post from "@components/Blog/Post";
import Layout from "@components/Layout";
import Ad from "@components/Blog/Ad";
import Tooltip from "@components/Home/Tooltip";
import Advantages from "@components/Home/Advantages";
import ImageComparison from "@components/Home/ImageComparison";

export interface FileInfo {
  name: string;
  buffer: any;
  converted: any;
}

const getPosts = () => {
  const parsePosts = (serialisedDoc: any | AllTypes) => {
    const { _id, body, ...data } = serialisedDoc;
    return {
      url: data.url ? data.url : "",
      support: data.support ? data.support : "",
      subcategory: data.subcategory ? data.subcategory : "",
      category: data.category ? data.category : "",
      keyword: data.keyword ? data.keyword : "",
      title: data.title ? data.title : "",
      description: data.description ? data.description : "",
    };
  };

  return {
    articles: allArticles.map((doc) => parsePosts(doc)),
    tutorials: allTutorials.map((doc) => parsePosts(doc)),
    releases: allReleases.map((doc) => parsePosts(doc)),
  };
};

export const getStaticProps = async () => {
  const posts = getPosts();

  const articles = posts.articles;
  const releases = posts.releases;
  const tutorials = posts.tutorials;

  const defaultFilteredPost = [...articles, ...releases, ...tutorials];

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
      releases,
      tutorials,
      defaultFilteredPost,
      listSubCategories,
      listCategories,
      listSupport,
    },
  };
};

const meta = {
  title: "JPEG XL Converter - unlimited free conversions",
  description:
    "Fastest converter online. Supports bulk. Privacy protected. Convert all image types to Jpeg XL for free.???? Compress your images now!???",
  url: "",
  datePublished: "10-31-2021",
};

type PostsPageProps = InferGetStaticPropsType<typeof getStaticProps>;
const BlogJxl: NextPage<PostsPageProps> = ({
  articles,
  releases,
  tutorials,
  defaultFilteredPost,
  listSubCategories,
  listCategories,
  listSupport,
}) => {
  const [filteredPost, setFilteredPost] = useState([]);
  const [filterKeyword, setFilterKeyword] = useState("");
  const [selectedCategoryPill, setSelectedCategoryPill] = useState("");

  const handleSelectedPill = (category: string) => {
    if (category === selectedCategoryPill) {
      setSelectedCategoryPill("");
      setFilteredPost([]);
      return;
    }

    setSelectedCategoryPill(category);
    const filteredPosts = defaultFilteredPost.filter((post) => {
      return (
        post.category === category ||
        post.subcategory === category ||
        post.support === category
      );
    });

    setFilteredPost(filteredPosts as any);
  };

  const handleFilterByKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    const filtered = defaultFilteredPost.filter((post) =>
      post.title.toLowerCase().includes(keyword.toLowerCase())
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
      <section className="px-2 mt-8 text-center md:px-3 md:mt-12">
        <div className="block justify-center items-center my-3 md:flex">
          <h1 className="m-0">Convert all images to JXL for free.</h1>{" "}
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
                backgroundImage: `url(/assets/settings.svg)`,
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
      <section className="hidden overflow-hidden px-3 mt-12 mb-4 max-w-screen-lg md:block">
        <div
          className="absolute top-0 right-0 bottom-0 left-0 mx-auto w-3/5 rounded-full ease-in-out -z-10 bg-gradient blur-[100px]"
          data-transition-style="glow"
        ></div>
      </section>
      <Advantages />
      <ImageComparison />
      <aside className="px-2 mx-auto max-w-screen-md">
        <Ad />
      </aside>
      <main className="p-2 md:p-4 archive blog">
        <div className="mt-12 text-center">
          <h2 id="blog">JPEG XL SUPPORT</h2>
          <h2 className="mb-8 text-base">Articles and Tutorials</h2>
        </div>
        <div className="container px-2">
          <input
            type="text"
            placeholder="??????? Search all posts"
            className="block relative py-3 px-3 pr-10 mt-1 mb-3 w-full text-white rounded-md border-2 outline-none focus:border-pink-700 bg-bg-400 border-bg-500"
            onChange={handleFilterByKeyword}
          />
          {[listCategories, listSubCategories, listSupport].map(
            (type: any, key: any) => (
              <div className="mb-2" key={key}>
                {type.map((category: any) => (
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
                      <span className="mr-1">???</span>
                    )}
                    {category == "full" ||
                    category == "partial" ||
                    category == "no"
                      ? category + " support"
                      : category}
                  </button>
                ))}
              </div>
            )
          )}
          {filterKeyword.length > 0 || filteredPost.length ? (
            <div className="grid grid-cols-1 gap-3 mt-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {filteredPost.map((post: any) => (
                <Post
                  key={post.keyword}
                  title={post.title}
                  description={post.description}
                  support={post.support}
                  category={post.category}
                  subcategory={post.subcategory}
                  keyword={post.keyword}
                  url={post.url}
                />
              ))}
            </div>
          ) : (
            <>
              {[
                ["Articles", articles],
                ["Tutorials", tutorials],
                ["Changelog", releases],
              ].map((post: any, key: any) => (
                <section key={key}>
                  <h3
                    className="mt-8 mb-3 text-xl font-bold capitalize"
                    id={post[0].toLowerCase()}
                  >
                    {post[0]}
                  </h3>
                  <div className="grid grid-cols-1 gap-3 mt-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {post[1].map((post: any) => (
                      <Post
                        key={post.keyword}
                        title={post.title}
                        description={post.description}
                        support={post.support}
                        category={post.category}
                        subcategory={post.subcategory}
                        keyword={post.keyword}
                        url={post.url}
                      />
                    ))}
                  </div>
                  <aside className="px-2 mx-auto max-w-screen-md">
                    <Ad />
                  </aside>
                </section>
              ))}
            </>
          )}
          <div className="m-auto mt-12 mb-8 max-w-3xl text-center">
            <div className="text-xl font-bold">A summary of JPEG XL</div>
            <p className="mt-2">
              JPEG XL is a fusion of Google&apos;s PIK format and
              Cloudinary&apos;s FUIF format. The JPEG XL Image Coding System
              contains a wide range of features that are especially suited for
              responsive web environments, so your content will look great on a
              variety of devices.
            </p>
            <p className="mt-2">
              Compared to existing image formats, it will offer various
              advantages. It will be significantly smaller but will offer
              comparable quality. Decoding and encoding are fast and
              parallelizable, and progressive encoding is one of the features.
              Accordingly, it supports a wide gamut, higher resolutions, bit
              depths, and dynamic ranges, as well as lossless coding.
            </p>
            <p className="mt-2">
              As an image with a maximum of a billion pixels on each side and up
              to 4100 channels, it is perfectly suited to store large amounts of
              information, whether it be synthetic or photographic. The JPEG XL
              format was designed to take advantage of multicore and SIMD, and
              actually decodes at a faster rate than JPEG.
            </p>
            <p className="mt-2">
              By migrating to JPEG XL, storage costs can be reduced since
              servers can store just one JPEG XL file for both JPEG and JPEG XL
              clients. Lossless transcoding of existing JPEG files to JPEG XL
              significantly reduces their size. JPEG XL is unique in that it
              provides value to existing JPEG users and to new users alike. By
              using its coding tools, JPEG can be transmitted and stored at a
              22% reduction in cost, while retaining exact byte-for-byte
              reconstruction of the original. The prevention of transcoding and
              additional artifacts contributes to the preservation of our
              digital heritage.
            </p>
            <p className="mt-2">
              JPEG XL is also royalty-free patent software, in addition to being
              Free and Open Source Software (FOSS). You can easily convert
              multiple images to JXL with our converter. It supports conversion
              from JPEG to JPEG XL, PNG to JPEG XL, WebP to JPEG XL, and AVIF to
              JPEG XL. It is completely free, supports bulk conversion, and
              works client-side. Image files are not uploaded to the cloud.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default BlogJxl;
