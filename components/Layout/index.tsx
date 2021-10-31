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
      <Meta {...props.meta} />
      <Header />
      {props.children}
      <CTA />
      <Footer />
      <CookieBanner />
      <Share />
    </>
  );
}
