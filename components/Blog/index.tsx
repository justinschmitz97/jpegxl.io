import Breadcrumbs from "@components/Blog/Breadcrumbs";
import Posts from "@components/Blog/Posts";
import Questions from "@components/Blog/Questions";
import Sources from "@components/Blog/Sources";
import Tags from "@components/Blog/Tags";
import PostCloud from "@components/Blog/PostCloud";
import Layout from "@components/Layout";
import { useEffect, useRef, useState } from "react";

interface Props {
  postMeta: any;
  children: any;
  posts: any;
}

export default function Blog(props: Props) {
  const { postMeta, children, posts } = props;
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
    <Layout meta={postMeta}>
      <main>
        <div className="relative px-2 pt-8 pb-6 md:p-8 md:py-6 md:px-4 lg:pt-12 lg:pb-8 bg-gradient">
          <div className="mt-4 md:mt-0">
            <h1 className="mt-2 md:mt-4 md:text-4xl">{postMeta.title}</h1>
            <Breadcrumbs postMeta={postMeta} />
          </div>
        </div>

        <article
          ref={articleRef}
          className="container p-2 mx-auto max-w-screen-md md:p-0"
        >
          {children}
        </article>
        <aside className="container p-2 mx-auto mt-4 max-w-screen-md lg:p-0">
          <Sources sources={postMeta.sources} />
          <Tags tags={postMeta.tags} />
          <Questions questions={postMeta.questions} />
          <PostCloud />
        </aside>
      </main>
      <aside className="container p-2 mt-4 max-w-screen-lg lg:p-0 bg-bg-700">
        <Posts posts={posts} />
      </aside>
    </Layout>
  );
}
