import { getHeadings } from "@utils/mdx";
import { getPost } from "@utils/allPosts";
import Blog from "@components/Blog";
import ContentTable from "@components/Blog/ContentTable";
import { allTutorials, Tutorials } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import MDXComponents from "@components/MDXComponents";

export async function getStaticPaths() {
  return {
    paths: allTutorials.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const post = allTutorials.find((post) => post.slug === params.slug);
  const headings = await getHeadings(post!.body.raw);
  const relatedPosts = allTutorials
    .filter((b) => {
      return b.subcategory == post!.subcategory;
    })
    .map((item: any) => {
      return {
        url: item.url,
        keyword: item.keyword,
        description: item.description,
        support: item.support ? item.support : "",
        subcategory: item.subcategory ? item.subcategory : "",
      };
    });
  return { props: { post, headings, relatedPosts } };
}

const PostLayout = ({
  post,
  headings,
  relatedPosts,
}: {
  post: Tutorials;
  headings: any;
  relatedPosts: any;
}) => {
  const MDXContent = useMDXComponent(post.body.code);
  return (
    <>
      <Blog meta={post} posts={relatedPosts}>
        <ContentTable contentTable={headings} />
        <MDXContent components={MDXComponents} />
      </Blog>
    </>
  );
};

export default PostLayout;
