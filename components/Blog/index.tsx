import Breadcrumbs from "@components/Blog/Breadcrumbs";
import Posts from "@components/Blog/Posts";
import Questions from "@components/Blog/Questions";
import Sources from "@components/Blog/Sources";
import Tags from "@components/Blog/Tags";
import Layout from "@components/Layout";
import { useEffect, useRef, useState } from "react";

export default function Blog(props: {
  postMeta: any;
  children: any;
  posts: any;
  className?: any;
}) {
  const articleRef = useRef<HTMLElement>(null);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    if (articleRef.current == null) return;
    const text = articleRef.current.textContent ?? "";
    const wordCount = text.split(/\s+/).length;
    const averageWordsPerMinute = 150;
    setReadingTime(Math.ceil(wordCount / averageWordsPerMinute));
  }, [articleRef]);

  return (
    <Layout meta={props.postMeta}>
      <main className={`blog ${props.className}`}>
        <div
          className="relative pt-8 pb-6 md:py-8 px-2 md:px-4 md:p-8 lg:pt-12 lg:pb-8 bg-gradient animation-delay-2"
          data-transition-style="in:circle:center"
        >
          <div
            className="absolute right-0 left-0 top-1 bottom-1 w-full h-full rounded-md opacity-25 transform scale-105 -z-1 bg-gradient blur-xl bg-200"
            data-transition-style="gradientAnimation"
          />
          <div className="mt-4 md:mt-0 container max-w-screen-md">
            <Breadcrumbs postMeta={props.postMeta} />
            <h1
              className="mt-2 md:mt-6 md:text-4xl animation-delay-5"
              data-transition-style="in:wipe:right"
            >
              {props.postMeta.title}
            </h1>
            <div>
              <span
                data-transition-style="in:wipe:right"
                className="animation-delay-7"
              >
                {readingTime} min reading time
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-screen-md">
          <article ref={articleRef} className="p-2 md:p-0">
            {props.children}
          </article>
          <div className="mt-12">
            {props.postMeta.sources && (
              <>
                <h5 className="inline-block py-1 px-3 mt-6 font-bold rounded-md">
                  Sources
                </h5>
                <Sources sources={props.postMeta.sources} />
              </>
            )}

            {props.postMeta.tags && (
              <>
                <h5 className="inline-block py-1 px-3 mt-6 font-bold rounded-md">
                  Topic clusters
                </h5>
                <Tags tags={props.postMeta.tags} />
              </>
            )}

            {props.postMeta.questions && (
              <>
                <h5 className="inline-block py-1 px-3 mt-6 font-bold rounded-md">
                  Related search terms
                </h5>
                <Questions questions={props.postMeta.questions} />
              </>
            )}
          </div>
        </div>
      </main>
      <div className="container mt-12 max-w-screen-lg bg-bg-700">
        {props.posts[0] && (
          <>
            <h3
              className="mt-8 mb-2 ml-3 text-xl font-bold capitalize"
              id="related"
            >
              Related articles
            </h3>
            <div className="grid grid-cols-1 gap-2 mt-2 md:grid-cols-2 lg:grid-cols-3">
              <Posts posts={props.posts} />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
