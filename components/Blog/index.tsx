import Breadcrumbs from "@components/Blog/Breadcrumbs";
import Posts from "@components/Blog/Posts";
import Questions from "@components/Blog/Questions";
import PostCloud from "@components/Blog/PostCloud";
import Sources from "@components/Blog/Sources";
import Tags from "@components/Blog/Tags";
import Layout from "@components/Layout";

interface Props {
  meta: any;
  children: any;
  posts: any;
}

export default function Blog(props: Props) {
  const { meta, children, posts } = props;

  return (
    <Layout meta={meta}>
      <main>
        <header className="relative px-2 py-8 bg-gradient">
          <h1 className="lg:text-4xl">{meta.title}</h1>
          <Breadcrumbs />
        </header>
        <article className="container max-w-screen-md">{children}</article>
        <aside className="container max-w-screen-md">
          <Sources sources={meta.sources} />
          <Tags tags={meta.tags} />
          <Questions questions={meta.questions} />
          <PostCloud />
        </aside>
      </main>
      <aside className="container max-w-screen-lg bg-bg-700">
        <Posts posts={posts} />
      </aside>
    </Layout>
  );
}
