import Breadcrumbs from "@components/Blog/Breadcrumbs";
import Post from "@components/Blog/Post";
import Questions from "@components/Blog/Questions";
import PostCloud from "@components/Blog/PostCloud";
import Sources from "@components/Blog/Sources";
import Tags from "@components/Blog/Tags";
import Layout from "@components/Layout";

interface Props {
  meta: any;
  children: any;
  posts?: any;
}

export default function Blog(props: Props) {
  const { meta, children, posts } = props;
  return (
    <Layout meta={meta}>
      <main>
        <header className="relative py-8 bg-gradient">
          <div className="container">
            <h1 className="lg:text-4xl">{meta.title}</h1>
            <Breadcrumbs />
          </div>
        </header>
        <div className="container max-w-screen-md">
          <article>{children}</article>
          <aside>
            {meta.sources && <Sources sources={meta.sources} />}
            {meta.tags && <Tags tags={meta.tags} />}
            {meta.questions && <Questions questions={meta.questions} />}
            <PostCloud />
          </aside>
        </div>
      </main>
      {posts && (
        <aside className="container my-8 max-w-screen-lg bg-bg-700">
          <h3 className="mt-8 mb-2 text-xl font-bold capitalize">
            Related articles
          </h3>
          <div className="grid grid-cols-1 gap-2 mt-2 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <Post {...post} key={post.url} />
            ))}
          </div>
        </aside>
      )}
    </Layout>
  );
}
