import Breadcrumbs from "@components/Blog/Breadcrumbs";
import Questions from "@components/Blog/Questions";
import Sources from "@components/Blog/Sources";
import Tags from "@components/Blog/Tags";
import Layout from "@components/Layout";
import { useEffect, useRef, useState } from "react";

interface Props {
  postMeta: any;
  children: any;
}

export default function Blog(props: Props) {
  const { postMeta, children } = props;
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
        <div className="relative px-2 pt-8 pb-6 md:p-8 md:py-8 md:px-4 lg:pt-12 lg:pb-8 bg-gradient">
          <div className="absolute right-0 left-0 top-1 bottom-1 w-full rounded-md opacity-25 transform scale-105 md:h-full -z-1 bg-gradient blur-xl bg-200" />
          <div className="container mt-4 max-w-screen-md md:mt-0">
            <Breadcrumbs postMeta={postMeta} />
            <h1 className="mt-2 md:mt-6 md:text-4xl">{postMeta.title}</h1>
            <div>{readingTime} min reading time</div>
          </div>
        </div>
        <article
          ref={articleRef}
          className="container p-2 mx-auto max-w-screen-md md:p-0"
        >
          {children}
        </article>
        <aside className="container mx-auto mt-12 max-w-screen-md">
          <Sources sources={postMeta.sources} />
          <Tags tags={postMeta.tags} />
          <Questions questions={postMeta.questions} />
        </aside>
      </main>
    </Layout>
  );
}
