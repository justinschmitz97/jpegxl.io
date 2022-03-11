import Breadcrumbs from "@components/Blog/Breadcrumbs";
import Posts from "@components/Blog/Posts";
import Questions from "@components/Blog/Questions";
import PostCloud from "@components/Blog/PostCloud";
import Sources from "@components/Blog/Sources";
import Tags from "@components/Blog/Tags";
import Layout from "@components/Layout";
import Link from "@components/Link";
import { useRouter } from "next/router";

interface Props {
  meta: any;
  children: any;
  posts: any;
}

export default function Blog(props: Props) {
  const { meta, children, posts } = props;
  const { asPath } = useRouter();

  return (
    <Layout meta={meta}>
      <main>
        <div className="relative px-2 pt-8 pb-6 md:py-6 md:px-4 lg:pt-12 lg:pb-8 bg-gradient">
          <div className="mt-4 md:mt-0">
            <h1 className="mt-2 md:mt-4 md:text-4xl">{meta.title}</h1>
            <Breadcrumbs />
          </div>
        </div>

        <article className="container p-2 mx-auto max-w-screen-md md:p-0">
          {children}
        </article>
        <aside className="container p-2 mx-auto mt-4 max-w-screen-md lg:p-0">
          <Sources sources={meta.sources} />
          <Tags tags={meta.tags} />
          <Questions questions={meta.questions} />
          <PostCloud />
        </aside>
      </main>
      <aside className="container p-2 max-w-screen-lg lg:p-0 bg-bg-700">
        <Posts posts={posts} />
      </aside>
      <Link
        className="fixed bottom-2 left-2 invisible z-50 py-1 px-2 w-auto rounded-sm md:visible bg-bg-300 text-tiny"
        text="Help improve this article"
        href={`github.com/justinschmitz97/jpegxl.io/blob/master/data${asPath.slice(
          0,
          -1
        )}.mdx`}
      />
    </Layout>
  );
}
