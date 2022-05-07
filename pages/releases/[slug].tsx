import { getHeadings } from "@utils/mdx";
import { getPost } from "@utils/allPosts";
import Blog from "@components/Blog";
import ContentTable from "@components/Blog/ContentTable";
import { allReleases, Releases } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import MDXComponents from "@components/MDXComponents";

export async function getStaticPaths() {
  return {
    paths: allReleases.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const post = allReleases.find((post) => post.slug === params.slug);
  const headings = await getHeadings(post!.body.raw);
  return { props: { post, headings } };
}

const PostLayout = ({ post, headings }: { post: Releases; headings: any }) => {
  const MDXContent = useMDXComponent(post.body.code);
  return (
    <>
      <Blog meta={post}>
        <ContentTable contentTable={headings} />
        <MDXContent components={MDXComponents} />
      </Blog>
    </>
  );
};

export default PostLayout;
