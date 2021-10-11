import CookieBanner from "@components/Layout/CookieBanner";
import CTA from "@components/Layout/CTA";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";
import Meta from "@components/Layout/Meta";
import Share from "@components/Layout/Share";

interface Layout {
  meta: any;
  children: any;
}

export default function Layout(props: Layout) {
  return (
    <>
      <Meta
        title={props.meta.title}
        description={props.meta.description}
        url={props.meta.url}
        image={props.meta.image}
        datePublished={props.meta.datePublished}
        dateModified={props.meta.dateModified}
        blog={props.meta.blog}
      />
      <Header />
      {props.children}
      <CTA />
      <Footer />
      <CookieBanner />
      <Share />
    </>
  );
}
